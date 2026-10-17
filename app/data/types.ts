import type { Category, NeonColor } from "@/app/enum/game.enum";

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
