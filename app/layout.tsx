import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { profile } from "./content";
import Starfield from "@/components/Starfield";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://sean-milliken.github.io"),
  title: profile.name,
  description: `${profile.name} — experience, projects, and contact.`,
  openGraph: {
    title: profile.name,
    description: `${profile.name} — experience, projects, and contact.`,
    images: ["/headshot.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0e14" },
    { media: "(prefers-color-scheme: light)", color: "#f6f3ee" },
  ],
};

// Runs before first paint so the saved theme is applied without a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'?'light':'dark';}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Starfield />
        {children}
      </body>
    </html>
  );
}
