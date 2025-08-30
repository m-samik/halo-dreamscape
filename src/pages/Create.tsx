// src/pages/Create.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletGate } from "@/components/WalletGate";
import { HaloCard } from "@/components/HaloCard";
import { useTokenGate } from "@/hooks/useTokenGate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Share, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cardStore, HaloCardData } from "@/data/mockData";
import { createCard, fetchCard } from "@/api/cards";
import { useNavigate } from "react-router-dom";

// ------------------ FORM COMPONENT ------------------
interface CreateFormProps {
  username: string;
  setUsername: (v: string) => void;
  tagline: string;
  setTagline: (v: string) => void;
  walletAddress: string;
  exists: boolean | null;
  isCreating: boolean;
  tokenStatus: any;
  handleMint: () => void;
  handleDownload: () => void;
  handleShare: () => void;
}

const CreateForm: React.FC<CreateFormProps> = ({
  username,
  setUsername,
  tagline,
  setTagline,
  walletAddress,
  exists,
  isCreating,
  tokenStatus,
  handleMint,
  handleDownload,
  handleShare,
}) => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-light mb-4 text-gradient">
            Create Your HaloCard
          </h1>
          <p className="text-xl text-muted-foreground">
            Design your divine presence on the blockchain
          </p>
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
                <Label className="text-sm font-medium text-muted-foreground">
                  Your Tier
                </Label>
                <div className="mt-2">
                  <Badge variant="secondary" className="text-sm">
                    {tokenStatus.tier}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on your token balance of{" "}
                    {parseFloat(tokenStatus.balanceUi).toFixed(2)} tokens
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
                <Label className="text-sm font-medium text-muted-foreground">
                  Wallet Address
                </Label>
                <p className="font-mono text-sm mt-1 break-all">
                  {walletAddress}
                </p>
                {exists === true && (
                  <p className="text-xs text-red-400 mt-1">
                    You already minted a card for this wallet — creating a new
                    one is blocked.
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4">
                <Button
                  onClick={handleMint}
                  className="w-full"
                  disabled={!username.trim() || isCreating || exists === true}
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
              <p className="text-muted-foreground">
                See how your HaloCard will look
              </p>
            </div>

            <div className="flex justify-center">
              <HaloCard
                username={username || "Your Username"}
                tier={tokenStatus.tier}
                tagline={tagline || undefined}
                walletAddress={walletAddress}
                className="max-w-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ------------------ MAIN CREATE PAGE ------------------
export const Create: React.FC = () => {
  const { publicKey } = useWallet();
  const navigate = useNavigate();
  const tokenStatus = useTokenGate();

  const [username, setUsername] = useState("");
  const [tagline, setTagline] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [exists, setExists] = useState<boolean | null>(null);

  const walletAddress = useMemo(
    () => publicKey?.toBase58() || "",
    [publicKey]
  );

  // Check if this wallet already has a card
  useEffect(() => {
    let alive = true;
    (async () => {
      if (!walletAddress) {
        setExists(null);
        return;
      }
      try {
        const res = await fetchCard(walletAddress);
        if (!alive) return;
        setExists(!!res.exists);
      } catch (e) {
        console.error(e);
        setExists(null);
      }
    })();
    return () => {
      alive = false;
    };
  }, [walletAddress]);

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your HaloCard PNG is being generated...",
    });
  };

  const handleShare = () => {
    const tweetText = `Gate cleared. Minted my #HaloCard — tier ${tokenStatus.tier}. Claim yours: halocard.xyz`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;
    window.open(tweetUrl, "_blank");
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
    if (!walletAddress) return;

    setIsCreating(true);
    try {
      // 1) Block if a card already exists
      const check = await fetchCard(walletAddress);
      if (check.exists) {
        toast({
          title: "Card Already Exists",
          description: "You already created a HaloCard for this wallet.",
          variant: "destructive",
        });
        navigate(`/u/${walletAddress}`);
        return;
      }

      // 2) Create via Atlas Function (atomic, respects unique index)
      await createCard({
        walletAddress,
        displayName: username.trim(),
        tier: tokenStatus.tier,
        metadata: { tagline: tagline.trim() || undefined, source: "webapp" },
      });

      // 3) (Optional) update your local mock store for UI
      const newCard: HaloCardData = {
        id: Date.now().toString(),
        pubkey: walletAddress,
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

      navigate(`/u/${walletAddress}`);
    } catch (e: any) {
      if (e?.code === 409 || /card_exists/i.test(String(e?.message))) {
        toast({
          title: "Card Already Exists",
          description: "You already created a HaloCard for this wallet.",
          variant: "destructive",
        });
        navigate(`/u/${walletAddress}`);
      } else {
        console.error(e);
        toast({
          title: "Mint Failed",
          description: "Something went wrong. Try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <WalletGate>
      <CreateForm
        username={username}
        setUsername={setUsername}
        tagline={tagline}
        setTagline={setTagline}
        walletAddress={walletAddress}
        exists={exists}
        isCreating={isCreating}
        tokenStatus={tokenStatus}
        handleMint={handleMint}
        handleDownload={handleDownload}
        handleShare={handleShare}
      />
    </WalletGate>
  );
};
