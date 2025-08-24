import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { HaloCard } from '@/components/HaloCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cardStore } from '@/data/mockData';
import { ArrowLeft, Download, Share, ExternalLink, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const UserProfile = () => {
  const { pubkey } = useParams<{ pubkey: string }>();
  const card = cardStore.find(c => c.pubkey === pubkey);

  if (!card) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold mb-4">HaloCard Not Found</h1>
            <p className="text-muted-foreground mb-8">
              This HaloCard doesn't exist or may have been removed.
            </p>
            <Button asChild>
              <Link to="/gallery">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Gallery
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "HaloCard PNG is being generated...",
    });
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    const tweetText = `Check out this amazing ${card.tier} tier #HaloCard by ${card.username}! ${shareUrl}`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Profile link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  const handleCopyWallet = async () => {
    try {
      await navigator.clipboard.writeText(card.pubkey);
      toast({
        title: "Wallet Copied",
        description: "Wallet address copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link to="/gallery">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Gallery
            </Link>
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* HaloCard Display */}
          <div className="flex justify-center lg:justify-start">
            <HaloCard
              username={card.username}
              tier={card.tier}
              tagline={card.tagline}
              walletAddress={card.pubkey}
              className="max-w-sm w-full"
            />
          </div>

          {/* Profile Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-light mb-2 text-gradient">{card.username}</h1>
              <Badge variant="secondary" className="mb-4">
                {card.tier} Tier
              </Badge>
              {card.tagline && (
                <p className="text-lg text-muted-foreground italic mb-4">
                  "{card.tagline}"
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Minted on {new Date(card.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>

            {/* Wallet Info */}
            <div className="glass-card p-6 rounded-2xl border border-border/20">
              <h3 className="text-lg font-semibold mb-3">Wallet Details</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-mono text-sm break-all">
                    {card.pubkey.slice(0, 8)}...{card.pubkey.slice(-8)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={handleCopyWallet}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" asChild>
                    <a 
                      href={`https://solscan.io/account/${card.pubkey}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Share Actions */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Share This HaloCard</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button onClick={handleDownload} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="secondary" onClick={handleShare} className="w-full">
                  <Share className="w-4 h-4 mr-2" />
                  Share on X
                </Button>
                <Button variant="secondary" onClick={handleCopyLink} className="w-full">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};