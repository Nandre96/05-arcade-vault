import Reveal from "@/app/components/home/Reveal";
import { CONTACT_TIPS, TIP_LED_CLASS } from "@/app/const/about.const";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <Reveal className="about-contact">
      <div className="contact-grid">
        <div className="contact-intro">
          <div className="kicker pixel neon-cyan">▸ CONTACTO</div>
          <h2 className="contact-title">CONTÁCTANOS</h2>
          <p className="contact-sub">
            ¿Tienes alguna sugerencia, quieres proponer un juego, o simplemente quieres saludar? Escríbenos.
          </p>
          <div className="contact-tips">
            {CONTACT_TIPS.map((tip) => (
              <div key={tip.text} className="tip">
                <span className={`tip-led ${TIP_LED_CLASS[tip.color]}`.trim()}></span>
                {tip.text}
              </div>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </Reveal>
  );
}
