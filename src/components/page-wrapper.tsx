'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Preloader } from '@/components/preloader';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster";
import { ScrollToTopButton } from '@/components/scroll-to-top-button';

export function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This timeout should be slightly longer than the preloader's animation sequence.
    // The sequence is approx. (900ms for first word) + (6 words * 150ms) = 1800ms.
    // Adding a buffer for the final word and exit animation.
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0,0);
    }, 2500); // Adjusted timing for a smooth experience

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      {/* Render content only after loading is false to prevent it from being in the DOM during preloading */}
      {!isLoading && (
        <>
          <Header />
          <main className="relative z-10">
            {children}
          </main>
          <Footer />
          <Toaster />
          <ScrollToTopButton />
        </>
      )}
    </>
  );
}
