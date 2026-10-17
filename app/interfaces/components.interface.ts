import type { ReactNode } from "react";
import type { NeonColor } from "@/app/enum/game.enum";
import type { FeatureIcon } from "@/app/enum/home.enum";
import type { ActivityEntry, Game, ScoreRow, Session, TopPlayer } from "@/app/data/types";

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

export interface FeatureGlyphProps {
  kind: FeatureIcon;
}

export interface MiniCardProps {
  game: Game;
}

export interface RevealProps {
  className?: string;
  children: ReactNode;
}

export interface SectionHeadProps {
  kicker: string;
  title: string;
  color: NeonColor;
}

export interface HomeHeroProps {
  loggedIn: boolean;
}

export interface PricingSectionProps {
  loggedIn: boolean;
}

export interface GamesPreviewProps {
  games: Game[];
}

export interface ActivitySectionProps {
  activity: ActivityEntry[];
  top: TopPlayer[];
}
