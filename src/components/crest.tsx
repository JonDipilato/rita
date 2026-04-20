import { cn } from "@/lib/cn";

export function Crest({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={cn("w-9 h-9", className)}
    >
      <defs>
        <linearGradient id="gild" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3dc8a" />
          <stop offset="45%" stopColor="#c9a44a" />
          <stop offset="100%" stopColor="#8a6b1f" />
        </linearGradient>
      </defs>
      {/* Gothic shield */}
      <path
        d="M24 2 L42 6 V22 C42 32 34 42 24 46 C14 42 6 32 6 22 V6 Z"
        stroke="url(#gild)"
        strokeWidth="1.25"
        fill="rgba(14,10,8,0.25)"
      />
      {/* Cross */}
      <path
        d="M24 11 V31 M17 18 H31"
        stroke="url(#gild)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Trefoil finial at top */}
      <circle cx="24" cy="10" r="1.4" fill="url(#gild)" />
      <circle cx="20.5" cy="17" r="1" fill="url(#gild)" />
      <circle cx="27.5" cy="17" r="1" fill="url(#gild)" />
      {/* Laurel */}
      <path
        d="M12 28 C14 34 18 38 24 40 C30 38 34 34 36 28"
        stroke="url(#gild)"
        strokeWidth="0.75"
        fill="none"
        opacity="0.7"
      />
    </svg>
  );
}
