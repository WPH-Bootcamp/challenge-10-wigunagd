import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', 
});


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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
