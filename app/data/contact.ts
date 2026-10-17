import { Resend } from "resend";
import ContactEmail from "@/app/emails/ContactEmail";
import { CONTACT_FROM, CONTACT_SUBJECT } from "@/app/const/contact.const";
import type { ContactPayload } from "./types";

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) throw new Error("Falta RESEND_API_KEY o CONTACT_TO_EMAIL");

  const { name, email, message } = payload;
  const { error } = await new Resend(apiKey).emails.send({
    from: CONTACT_FROM,
    to,
    replyTo: email,
    subject: CONTACT_SUBJECT(name),
    react: ContactEmail(payload),
    text: `Nombre: ${name}\nCorreo: ${email}\n\n${message}`,
  });

  if (error) throw new Error(error.message);
}
