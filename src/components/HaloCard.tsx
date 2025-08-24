import React from 'react';
import { motion } from 'framer-motion';

interface HaloCardProps {
  username: string;
  tier: 'Angel' | 'Archangel' | 'Cherubim';
  tagline?: string;
  walletAddress: string;
  className?: string;
}

const tierColors = {
  Angel: 'border-angel bg-angel/5',
  Archangel: 'border-archangel bg-archangel/5',
  Cherubim: 'border-cherubim bg-cherubim/5',
};

const tierGlows = {
  Angel: 'shadow-[0_0_30px_hsl(var(--angel)/0.3)]',
  Archangel: 'shadow-[0_0_30px_hsl(var(--archangel)/0.3)]',
  Cherubim: 'shadow-[0_0_30px_hsl(var(--cherubim)/0.3)]',
};

export const HaloCard: React.FC<HaloCardProps> = ({
  username,
  tier,
  tagline,
  walletAddress,
  className = '',
}) => {
  const shortWallet = `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`;

  return (
    <motion.div
      className={`relative glass-card rounded-3xl p-8 ${tierColors[tier]} ${tierGlows[tier]} ${className}`}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Halo Ring */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <div className={`w-16 h-4 rounded-full border-2 ${tierColors[tier].split(' ')[0]} ${tierGlows[tier]} opacity-80`}>
          <div className={`w-full h-full rounded-full bg-gradient-to-r from-transparent via-current to-transparent opacity-60`} />
        </div>
      </div>

      {/* Content */}
      <div className="text-center space-y-4 pt-4">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{username}</h3>
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${tierColors[tier]}`}>
            {tier}
          </div>
        </div>

        {tagline && (
          <p className="text-sm text-muted-foreground italic">"{tagline}"</p>
        )}

        <div className="pt-4 border-t border-border/20">
          <p className="text-xs text-muted-foreground font-mono">{shortWallet}</p>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-current via-transparent to-current" />
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-current opacity-10 blur-3xl" />
      </div>
    </motion.div>
  );
};