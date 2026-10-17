import { HOME_STATS } from "@/app/const/home.const";
import Reveal from "./Reveal";

export default function StatsSection() {
  return (
    <Reveal className="home-stats">
      <div className="stats-inner">
        {HOME_STATS.map((st, i) => (
          <div key={st.value} className="stat-block" style={{ transitionDelay: i * 90 + "ms" }}>
            <div className="stat-n neon-yellow">{st.value}</div>
            <div className="stat-u pixel">{st.unit}</div>
            <div className="stat-s">{st.sub}</div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
