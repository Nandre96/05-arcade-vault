import { NeonColor } from "@/app/enum/game.enum";
import type { ActivityEntry, TopPlayer } from "./types";

const RECENT_ACTIVITY: ActivityEntry[] = [
  { player: "NEONFOX", game: "Caída", score: 184220, ago: "hace 2 min", color: NeonColor.Magenta },
  { player: "PX_KAI", game: "Glotón", score: 96400, ago: "hace 5 min", color: NeonColor.Yellow },
  { player: "Z3R0COOL", game: "Invasores", score: 54190, ago: "hace 8 min", color: NeonColor.Green },
  { player: "VAULT_07", game: "Rocas", score: 41200, ago: "hace 12 min", color: NeonColor.Cyan },
  { player: "GLITCHA", game: "Bloque Buster", score: 28450, ago: "hace 18 min", color: NeonColor.Cyan },
  { player: "ARKADYA", game: "Serpentina", score: 7820, ago: "hace 24 min", color: NeonColor.Green },
  { player: "CYBER_LU", game: "Ranaria", score: 18900, ago: "hace 31 min", color: NeonColor.Yellow },
];

const TOP_PLAYERS: TopPlayer[] = [
  { rank: 1, player: "NEONFOX", score: 312840 },
  { rank: 2, player: "PX_KAI", score: 248110 },
  { rank: 3, player: "M00NRYU", score: 196720 },
  { rank: 4, player: "VAULT_07", score: 154300 },
  { rank: 5, player: "GLITCHA", score: 138900 },
];

export async function getRecentActivity(): Promise<ActivityEntry[]> {
  return RECENT_ACTIVITY;
}

export async function getTopPlayers(): Promise<TopPlayer[]> {
  return TOP_PLAYERS;
}
