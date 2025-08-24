import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HaloCard } from '@/components/HaloCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cardStore, HaloCardData } from '@/data/mockData';
import { Search, Filter, Sparkles } from 'lucide-react';

export const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  
  const filteredCards = cardStore.filter(card => {
    const matchesSearch = card.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.tagline?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = selectedTier === 'all' || card.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  const tierCounts = {
    all: cardStore.length,
    Angel: cardStore.filter(card => card.tier === 'Angel').length,
    Archangel: cardStore.filter(card => card.tier === 'Archangel').length,
    Cherubim: cardStore.filter(card => card.tier === 'Cherubim').length,
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-light mb-4 text-gradient">Gallery of Ideas</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the divine collection of HaloCards from our enlightened community
          </p>
        </div>

        {/* Filters */}
        <div className="glass-card p-6 rounded-2xl border border-border/20 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by username or tagline..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Tier Filter */}
            <div className="flex gap-2">
              {Object.entries(tierCounts).map(([tier, count]) => (
                <Button
                  key={tier}
                  variant={selectedTier === tier ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSelectedTier(tier)}
                  className="flex items-center gap-2"
                >
                  {tier === 'all' ? <Filter className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                  {tier} ({count})
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <p className="text-muted-foreground">
            Showing {filteredCards.length} of {cardStore.length} HaloCards
          </p>
        </div>

        {/* Cards Grid */}
        {filteredCards.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={`/u/${card.pubkey}`}
                  className="block transform transition-all duration-300 hover:scale-105"
                >
                  <HaloCard
                    username={card.username}
                    tier={card.tier}
                    tagline={card.tagline}
                    walletAddress={card.pubkey}
                    className="w-full h-full"
                  />
                  
                  {/* Card Footer */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      Minted {new Date(card.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No HaloCards Found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search terms or filters
            </p>
            <Button variant="secondary" onClick={() => {
              setSearchTerm('');
              setSelectedTier('all');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};