import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Providers from "@/components/providers/providers";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Panel | ArtMarket",
  description: "",
  authors: [
    { name: "ArtMarket", url: "https://artmarket.com.ua" },
    {
      name: "Developer: Danylo Ohurtsov",
      url: "https://www.linkedin.com/in/danylo-ohurtsov/",
    },
    {
      name: "Designer: Diana Kaminska",
      url: "https://www.linkedin.com/in/diana-kaminska/",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <TooltipProvider>{children}</TooltipProvider>
        </body>
      </html>
    </Providers>
  );
}
