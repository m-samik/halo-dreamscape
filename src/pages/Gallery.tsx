import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HaloCard } from "@/components/HaloCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Sparkles } from "lucide-react";
import { fetchLatestCards } from "@/api/cards";

type UIHaloCard = {
  pubkey: string;
  username: string;
  tier: "Angel" | "Archangel" | "Cherubim";
  tagline?: string;
  createdAt: string;
};

export const Gallery: React.FC = () => {
  const [cards, setCards] = useState<UIHaloCard[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  // Fetch all cards
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const all = await fetchLatestCards(100); // fetch up to 100
        const mapped: UIHaloCard[] = all.map((c) => ({
          pubkey: c.walletAddress,
          username: c.displayName || "Holder",
          tier: (c.tier as UIHaloCard["tier"]) || "Angel",
          tagline:
            (c.metadata as any)?.tagline ??
            (typeof c.metadata?.tagline === "string"
              ? c.metadata.tagline
              : undefined),
          createdAt:
            typeof c.createdAt === "string"
              ? c.createdAt
              : c.createdAt instanceof Date
              ? c.createdAt.toISOString()
              : new Date().toISOString(),
        }));
        if (alive) setCards(mapped);
      } catch (e) {
        console.error("Failed to load cards:", e);
        if (alive) setCards([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Filtering
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesSearch =
        card.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.tagline?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTier = selectedTier === "all" || card.tier === selectedTier;
      return matchesSearch && matchesTier;
    });
  }, [cards, searchTerm, selectedTier]);

  // Tier counts
  const tierCounts = useMemo(
    () => ({
      all: cards.length,
      Angel: cards.filter((c) => c.tier === "Angel").length,
      Archangel: cards.filter((c) => c.tier === "Archangel").length,
      Cherubim: cards.filter((c) => c.tier === "Cherubim").length,
    }),
    [cards]
  );

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-light mb-4 text-gradient">
            Gallery of Ideas
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the divine collection of HaloCards from our enlightened
            community
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

            {/* Tier filter */}
            <div className="flex gap-2">
              {Object.entries(tierCounts).map(([tier, count]) => (
                <Button
                  key={tier}
                  variant={selectedTier === tier ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSelectedTier(tier)}
                  className="flex items-center gap-2"
                >
                  {tier === "all" ? (
                    <Filter className="w-3 h-3" />
                  ) : (
                    <Sparkles className="w-3 h-3" />
                  )}
                  {tier} ({count})
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <p className="text-muted-foreground">
            Showing {filteredCards.length} of {cards.length} HaloCards
          </p>
        </div>

        {/* Cards grid */}
        {loading && (
          <div className="text-center text-slate-400">Loading cards…</div>
        )}
        {!loading && filteredCards.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCards.map((card, index) => (
              <motion.div
                key={`${card.pubkey}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
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
          !loading && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No HaloCards Found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters
              </p>
              <Button
                variant="secondary"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTier("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
};
