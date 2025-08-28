import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Users, ShieldCheck, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyableCA } from "@/components/CopyableCA";
import { useWallet } from "@solana/wallet-adapter-react";
import { hasCard } from "@/api/cards";

const FADE_UP_ANIMATION = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

export const HeroSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    const { publicKey } = useWallet();
  
    const walletAddress = useMemo(() => publicKey?.toBase58() || "", [publicKey]);
  
    const [alreadyMinted, setAlreadyMinted] = useState(false);
  
    useEffect(() => {
    if (!walletAddress) return;
    hasCard(walletAddress).then(setAlreadyMinted);
  }, [walletAddress]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="relative z-10 mx-auto max-w-6xl text-center">
        {/* Main heading */}
        <motion.div
          {...FADE_UP_ANIMATION}
          transition={{ ...FADE_UP_ANIMATION.transition, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="font-display text-7xl font-bold leading-[0.9] tracking-tight md:text-8xl lg:text-9xl">
            <span className="block bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-transparent">
              Great ideas
            </span>
            <span className="relative block">
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-violet-400 bg-clip-text text-transparent">
                live here
              </span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-400/20 via-amber-300/20 to-violet-400/20 blur-3xl" />
            </span>
          </h1>
        </motion.div>

        {/* Status badges - moved down */}
        <motion.div 
          {...FADE_UP_ANIMATION}
          transition={{ ...FADE_UP_ANIMATION.transition, delay: 0.2 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-3"
        >
          <div className="group inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-sm font-medium text-emerald-300 backdrop-blur-xl">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Solana Mainnet</span>
          </div>
          <div className="group inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-2 text-sm font-medium text-amber-300 backdrop-blur-xl">
            <ShieldCheck className="h-4 w-4" />
            <span>Token Gated</span>
          </div>
          <div className="group inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-4 py-2 text-sm font-medium text-violet-300 backdrop-blur-xl">
            <Star className="h-4 w-4" />
            <span>Exclusive Access</span>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          {...FADE_UP_ANIMATION}
          transition={{ ...FADE_UP_ANIMATION.transition, delay: 0.3 }}
          className="mx-auto mb-12 max-w-2xl text-xl font-light leading-relaxed text-slate-300 md:text-2xl"
        >
          The most exclusive web3 clubhouse for visionaries.{" "}
          <span className="font-medium text-amber-300">Hold the key</span>, unlock your potential, 
          and mint your digital legacy.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...FADE_UP_ANIMATION}
          transition={{ ...FADE_UP_ANIMATION.transition, delay: 0.4 }}
          className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          { !alreadyMinted && (
            <Link to="/create">
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-lg font-semibold text-black shadow-2xl shadow-amber-500/25 transition-all duration-300 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative flex items-center">
                <Sparkles className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                Create HaloCard
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </Button>
          </Link>)}
          <Link to="/gallery">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 bg-white/5 px-8 py-4 text-lg font-medium text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Users className="mr-2 h-5 w-5" />
              Explore Gallery
            </Button>
          </Link>
        </motion.div>

        {/* Contract address */}
        <motion.div
          {...FADE_UP_ANIMATION}
          transition={{ ...FADE_UP_ANIMATION.transition, delay: 0.5 }}
          className="mb-8"
        >
          <CopyableCA />
        </motion.div>

        {/* Feature pills */}
        <motion.div
          {...FADE_UP_ANIMATION}
          transition={{ ...FADE_UP_ANIMATION.transition, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-xl">
            <Zap className="h-4 w-4 text-amber-400" />
            <span>Instant Mint</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-xl">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Low Fees</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-xl">
            <div className="h-2 w-2 rounded-full bg-violet-400" />
            <span>On-Chain</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};