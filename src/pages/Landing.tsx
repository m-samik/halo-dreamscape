import React from "react";
import { PremiumBackground } from "@/components/PremiumBackground";
import { HeroSection } from "@/components/HeroSection";
import { CardShowcase } from "@/components/CardShowcase";
import { FeatureSection } from "@/components/FeatureSection";

export const Landing: React.FC = () => {

  return (
    <main className="relative">
      <PremiumBackground />
      <HeroSection />
      <CardShowcase />
      <FeatureSection />
    </main>
  );
};

export default Landing;
