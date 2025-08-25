import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Users, Share2, Shield, Zap, Trophy } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Connect Wallet",
    description: "Link your Solana wallet securely through our Helius RPC integration for seamless authentication.",
    gradient: "from-violet-500/10 to-purple-500/10",
    iconColor: "text-violet-400",
    borderColor: "border-violet-500/20"
  },
  {
    icon: Shield,
    title: "Token Verification", 
    description: "Hold the required tokens to unlock exclusive access to the most premium web3 community.",
    gradient: "from-amber-500/10 to-orange-500/10",
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/20"
  },
  {
    icon: Trophy,
    title: "Mint & Share",
    description: "Create your unique HaloCard, download as PNG, and share your achievement across social platforms.",
    gradient: "from-cyan-500/10 to-blue-500/10", 
    iconColor: "text-cyan-400",
    borderColor: "border-cyan-500/20"
  }
];

export const FeatureSection: React.FC = () => {
  return (
    <section className="relative py-32">
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
            How it{" "}
            <span className="bg-gradient-to-r from-amber-400 to-violet-400 bg-clip-text text-transparent">
              works
            </span>
          </h2>
          <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto">
            Three simple steps to join the most exclusive web3 community
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className={`group relative overflow-hidden rounded-3xl border ${feature.borderColor} bg-gradient-to-br ${feature.gradient} p-8 backdrop-blur-xl transition-all duration-300 hover:border-opacity-40`}
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                
                {/* Icon */}
                <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border ${feature.borderColor} bg-gradient-to-br ${feature.gradient} backdrop-blur-sm`}>
                  <Icon className={`h-8 w-8 ${feature.iconColor}`} />
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="mb-4 text-2xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Step number */}
                <div className="absolute top-8 right-8 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-xs font-bold text-white/60">
                  {index + 1}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {[
            { icon: Zap, label: "Lightning Fast", value: "<1s" },
            { icon: Shield, label: "Secure", value: "100%" },
            { icon: Users, label: "Community", value: "10K+" },
            { icon: Share2, label: "Shareable", value: "∞" }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                <Icon className="mx-auto mb-3 h-8 w-8 text-amber-400 transition-transform group-hover:scale-110" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};