import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  cubicBezier,
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

/** 3D Orbit of HaloCards (CSS rotateY + translateZ) */
function Orbit3D() {
  const items = useMemo(() => mockCards.slice(0, 8), []);
  const R = 500;

  return (
    <div className="relative my-12 hidden justify-center md:flex">
      <div className="perspective-1200">
        <div className="ring3d preserve-3d">
          {items.map((c, i) => {
            const ang = (i / items.length) * 360;
            return (
              <div
                key={`orb-${i}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 preserve-3d"
                style={{ transform: `rotateY(${ang}deg) translateZ(${R}px)` }}
              >
                <div className="scale-[.72] opacity-80 transition-opacity hover:opacity-100">
                  <HaloCard
                    username={c.username}
                    tier={c.tier}
                    tagline={c.tagline}
                    walletAddress={c.pubkey}
                    className="w-[320px]"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 mx-auto h-24 w-[640px] rounded-full bg-halo/15 blur-3xl" />
    </div>
  );
}

export const Landing: React.FC = () => {
  const prefersReduce = useReducedMotion();

  // 3D mouse tilt for hero
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-20, 20], [10, -10]), { stiffness: 120, damping: 12 });
  const ry = useSpring(useTransform(mx, [-20, 20], [-10, 10]), { stiffness: 120, damping: 12 });
  const shineX = useTransform(mx, [-20, 20], ["0%", "100%"]);

  function onMove(e: React.PointerEvent) {
    const b = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const px = ((e.clientX - b.left) / b.width) * 2 - 1;
    const py = ((e.clientY - b.top) / b.height) * 2 - 1;
    mx.set(px * 20);
    my.set(py * 20);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* BACKGROUND: mesh + grid + grain */}
      <div aria-hidden className="fixed inset-0 -z-30">
        <div className="absolute inset-0 bg-mesh animate-mesh" />
        <div className="absolute inset-0 bg-grid opacity-[.06]" />
        <div className="absolute inset-0 bg-noise opacity-[.04] mix-blend-soft-light" />
      </div>

      {/* Aurora blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute left-[8%] top-[18%] h-80 w-80 animate-blob rounded-full bg-halo/10 blur-3xl" />
        <div className="absolute right-[10%] bottom-[16%] h-96 w-96 animate-blob animation-delay-2000 rounded-full bg-primary/15 blur-3xl" />
      </div>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-start pt-28 pb-10 md:pt-36 md:pb-16">
        {/* orbital glow disc */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-0 orbit" />
        </div>

        <div className="container-halo">
          <motion.div
            className="mx-auto max-w-6xl text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* chain chips */}
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="chip">
                <span className="h-2 w-2 rounded-full bg-[#ffd147]" />
                Solana • Mainnet
              </span>
              <span className="chip">
                <ShieldCheck className="h-3.5 w-3.5" />
                Token-gated • Helius RPC
              </span>
            </div>

            {/* 3D plate with shine */}
            <motion.div
              className="mx-auto w-full max-w-5xl select-none"
              style={{ transformStyle: "preserve-3d" as React.CSSProperties["transformStyle"] }}
              onPointerMove={prefersReduce ? undefined : onMove}
              onPointerLeave={prefersReduce ? undefined : onLeave}
            >
              <motion.div
                style={{
                  rotateX: prefersReduce ? 0 : (rx as unknown as number),
                  rotateY: prefersReduce ? 0 : (ry as unknown as number),
                }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                className="relative rounded-3xl p-2"
              >
                <motion.h1
                  className="text-balance text-6xl font-light leading-[0.95] tracking-wide md:text-8xl xl:text-9xl"
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
                  style={{ transform: "translateZ(35px)" }}
                >
                  <span className="block bg-gradient-to-b from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                    Great ideas
                  </span>
                  <span className="block gradient-text">live here</span>
                </motion.h1>

                {/* animated SVG halo ring */}
                <svg
                  className="mx-auto mt-6 h-[72px] w-[360px]"
                  viewBox="0 0 360 72"
                  fill="none"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <defs>
                    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(255,215,84,1)" />
                      <stop offset="70%" stopColor="rgba(255,215,84,.15)" />
                      <stop offset="100%" stopColor="rgba(255,215,84,0)" />
                    </radialGradient>
                  </defs>
                  <ellipse cx="180" cy="36" rx="160" ry="16" fill="url(#halo)" />
                  <ellipse cx="180" cy="36" rx="160" ry="16" className="halo-stroke" />
                </svg>

                {/* moving shine */}
                {!prefersReduce && (
                  <motion.div
                    className="pointer-events-none absolute inset-0 rounded-[24px] opacity-60"
                    style={{
                      background:
                        "radial-gradient(120px 40px at var(--sx, 0%) 18%, rgba(255,255,255,.22), transparent 60%)",
                      transform: "translateZ(48px)",
                      ["--sx" as any]: shineX,
                    }}
                  />
                )}
              </motion.div>
            </motion.div>

            {/* subcopy */}
            <motion.p
              {...fadeUp(0.12)}
              className="mx-auto mt-7 max-w-3xl text-lg text-white/70 md:text-xl"
            >
              A web3 clubhouse for creators. Hold the key, unlock access, mint your
              <span className="text-primary"> HaloCard</span>, and flex it on-chain.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp(0.22)}
              className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link to="/create" aria-label="Create your HaloCard">
                <Button className="group btn-heaven px-7 py-5 text-base">
                  <Sparkles className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                  Create your HaloCard
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/gallery" aria-label="Explore HaloCard gallery">
                <Button variant="outline" className="btn-ghost px-7 py-5 text-base">
                  Explore gallery
                </Button>
              </Link>
            </motion.div>

            {/* CA + trust strip */}
            <motion.div
              {...fadeUp(0.3)}
              className="mx-auto mt-7 flex max-w-2xl flex-col items-center gap-3"
            >
              <CopyableCA />
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                <span className="chip">
                  <Zap className="h-3.5 w-3.5" />
                  Instant PNG share
                </span>
                <span className="chip">
                  <Gauge className="h-3.5 w-3.5" />
                  Fast, low-fee mints
                </span>
                <span className="chip">
                  <Trophy className="h-3.5 w-3.5" />
                  Leaderboards & referrals
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {!prefersReduce && (
          <div className="container-halo">
            <Orbit3D />
          </div>
        )}
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
