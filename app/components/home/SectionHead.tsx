import type { SectionHeadProps } from "@/app/interfaces/components.interface";

export default function SectionHead({ kicker, title, color }: SectionHeadProps) {
  return (
    <div className="section-head">
      <div className={`kicker pixel neon-${color}`}>{kicker}</div>
      <h2 className="section-title">{title}</h2>
      <div className="section-rule"></div>
    </div>
  );
}
