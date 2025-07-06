'use client';

import { Montserrat } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { resumeData } from '@/data/resume';
import { Preloader } from '@/components/preloader';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{`${resumeData.name} | ${resumeData.title}`}</title>
        <meta name="description" content={`Portfolio of ${resumeData.name}, a skilled ${resumeData.title} creating futuristic and immersive web experiences.`} />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
      </head>
      <body className={`${montserrat.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
