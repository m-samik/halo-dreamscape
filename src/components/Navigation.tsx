import React from "react";
import { Link, useLocation } from "react-router-dom";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 glass-card border-b border-border/20">
      <div className="container-halo py-4">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="text-2xl font-semibold text-gradient">
            HaloCard
          </Link>

          {/* Center Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            <Link
              to="/gallery"
              className={`transition-colors hover:text-primary ${
                location.pathname === "/gallery"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Ideas
            </Link>
            <Link
              to="/create"
              className={`transition-colors hover:text-primary ${
                location.pathname === "/create"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Create
            </Link>
            <a
              href="#how"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              How it works
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open X (Twitter)"
              >
                <X className="h-5 w-5" />
              </a>
            </Button>
            <WalletMultiButton className="!rounded-lg !border-0 !bg-primary !px-4 !py-2 !text-sm !font-medium !text-primary-foreground hover:!bg-primary/90" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
