export const CONTACT = {
  phone: "(603) 943-5952",
  phoneHref: "tel:+16039435952",
  email: "",
  region: "New Hampshire",
  atelierNote:
    "Atelier visits by appointment only. A family member coordinates pickup days so Rita is never receiving strangers alone.",
  pickupNote:
    "Local pickup at Rita’s atelier in New Hampshire, by appointment. For buyers outside the region, you arrange a white-glove shipper of your choice — we’ve had good experiences with Plycon, Ship Smart, and Craters & Freighters. Rita hands the piece off at the atelier on your scheduled day.",
  pickupNoteES:
    "Retiro en el taller de Rita en Nuevo Hampshire, con cita previa. Si usted está fuera de Nueva Inglaterra, coordine el transporte con un servicio especializado de su elección (recomendamos Plycon, Ship Smart o Craters & Freighters). Rita entrega la pieza personalmente el día acordado.",
};

export const hasPhone = () => CONTACT.phone.trim().length > 0;
export const hasEmail = () => CONTACT.email.trim().length > 0;
