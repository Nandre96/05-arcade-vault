import { DEFAULT_SCORES_COUNT, PLAYERS } from "@/app/const/scores.const";
import type { SavedScore, ScoreRow } from "./types";

// Mock data. Saved scores live in server memory only: they are lost on
// restart / HMR (accepted for the visual MVP). Eventually this is a database.
const savedScores: SavedScore[] = [];

function seededScores(seed: number, count: number): ScoreRow[] {
  let s = seed;
  const rand = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const used = new Set<string>();
  const rows: ScoreRow[] = [];
  for (let i = 0; i < count; i++) {
    let name: string;
    do {
      name = PLAYERS[Math.floor(rand() * PLAYERS.length)];
    } while (used.has(name) && used.size < PLAYERS.length);
    used.add(name);
    const base = Math.floor(50000 + rand() * 250000);
    const score = base - i * Math.floor(2000 + rand() * 4000);
    const day = String(1 + Math.floor(rand() * 28)).padStart(2, "0");
    const mon = String(1 + Math.floor(rand() * 12)).padStart(2, "0");
    rows.push({
      rank: i + 1,
      name,
      score: Math.max(score, 1000),
      date: `${day}/${mon}/2026`,
    });
  }
  return rows;
}

function formatDate(at: number): string {
  const d = new Date(at);
  const day = String(d.getDate()).padStart(2, "0");
  const mon = String(d.getMonth() + 1).padStart(2, "0");
  return `${day}/${mon}/${d.getFullYear()}`;
}

export async function getScores(
  gameId: string,
  count: number = DEFAULT_SCORES_COUNT,
): Promise<ScoreRow[]> {
  const seeded = seededScores(gameId.length * 17 + 3, count);
  const saved: ScoreRow[] = savedScores
    .filter((s) => s.game === gameId)
    .map((s) => ({ rank: 0, name: s.name, score: s.score, date: formatDate(s.at) }));

  return [...seeded, ...saved]
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((r, i) => ({ ...r, rank: i + 1 }));
}

export async function saveScore(
  entry: Omit<SavedScore, "at">,
): Promise<SavedScore> {
  const saved: SavedScore = { ...entry, at: Date.now() };
  savedScores.push(saved);
  return saved;
}
