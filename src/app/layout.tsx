
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { DevtoolBlocker } from '@/components/devtool-blocker';
import { Navbar } from '@/components/navbar'; 

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Alex Johnson | Full Stack Developer', 
  description: 'Portfolio of Alex Johnson, a passionate Full Stack Developer specializing in modern web technologies.', 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" 
          enableSystem
          disableTransitionOnChange
        >
          <DevtoolBlocker />
          <Navbar /> 
          <main className="pt-16"> {/* Added pt-16 to account for fixed top navbar height */}
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

    