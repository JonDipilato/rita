import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import { join, basename, extname, resolve } from "node:path";

const SRC = "/mnt/c/Users/jon-d/Pictures/Rita statues";
const OUT = resolve(process.cwd(), "public/statues");

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.jpe?g$/i.test(f)).sort();

const manifest = [];
for (const f of files) {
  const base = basename(f, extname(f));
  const inPath = join(SRC, f);
  const largePath = join(OUT, `${base}.webp`);
  const thumbPath = join(OUT, `${base}-thumb.webp`);

  const img = sharp(inPath).rotate();
  const meta = await img.metadata();

  await img
    .clone()
    .resize({ width: 1800, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(largePath);

  await sharp(inPath)
    .rotate()
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(thumbPath);

  manifest.push({
    id: base,
    src: `/statues/${base}.webp`,
    thumb: `/statues/${base}-thumb.webp`,
    width: meta.width,
    height: meta.height,
  });
  process.stdout.write(".");
}
console.log(`\n${manifest.length} photos processed`);
console.log(JSON.stringify(manifest.slice(0, 3), null, 2));
