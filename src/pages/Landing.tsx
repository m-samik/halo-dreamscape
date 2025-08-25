import React, { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  cubicBezier,
  useAnimation,
} from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Users,
  Share2,
  ShieldCheck,
  Zap,
  Gauge,
  Trophy,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyableCA } from "@/components/CopyableCA";
import { HaloCard } from "@/components/HaloCard";
import { mockCards } from "@/data/mockData";

/** Global easing (TS-safe) */
const EASE = cubicBezier(0.16, 1, 0.3, 1);

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay: d, ease: EASE },
});

/** Floating particles */
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => i);
  
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-halo/30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

/** 3D Orbit of HaloCards */
function Orbit3D() {
  const items = useMemo(() => mockCards.slice(0, 6), []);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.5);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative my-16 flex h-[600px] items-center justify-center">
      <div className="relative">
        {items.map((card, i) => {
          const angle = (i / items.length) * 360 + rotation;
          const radius = 400;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const z = Math.sin((angle * Math.PI) / 180) * radius;
          const scale = (z + radius) / (radius * 2) * 0.5 + 0.5;
          
          return (
            <motion.div
              key={`orbit-${i}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
                zIndex: Math.round(z + radius),
                opacity: scale,
              }}
              whileHover={{ scale: scale * 1.1 }}
            >
              <HaloCard
                username={card.username}
                tier={card.tier}
                tagline={card.tagline}
                walletAddress={card.pubkey}
                className="w-[280px]"
              />
            </motion.div>
          );
        })}
      </div>
      
      {/* Central glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-32 w-32 rounded-full bg-gradient-radial from-halo/20 via-halo/5 to-transparent blur-xl" />
      </div>
    </div>
  );
}

export const Landing: React.FC = () => {
  const prefersReduce = useReducedMotion();
  const controls = useAnimation();

  // Enhanced mouse tracking for hero
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [2, -2]), { stiffness: 100, damping: 30 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-2, 2]), { stiffness: 100, damping: 30 });

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: EASE }
    });
  }, [controls]);

  function onMove(e: React.PointerEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mx.set(x);
    my.set(y);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-background/95">
      {/* Enhanced Background */}
      <div aria-hidden className="fixed inset-0 -z-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-halo/5 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      </div>

      {/* Floating particles */}
      {!prefersReduce && <FloatingParticles />}

      {/* Animated aurora blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-20">
        <motion.div 
          className="absolute left-[10%] top-[20%] h-96 w-96 rounded-full bg-gradient-radial from-halo/15 via-halo/5 to-transparent blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute right-[15%] bottom-[15%] h-80 w-80 rounded-full bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* HERO */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4">
        {/* Central hero content */}
        <motion.div
          className="z-10 mx-auto max-w-6xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          {/* Status badges */}
          <motion.div 
            className="mb-8 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="chip-premium">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span>Solana Mainnet</span>
            </div>
            <div className="chip-premium">
              <ShieldCheck className="h-4 w-4 text-halo" />
              <span>Token Gated</span>
            </div>
            <div className="chip-premium">
              <Star className="h-4 w-4 text-primary" />
              <span>Premium Access</span>
            </div>
          </motion.div>

          {/* Main heading with 3D effect */}
          <motion.div
            className="relative"
            style={{
              rotateX: prefersReduce ? 0 : (rx as unknown as number),
              rotateY: prefersReduce ? 0 : (ry as unknown as number),
            }}
          >
            <motion.h1
              className="text-6xl font-bold leading-tight tracking-tight md:text-8xl lg:text-9xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
            >
              <motion.span 
                className="block bg-gradient-to-r from-white via-white/95 to-white/85 bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                Great ideas
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-halo via-primary to-halo bg-clip-text text-transparent"
                style={{ backgroundSize: "200% 100%" }}
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                live here
              </motion.span>
            </motion.h1>

            {/* Glow effect behind text */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-1/2 h-[200px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-halo/10 blur-3xl" />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="mx-auto mt-8 max-w-2xl text-xl text-muted-foreground md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            The exclusive web3 clubhouse for visionaries. 
            <span className="text-halo font-medium"> Hold the key</span>, unlock your potential, and mint your legacy.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link to="/create">
              <Button size="lg" className="group relative overflow-hidden bg-gradient-to-r from-halo to-primary px-8 py-4 text-lg font-semibold text-black shadow-2xl shadow-halo/25 transition-all duration-300 hover:shadow-halo/40 hover:scale-105">
                <Sparkles className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                Create HaloCard
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-halo/20 to-primary/20 blur-xl" />
              </Button>
            </Link>
            <Link to="/gallery">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30">
                <Users className="mr-2 h-5 w-5" />
                Explore Gallery
              </Button>
            </Link>
          </motion.div>

          {/* Contract address */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <CopyableCA />
          </motion.div>

          {/* Feature chips */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <div className="chip">
              <Zap className="h-4 w-4 text-halo" />
              <span>Instant Mint</span>
            </div>
            <div className="chip">
              <Gauge className="h-4 w-4 text-primary" />
              <span>Low Fees</span>
            </div>
            <div className="chip">
              <Trophy className="h-4 w-4 text-accent" />
              <span>Leaderboards</span>
            </div>
          </motion.div>
        </motion.div>

        {/* 3D Card Orbit */}
        {!prefersReduce && <Orbit3D />}
      </section>

      {/* FEATURED RAILS */}
      <section className="relative pb-16">
        <div className="container-halo">
          <div className="mx-auto mb-6 max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-wide md:text-3xl">
              Featured HaloCards
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Freshly minted by enlightened holders
            </p>
          </div>

          {/* Rail A */}
          <div className="marquee">
            <div className="marquee__track hover:[animation-play-state:paused]">
              {[...mockCards, ...mockCards].map((card, i) => (
                <div className="marquee__item" key={`a-${i}`}>
                  <HaloCard
                    username={card.username}
                    tier={card.tier}
                    tagline={card.tagline}
                    walletAddress={card.pubkey}
                    className="w-[320px] md:w-[380px]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Rail B (reverse) */}
          <div className="marquee marquee--reverse mt-6">
            <div className="marquee__track hover:[animation-play-state:paused]">
              {[...mockCards, ...mockCards].map((card, i) => (
                <div className="marquee__item" key={`b-${i}`}>
                  <HaloCard
                    username={card.username}
                    tier={card.tier}
                    tagline={card.tagline}
                    walletAddress={card.pubkey}
                    className="w-[320px] md:w-[380px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative pb-28">
        <div className="container-halo">
          <div className="mx-auto max-w-5xl text-center">
            <motion.h2 {...fadeUp()} className="text-3xl font-semibold md:text-4xl">
              How it works
            </motion.h2>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            <motion.div {...fadeUp(0.05)} className="neo-card rounded-3xl p-7">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <div className="text-lg font-semibold">Connect</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Link your Solana wallet. Gating runs securely via Helius RPC.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.15)} className="neo-card rounded-3xl p-7">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <div className="text-lg font-semibold">Qualify</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Hold the required tokens to unlock the gates of Heaven.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.25)} className="neo-card rounded-3xl p-7">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                <Share2 className="h-7 w-7 text-primary" />
              </div>
              <div className="text-lg font-semibold">Flex</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Mint your HaloCard, download it, and share to X with one click.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
