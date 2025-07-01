'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
        <Button
            size="icon"
            onClick={scrollToTop}
            className={cn(
                "rounded-full h-12 w-12 bg-primary text-primary-foreground shadow-lg transition-all duration-300 ease-out",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-80",
                "hover:bg-primary/90 hover:scale-105"
            )}
            aria-label="Scroll to top"
        >
            <ArrowUp className="h-6 w-6" />
        </Button>
    </div>
  );
}
