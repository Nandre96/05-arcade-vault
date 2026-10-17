import { Suspense } from "react";
import HallOfFame from "@/app/components/HallOfFame";
import { getGames } from "@/app/data/games";
import { getScores } from "@/app/data/scores";
import { getSession } from "@/app/data/session";

export default function HallOfFamePage() {
  return (
    <Suspense>
      <Hall />
    </Suspense>
  );
}

async function Hall() {
  const [games, session] = await Promise.all([getGames(), getSession()]);
  const entries = await Promise.all(
    games.map(async (g) => [g.id, await getScores(g.id, 12)] as const),
  );

  return <HallOfFame games={games} scores={Object.fromEntries(entries)} session={session} />;
}
