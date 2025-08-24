import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center pt-32 pb-20 px-6">
      <div className="container mx-auto text-center max-w-md">
        <div className="glass-card p-12 rounded-3xl border border-border/20">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          
          <h1 className="text-6xl font-light mb-4 text-gradient">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            This page doesn't exist in our divine realm. Let's get you back on the right path.
          </p>
          
          <Button variant="hero" size="lg" asChild>
            <a href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Heaven
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
