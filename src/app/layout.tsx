
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from "@/components/theme-provider";
import { resumeData } from '@/data/resume';
import { PageWrapper } from '@/components/page-wrapper';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ScrollToTopButton } from '@/components/scroll-to-top-button';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: `${resumeData.name} | ${resumeData.title}`,
  description: resumeData.bio,
  icons:{
    icon:'/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageWrapper>
            <Header />
            <main className="relative z-10">
              {children}
            </main>
            <Footer />
            <ScrollToTopButton />
          </PageWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
