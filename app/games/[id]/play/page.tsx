import { Suspense } from "react";
import { notFound } from "next/navigation";
import GamePlayer from "@/app/components/GamePlayer";
import { getGame } from "@/app/data/games";
import { getSession } from "@/app/data/session";

export default function PlayPage({ params }: PageProps<"/games/[id]/play">) {
  return (
    <Suspense>
      <Player params={params} />
    </Suspense>
  );
}

async function Player({ params }: { params: PageProps<"/games/[id]/play">["params"] }) {
  const { id } = await params;
  const game = await getGame(id);
  if (!game) notFound();
  const session = await getSession();

  return <GamePlayer game={game} userName={session?.name ?? null} />;
}
