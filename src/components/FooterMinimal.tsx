import React from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles, Github, Mail, Shield, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FooterMinimal = () => {
  return (
    <footer className="relative mt-32 border-t border-border/20 bg-gradient-to-t from-black/20 to-transparent">
      <div className="container-halo py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="text-lg font-semibold text-gradient">
              HaloCard
            </Link>
            <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
              The most exclusive web3 clubhouse for visionaries. Hold the key, unlock your potential, 
              and mint your digital legacy on Solana.
            </p>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-emerald-300">Live on Solana Mainnet</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              <Link to="/create" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Create HaloCard
              </Link>
              <Link to="/gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Explore Gallery
              </Link>
              <a href="#how" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                How it Works
              </a>
            </nav>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Community</h3>
            <div className="flex flex-col space-y-3">
              <Button variant="ghost" size="sm" asChild className="justify-start px-0 h-auto">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                   className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary">
                  <X className="h-4 w-4" />
                  <span>Follow us</span>
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild className="justify-start px-0 h-auto">
                <a href="mailto:hello@halocard.io" 
                   className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary">
                  <Mail className="h-4 w-4" />
                  <span>Contact</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 pt-8 border-t border-border/10">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3 w-3 text-amber-400" />
              <span>Token Gated</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Zap className="h-3 w-3 text-emerald-400" />
              <span>Instant Mint</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="h-3 w-3 text-violet-400" />
              <span>Exclusive Access</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} HaloCard. Crafted with ✨ for web3 visionaries.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};