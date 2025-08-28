import React from "react";
import { motion } from "framer-motion";

export const PremiumBackground: React.FC = () => {
  return (
    <>
      {/* Gradient mesh background */}
      <div className="fixed inset-0 -z-50 mt-1000">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-950/20 via-transparent to-amber-950/20" />
        <div className="absolute inset-0 opacity-30" style={{
          background: 'radial-gradient(ellipse at top left, rgba(139, 92, 246, 0.1), transparent)'
        }} />
        <div className="absolute inset-0 opacity-30" style={{
          background: 'radial-gradient(ellipse at bottom right, rgba(245, 158, 11, 0.1), transparent)'
        }} />
      </div>

      {/* Animated orbs */}
      <div className="pointer-events-none fixed inset-0 -z-40 overflow-hidden">
        {/* Large orb top left */}
        <motion.div
          className="absolute -left-40 -top-40 h-96 w-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.05), transparent)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Medium orb center */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.03), transparent)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Small orb bottom right */}
        <motion.div
          className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15), rgba(6, 182, 212, 0.03), transparent)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </div>

      {/* Grid overlay */}
      <div className="pointer-events-none fixed inset-0 -z-30">
        <div 
          className="h-full w-full opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Noise texture */}
      <div className="pointer-events-none fixed inset-0 -z-20 opacity-[0.015] mix-blend-soft-light">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </>
  );
};