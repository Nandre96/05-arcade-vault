import Reveal from "@/app/components/home/Reveal";
import { DIVIDER_PIXELS, DIVIDER_STEP_MS } from "@/app/const/about.const";

export default function AboutDivider() {
  return (
    <Reveal className="about-divider">
      <div className="div-bar"></div>
      <div className="div-pixels" aria-hidden="true">
        {Array.from({ length: DIVIDER_PIXELS }, (_, i) => (
          <span key={i} style={{ animationDelay: `${i * DIVIDER_STEP_MS}ms` }}></span>
        ))}
      </div>
      <div className="div-bar"></div>
    </Reveal>
  );
}
