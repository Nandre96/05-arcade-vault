import { ABOUT_MISSION, ABOUT_TITLE, HIGHLIGHTS, HIGHLIGHT_STEP_MS } from "@/app/const/about.const";
import HighlightGlyph from "./HighlightGlyph";

export default function AboutHero() {
  return (
    <section className="about-hero">
      <div className="kicker pixel neon-yellow">▸ ACERCA DE</div>
      <h1 className="about-title">{ABOUT_TITLE}</h1>
      <p className="about-mission">{ABOUT_MISSION}</p>

      <div className="highlight-row">
        {HIGHLIGHTS.map((h, i) => (
          <div key={h.icon} className={`highlight ${h.color}`} style={{ transitionDelay: `${i * HIGHLIGHT_STEP_MS}ms` }}>
            <HighlightGlyph kind={h.icon} />
            <div className="hl-text pixel">{h.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
