
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { DevtoolBlocker } from '@/components/devtool-blocker';
import { Navbar } from '@/components/navbar'; // Added Navbar import

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Alex Johnson | Full Stack Developer', // Updated title
  description: 'Portfolio of Alex Johnson, a passionate Full Stack Developer specializing in modern web technologies.', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DevtoolBlocker />
          <Navbar /> {/* Added Navbar */}
          <main className="pt-16"> {/* Added padding-top for fixed navbar */}
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
