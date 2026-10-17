import Link from "next/link";
import type { MiniCardProps } from "@/app/interfaces/components.interface";

export default function MiniCard({ game }: MiniCardProps) {
  return (
    <Link href={`/games/${game.id}`} className="mini-card">
      <div className="mini-cover"><div className={"cover-bg " + game.cover}></div></div>
      <div className="mini-meta">
        <div className="mini-title">{game.title}</div>
        <div className="mini-cat">{game.cat}</div>
      </div>
    </Link>
  );
}
