import { Suspense } from "react";
import ActivitySection from "@/app/components/home/ActivitySection";
import FeaturesSection from "@/app/components/home/FeaturesSection";
import FinalCta from "@/app/components/home/FinalCta";
import GamesPreview from "@/app/components/home/GamesPreview";
import HomeHero from "@/app/components/home/HomeHero";
import PricingSection from "@/app/components/home/PricingSection";
import StatsSection from "@/app/components/home/StatsSection";
import { getRecentActivity, getTopPlayers } from "@/app/data/activity";
import { getGames } from "@/app/data/games";
import { getSession } from "@/app/data/session";

const PREVIEW_COUNT = 6;

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}

async function HomeContent() {
  const [games, activity, top, session] = await Promise.all([
    getGames(),
    getRecentActivity(),
    getTopPlayers(),
    getSession(),
  ]);
  const loggedIn = session !== null;

  return (
    <div className="home fade-in">
      <HomeHero loggedIn={loggedIn} />
      <FeaturesSection />
      <GamesPreview games={games.slice(0, PREVIEW_COUNT)} />
      <StatsSection />
      <ActivitySection activity={activity} top={top} />
      <PricingSection loggedIn={loggedIn} />
      <FinalCta />
    </div>
  );
}
