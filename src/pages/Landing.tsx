import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CopyableCA } from '@/components/CopyableCA';
import { HaloCard } from '@/components/HaloCard';
import { mockCards } from '@/data/mockData';
import { ArrowRight, Sparkles, Users, Share2 } from 'lucide-react';

export const Landing = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll animation
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;
    
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= scrollWidth - clientWidth) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      requestAnimationFrame(animate);
    };

    const animation = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Background Clouds */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Additional background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-archangel/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-archangel/10 blur-3xl" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            {/* Main headline with enhanced styling */}
            <div className="relative mb-8">
              <motion.h1 
                className="text-7xl md:text-9xl font-thin mb-4 leading-tight"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <span className="block text-gradient halo-glow">Great ideas</span>
                <span className="block text-foreground/90 font-light">live here</span>
              </motion.h1>
              
              {/* Floating decorative elements */}
              <motion.div 
                className="absolute -top-8 -right-8 w-4 h-4 rounded-full bg-primary/60"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute top-1/2 -left-12 w-2 h-2 rounded-full bg-archangel/80"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <motion.div 
                className="absolute -bottom-4 left-1/3 w-3 h-3 rounded-full bg-cherubim/70"
                animate={{ y: [-5, 15, -5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
            </div>
            
            {/* Enhanced subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Enter the exclusive realm of <span className="text-primary font-semibold">divine creators</span>. 
              Mint your sacred HaloCard and join the enlightened community on Solana.
            </motion.p>

            {/* Enhanced CTA buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button size="xl" variant="hero" className="group" asChild>
                <Link to="/create">
                  <Sparkles className="mr-3 w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Create Your HaloCard
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="glass" size="xl" className="backdrop-blur-xl" asChild>
                <Link to="/gallery">
                  <Users className="mr-2 w-5 h-5" />
                  Explore Gallery
                </Link>
              </Button>
            </motion.div>

            {/* Enhanced Contract Address with better styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="max-w-md mx-auto"
            >
              <CopyableCA />
            </motion.div>
          </motion.div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center">
            <div className="w-1 h-3 bg-primary/60 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Auto-scrolling Card Rail */}
      <section className="py-16 overflow-hidden">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold mb-4 text-gradient">Featured HaloCards</h2>
          <p className="text-muted-foreground">Discover the community of enlightened holders</p>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex space-x-6 overflow-x-hidden py-8"
          style={{ width: 'calc(100% + 100px)' }}
        >
          {[...mockCards, ...mockCards].map((card, index) => (
            <div key={`${card.id}-${index}`} className="flex-shrink-0">
              <div className="card-float" style={{ animationDelay: `${index * 0.2}s` }}>
                <HaloCard
                  username={card.username}
                  tier={card.tier}
                  tagline={card.tagline}
                  walletAddress={card.pubkey}
                  className="w-80"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold mb-4 text-gradient">How it works</h2>
            <p className="text-xl text-muted-foreground">Three simple steps to join the divine community</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="glass-card p-8 rounded-3xl border border-border/20 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Connect</h3>
                <p className="text-muted-foreground">Connect your Solana wallet to get started on your journey</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="glass-card p-8 rounded-3xl border border-border/20 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Qualify</h3>
                <p className="text-muted-foreground">Hold the required tokens to unlock exclusive access to HaloCard</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="glass-card p-8 rounded-3xl border border-border/20 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Share2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Flex</h3>
                <p className="text-muted-foreground">Create your unique HaloCard and share it with the world</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};