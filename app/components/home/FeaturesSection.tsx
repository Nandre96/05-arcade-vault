import { FEATURES } from "@/app/const/home.const";
import { NeonColor } from "@/app/enum/game.enum";
import FeatureGlyph from "./FeatureGlyph";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function FeaturesSection() {
  return (
    <Reveal className="home-section">
      <SectionHead kicker="// 01" title="¿POR QUÉ ARCADE VAULT?" color={NeonColor.Magenta} />
      <div className="feature-grid">
        {FEATURES.map((f, i) => (
          <div key={f.icon} className={"feature-card " + f.color} style={{ transitionDelay: i * 80 + "ms" }}>
            <FeatureGlyph kind={f.icon} />
            <div className="ft-title pixel">{f.title}</div>
            <div className="ft-desc">{f.description}</div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
