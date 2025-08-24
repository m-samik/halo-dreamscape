import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useTokenGate } from '@/hooks/useTokenGate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Sparkles } from 'lucide-react';

interface WalletGateProps {
  children: React.ReactNode;
}

export const WalletGate: React.FC<WalletGateProps> = ({ children }) => {
  const { connected } = useWallet();
  const tokenStatus = useTokenGate();

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md glass-card border-border/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
            <CardDescription>
              Connect your Solana wallet to access HaloCard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WalletMultiButton className="!w-full !bg-primary !text-primary-foreground hover:!bg-primary/90 !rounded-lg !py-3 !text-base !font-medium transition-colors !border-0" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (tokenStatus.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md glass-card border-border/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <span className="text-muted-foreground">Checking token balance...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!tokenStatus.ok) {
    const shortfall = (parseFloat(tokenStatus.requiredUi) - parseFloat(tokenStatus.balanceUi)).toFixed(2);
    
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md glass-card border-border/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Access Denied</CardTitle>
            <CardDescription>
              You need to hold the required tokens to access this area
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="glass-card p-4 rounded-lg border border-border/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Your Balance:</span>
                <span className="font-mono text-sm">{parseFloat(tokenStatus.balanceUi).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Required:</span>
                <span className="font-mono text-sm">{parseFloat(tokenStatus.requiredUi).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-destructive">
                <span className="text-sm font-medium">Shortfall:</span>
                <span className="font-mono text-sm font-medium">{shortfall}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button className="w-full" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Buy on Heaven
                </a>
              </Button>
              <Button variant="secondary" className="w-full" asChild>
                <a href="https://jup.ag" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Swap on Jupiter
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};