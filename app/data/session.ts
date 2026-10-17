import {
  DEFAULT_PLAYER_NAME,
  MAX_NAME_LENGTH,
  SESSION_COOKIE,
} from "@/app/const/session.const";
import { cookies } from "next/headers";
import type { Session } from "./types";

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<Session>;
    return typeof parsed.name === "string" ? { name: parsed.name } : null;
  } catch {
    return null;
  }
}

export async function setSession(name: string): Promise<Session> {
  const session: Session = {
    name: (name.trim() || DEFAULT_PLAYER_NAME).toUpperCase().slice(0, MAX_NAME_LENGTH),
  };
  const store = await cookies();
  store.set(SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return session;
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
