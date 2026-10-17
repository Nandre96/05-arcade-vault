import Link from "next/link";
import { NeonColor } from "@/app/enum/game.enum";
import type { GamesPreviewProps } from "@/app/interfaces/components.interface";
import MiniCard from "./MiniCard";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function GamesPreview({ games }: GamesPreviewProps) {
  return (
    <Reveal className="home-section">
      <SectionHead kicker="// 02" title="JUEGOS DISPONIBLES AHORA" color={NeonColor.Cyan} />
      <div className="mini-rail">
        {games.map((g) => (
          <MiniCard key={g.id} game={g} />
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <Link href="/games" className="btn lg">VER TODOS LOS JUEGOS →</Link>
      </div>
    </Reveal>
  );
}
