import type { Category, NeonColor } from "@/app/enum/game.enum";
import type { FeatureIcon } from "@/app/enum/home.enum";
import type { ContactField, ContactStatus, HighlightIcon } from "@/app/enum/about.enum";

export interface Game {
  id: string; // "bloque-buster"
  title: string; // "BLOQUE BUSTER"
  short: string;
  long: string;
  cat: Category;
  cover: string; // "cover-bricks" → clase CSS de portada
  color: NeonColor;
  best: number;
  plays: string; // "12.4K"
}

export interface ScoreRow {
  rank: number;
  name: string;
  score: number;
  date: string; // "dd/mm/yyyy"
}

export interface SavedScore {
  game: string; // Game.id
  name: string;
  score: number;
  at: number; // Date.now()
}

export interface Session {
  name: string; // máx 10 chars, mayúsculas; vacío → "PLAYER1"
}

export interface ActivityEntry {
  player: string; // "NEONFOX"
  game: string; // "Caída" (título corto del juego)
  score: number; // 184220
  ago: string; // "hace 2 min"
  color: NeonColor;
}

export interface TopPlayer {
  rank: number; // 1..5
  player: string;
  score: number;
}

export interface Feature {
  icon: FeatureIcon;
  title: string;
  description: string;
  color: NeonColor;
}

export interface HomeStat {
  value: string;
  unit: string;
  sub: string;
}

export interface Pricing {
  label: string;
  name: string;
  amount: string;
  unit: string;
  tag: string;
  perks: string[];
  foot: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Highlight {
  icon: HighlightIcon;
  text: string;
  color: NeonColor;
}

export interface ContactTip {
  text: string;
  color: NeonColor;
}

export interface ContactFormState {
  status: ContactStatus;
  name?: string; // nombre para el terminal de éxito
  fieldErrors?: Partial<Record<ContactField, string>>;
  formError?: string; // fallo de envío
  values?: Partial<Record<ContactField, string>>; // para no perder lo escrito
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}
