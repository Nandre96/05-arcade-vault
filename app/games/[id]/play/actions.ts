"use server";

import { DEFAULT_GUEST_NAME, MAX_NAME_LENGTH } from "@/app/const/session.const";
import { getGame } from "@/app/data/games";
import { saveScore } from "@/app/data/scores";

export async function saveScoreAction(
  gameId: string,
  score: number,
  name: string,
): Promise<void> {
  if (!(await getGame(gameId))) return;
  if (!Number.isFinite(score) || score < 0) return;
  await saveScore({
    game: gameId,
    score: Math.floor(score),
    name: name.trim().toUpperCase().slice(0, MAX_NAME_LENGTH) || DEFAULT_GUEST_NAME,
  });
}
