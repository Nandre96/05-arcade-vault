import AboutDivider from "@/app/components/about/AboutDivider";
import AboutHero from "@/app/components/about/AboutHero";
import ContactSection from "@/app/components/about/ContactSection";

export default function AboutPage() {
  return (
    <div className="about fade-in">
      <AboutHero />
      <AboutDivider />
      <ContactSection />
    </div>
  );
}
