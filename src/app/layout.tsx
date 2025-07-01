
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { resumeData } from '@/data/resume';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: `${resumeData.name} | ${resumeData.title}`, 
  description: `Portfolio of ${resumeData.name}, a skilled ${resumeData.title} creating futuristic and immersive web experiences.`, 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
      </head>
      <body className={`${montserrat.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system" 
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="relative z-10">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
