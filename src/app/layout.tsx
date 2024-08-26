import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from 'next-themes';
import dynamic from 'next/dynamic';
import "./globals.css";

const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), { 
  ssr: false,
  loading: () => <div>Loading...</div>
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Steven Hagene - Portfolio",
  description: "Portfolio of Steven Hagene, Senior Software Developer and former Marine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} text-light-text dark:text-dark-text transition-colors`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AnimatedBackground />
          <div className="relative z-10 pointer-events-none">
            <div className="pointer-events-auto">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}