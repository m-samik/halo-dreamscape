import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletGate } from '@/components/WalletGate';
import { HaloCard } from '@/components/HaloCard';
import { useTokenGate } from '@/hooks/useTokenGate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Share, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cardStore, HaloCardData } from '@/data/mockData';

export const Create = () => {
  const { publicKey } = useWallet();
  const tokenStatus = useTokenGate();
  const [username, setUsername] = useState('');
  const [tagline, setTagline] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleDownload = () => {
    // Mock download functionality
    toast({
      title: "Download Started",
      description: "Your HaloCard PNG is being generated...",
    });
  };

  const handleShare = () => {
    const tweetText = `Gate cleared. Minted my #HaloCard — tier ${tokenStatus.tier}. Claim yours: halocard.xyz`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(tweetUrl, '_blank');
  };

  const handleMint = async () => {
    if (!username.trim()) {
      toast({
        title: "Username Required",
        description: "Please enter a username for your HaloCard",
        variant: "destructive",
      });
      return;
    }

    if (!publicKey) return;

    setIsCreating(true);
    
    // Simulate minting process
    setTimeout(() => {
      const newCard: HaloCardData = {
        id: Date.now().toString(),
        pubkey: publicKey.toBase58(),
        username: username.trim(),
        tier: tokenStatus.tier,
        tagline: tagline.trim() || undefined,
        createdAt: new Date().toISOString(),
      };

      cardStore.unshift(newCard);

      toast({
        title: "HaloCard Minted!",
        description: `Your ${tokenStatus.tier} tier HaloCard has been created successfully.`,
      });

      setIsCreating(false);
    }, 2000);
  };

  const CreateForm = () => (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-light mb-4 text-gradient">Create Your HaloCard</h1>
          <p className="text-xl text-muted-foreground">Design your divine presence on the blockchain</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <Card className="glass-card border-border/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Card Details
              </CardTitle>
              <CardDescription>
                Customize your HaloCard with your unique information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Tier Display */}
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Your Tier</Label>
                <div className="mt-2">
                  <Badge variant="secondary" className="text-sm">
                    {tokenStatus.tier}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on your token balance of {parseFloat(tokenStatus.balanceUi).toFixed(2)} tokens
                  </p>
                </div>
              </div>

              {/* Username */}
              <div>
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="mt-2"
                  maxLength={20}
                />
              </div>

              {/* Tagline */}
              <div>
                <Label htmlFor="tagline">Tagline (Optional)</Label>
                <Textarea
                  id="tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Add a personal tagline..."
                  className="mt-2 resize-none"
                  rows={2}
                  maxLength={60}
                />
              </div>

              {/* Wallet Info */}
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Wallet Address</Label>
                <p className="font-mono text-sm mt-1 break-all">
                  {publicKey?.toBase58()}
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4">
                <Button
                  onClick={handleMint}
                  className="w-full"
                  disabled={!username.trim() || isCreating}
                >
                  {isCreating ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
                      Minting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Mint HaloCard
                    </>
                  )}
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="secondary" onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download PNG
                  </Button>
                  <Button variant="secondary" onClick={handleShare}>
                    <Share className="w-4 h-4 mr-2" />
                    Share on X
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Preview */}
          <div className="sticky top-32">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-2">Live Preview</h3>
              <p className="text-muted-foreground">See how your HaloCard will look</p>
            </div>
            
            <div className="flex justify-center">
              <HaloCard
                username={username || 'Your Username'}
                tier={tokenStatus.tier}
                tagline={tagline || undefined}
                walletAddress={publicKey?.toBase58() || ''}
                className="max-w-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <WalletGate>
      <CreateForm />
    </WalletGate>
  );
};