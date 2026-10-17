"use server";

import { clearSession, setSession } from "@/app/data/session";
import { redirect } from "next/navigation";

export async function login(formData: FormData): Promise<void> {
  const user = formData.get("user");
  await setSession(typeof user === "string" ? user : "");
  redirect("/");
}

export async function guest(): Promise<void> {
  await clearSession();
  redirect("/");
}

export async function signOut(): Promise<void> {
  await clearSession();
  redirect("/");
}
