
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Changed from Geist to Inter
import './globals.css';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { DevtoolBlocker } from '@/components/devtool-blocker';

// Configure Inter font
const inter = Inter({
  variable: '--font-inter', // CSS variable for Inter
  subsets: ['latin'],
  display: 'swap', // Improves font loading performance
});


export const metadata: Metadata = {
  title: 'PortfolioPilot OS',
  description: 'A modern developer portfolio with a macOS-inspired desktop interface.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Apply Inter font variable to body */}
      <body className={`${inter.variable} antialiased macos-desktop-bg overflow-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DevtoolBlocker />
          <main className="h-screen w-screen flex flex-col">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
