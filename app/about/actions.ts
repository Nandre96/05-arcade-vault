"use server";

import {
  CONTACT_EMAIL_PATTERN,
  CONTACT_HONEYPOT,
  CONTACT_LIMITS,
  CONTACT_MESSAGES,
} from "@/app/const/contact.const";
import { sendContactEmail } from "@/app/data/contact";
import type { ContactFormState } from "@/app/data/types";
import { ContactField, ContactStatus } from "@/app/enum/about.enum";

function read(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function sendContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = {
    [ContactField.Name]: read(formData, ContactField.Name),
    [ContactField.Email]: read(formData, ContactField.Email),
    [ContactField.Message]: read(formData, ContactField.Message),
  };

  if (read(formData, CONTACT_HONEYPOT)) {
    return { status: ContactStatus.Success, name: values[ContactField.Name] };
  }

  const fieldErrors: NonNullable<ContactFormState["fieldErrors"]> = {};
  for (const field of Object.values(ContactField)) {
    const value = values[field];
    if (!value) fieldErrors[field] = CONTACT_MESSAGES.required;
    else if (value.length > CONTACT_LIMITS[field]) {
      fieldErrors[field] = CONTACT_MESSAGES.tooLong(CONTACT_LIMITS[field]);
    }
  }
  if (!fieldErrors[ContactField.Email] && !CONTACT_EMAIL_PATTERN.test(values[ContactField.Email])) {
    fieldErrors[ContactField.Email] = CONTACT_MESSAGES.email;
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { status: ContactStatus.Error, fieldErrors, values };
  }

  try {
    await sendContactEmail({
      name: values[ContactField.Name],
      email: values[ContactField.Email],
      message: values[ContactField.Message],
    });
  } catch {
    return { status: ContactStatus.Error, formError: CONTACT_MESSAGES.sendFailed, values };
  }

  return { status: ContactStatus.Success, name: values[ContactField.Name] };
}
