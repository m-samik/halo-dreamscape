import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { HaloCard } from "@/components/HaloCard";
import { mockCards } from "@/data/mockData";

export const CardShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const springX1 = useSpring(x1, { stiffness: 100, damping: 30 });
  const springX2 = useSpring(x2, { stiffness: 100, damping: 30 });

  const featuredCards = mockCards.slice(0, 6);
  const topRowCards = featuredCards.slice(0, 3);
  const bottomRowCards = featuredCards.slice(3, 6);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-5xl font-bold text-white mb-4 md:text-6xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-amber-400 to-violet-400 bg-clip-text text-transparent">
              HaloCards
            </span>
          </h2>
          <p className="text-xl text-slate-400 font-light">
            Discover the most exclusive digital identities from enlightened holders
          </p>
        </motion.div>

        {/* Parallax card rows */}
        <div className="space-y-8">
          {/* Top row - moving left */}
          <motion.div 
            style={{ x: springX1 }}
            className="flex gap-6 justify-center"
          >
            {topRowCards.map((card, index) => (
              <motion.div
                key={`top-${card.pubkey}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="flex-shrink-0"
              >
                <HaloCard
                  username={card.username}
                  tier={card.tier}
                  tagline={card.tagline}
                  walletAddress={card.pubkey}
                  className="w-[320px] shadow-2xl shadow-black/20"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom row - moving right */}
          <motion.div 
            style={{ x: springX2 }}
            className="flex gap-6 justify-center"
          >
            {bottomRowCards.map((card, index) => (
              <motion.div
                key={`bottom-${card.pubkey}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1 + 0.3,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="flex-shrink-0"
              >
                <HaloCard
                  username={card.username}
                  tier={card.tier}
                  tagline={card.tagline}
                  walletAddress={card.pubkey}
                  className="w-[320px] shadow-2xl shadow-black/20"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Gradient overlays for fade effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent" />
      </div>
    </section>
  );
};