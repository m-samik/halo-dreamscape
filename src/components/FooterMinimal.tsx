import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FooterMinimal = () => {
  return (
    <footer className="mt-20 border-t border-border/20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Icons */}
          <div className="flex items-center space-x-6">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <X className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Sparkles className="h-5 w-5" />
              </a>
            </Button>
          </div>
          
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} HaloCard
          </p>
        </div>
      </div>
    </footer>
  );
};