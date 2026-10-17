export const CONTACT_LIMITS = {
  name: 50,
  email: 100,
  message: 2000,
} as const;

export const CONTACT_FROM = "Arcade Vault <onboarding@resend.dev>";

export const CONTACT_SUBJECT = (name: string) => `Nuevo mensaje de ${name} · Arcade Vault`;
