import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found fade-in">
      <div className="nf-code pixel neon-magenta flicker" aria-hidden>404</div>
      <h1 className="nf-title pixel neon-cyan">GAME OVER · PÁGINA NO ENCONTRADA</h1>
      <p className="nf-sub">La ruta que buscas no existe en el vault.</p>
      <div className="nf-ctas">
        <Link href="/" className="btn xl pulse">◀ VOLVER AL INICIO</Link>
        <Link href="/games" className="btn xl magenta">▶ EXPLORAR JUEGOS</Link>
      </div>
    </div>
  );
}
