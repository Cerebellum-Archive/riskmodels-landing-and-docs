import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/Navbar";
import { SupabaseProvider } from "@/components/SupabaseProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DocuGuard - Secure Documentation Portal",
  description: "Secure documentation portal with authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SupabaseProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-4rem)] px-4 py-4 md:px-8 md:py-8 pt-[32px]">
              {/* pt-[64px] jika Navbar fixed dengan height 64px */}
              {children}
            </main>
            <Toaster />
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
