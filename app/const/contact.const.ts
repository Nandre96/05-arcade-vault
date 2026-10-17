export const CONTACT_LIMITS = {
  name: 50,
  email: 100,
  message: 2000,
} as const;

export const CONTACT_FROM = "Arcade Vault <onboarding@resend.dev>";

export const CONTACT_SUBJECT = (name: string) => `Nuevo mensaje de ${name} · Arcade Vault`;

export const CONTACT_HONEYPOT = "website";

export const CONTACT_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONTACT_MESSAGES = {
  required: "ESTE CAMPO ES OBLIGATORIO",
  email: "CORREO NO VÁLIDO",
  tooLong: (max: number) => `MÁXIMO ${max} CARACTERES`,
  sendFailed: "NO SE PUDO ENVIAR. INTÉNTALO DE NUEVO.",
} as const;
