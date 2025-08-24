import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const MINT_ADDRESS = '5dpN5wMH8j8au29Rp91qn4WfNq6t6xJfcjQNcFeDJ8Ct';

export const CopyableCA = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MINT_ADDRESS);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Contract address copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="glass-card p-6 rounded-2xl border border-border/20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Contract Address</p>
          <p className="font-mono text-sm text-foreground break-all">
            {MINT_ADDRESS.slice(0, 8)}...{MINT_ADDRESS.slice(-8)}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="ml-4 flex-shrink-0"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};