import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryClientProvidersWrap from "@/components/QueryClientProvidersWrap";
import { Toaster } from "@/components/ui/sonner"
import ReduxProviderWrap from "@/components/ReduxProviderWrap";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Blog App Challenge - Gede Wiguna - WPH 034",
  description: "Blog Application Challenge - Next.js  - Gede Wiguna - WPH 034",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={inter.className}
      >
        <ReduxProviderWrap>
          <QueryClientProvidersWrap>
            {children}
            <Toaster />
          </QueryClientProvidersWrap>
        </ReduxProviderWrap>

      </body>
    </html>
  );
}
