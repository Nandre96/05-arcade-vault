import Link from "next/link";
import { FAQ, PRICING } from "@/app/const/home.const";
import { NeonColor } from "@/app/enum/game.enum";
import type { PricingSectionProps } from "@/app/interfaces/components.interface";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function PricingSection({ loggedIn }: PricingSectionProps) {
  return (
    <Reveal className="home-section">
      <SectionHead kicker="// 04" title="PRECIOS" color={NeonColor.Green} />
      <div className="pricing-grid">
        <div className="price-card">
          <div className="pc-label pixel">{PRICING.label}</div>
          <div className="pc-name pixel">{PRICING.name}</div>
          <div className="pc-amount">
            <span className="pc-amount-n">{PRICING.amount}</span>
            <span className="pc-amount-u">{PRICING.unit}</span>
          </div>
          <div className="pc-tag">{PRICING.tag}</div>
          <ul className="pc-list">
            {PRICING.perks.map((p) => (
              <li key={p}>✔ {p}</li>
            ))}
          </ul>
          <Link
            href={loggedIn ? "/games" : "/auth"}
            className="btn xl pulse"
            style={{ width: "100%" }}
          >
            {loggedIn ? "EXPLORAR JUEGOS →" : "EMPEZAR GRATIS →"}
          </Link>
          <div className="pc-foot">{PRICING.foot}</div>
          <div className="pc-stamp pixel">FREE<br />PLAY</div>
        </div>

        <div className="pricing-faq">
          {FAQ.map((f) => (
            <div key={f.question} className="faq-item">
              <div className="faq-q pixel">{f.question}</div>
              <div className="faq-a">{f.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
