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
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-6xl md:text-8xl font-light mb-8 halo-glow">
              <span className="text-gradient">Great ideas</span>
              <br />
              <span className="text-foreground">live here</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join the exclusive community of HaloCard holders. Create, share, and showcase your divine presence on the blockchain.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
              <Button size="lg" className="px-8 py-4 text-lg" asChild>
                <Link to="/create">
                  Create Card
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" className="px-8 py-4 text-lg" asChild>
                <Link to="/gallery">Browse Cards</Link>
              </Button>
            </div>

            <CopyableCA />
          </motion.div>
        </div>
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