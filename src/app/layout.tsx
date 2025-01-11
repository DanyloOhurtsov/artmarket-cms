import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { McLaren, Jost } from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";

import Providers from "@/components/providers/providers";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

import "./globals.css";
import { ourFileRouter } from "./api/uploadthing/core";

const mclaren = McLaren({
  variable: "--font-mclaren",
  subsets: ["latin"],
  weight: ["400"],
});
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
        <body className={`${jost.className} ${mclaren.className} antialiased`}>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <Toaster position="bottom-right" containerStyle={{ zIndex: 99999 }} />
          <TooltipProvider>{children}</TooltipProvider>
        </body>
      </html>
    </Providers>
  );
}
