import type { Game, ScoreRow, Session } from "@/app/data/types";

export interface GameCardProps {
  game: Game;
}

export interface LibraryProps {
  games: Game[];
}

export interface GamePlayerProps {
  game: Game;
  userName: string | null;
}

export interface HallOfFameProps {
  games: Game[];
  scores: Record<string, ScoreRow[]>;
  session: Session | null;
}

export interface NavProps {
  session: Session | null;
}
