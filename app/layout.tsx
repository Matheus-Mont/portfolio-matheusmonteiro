import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import Providers from "@/components/Providers";
import { copy } from "@/content/copy";
import { profile } from "@/content/profile";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const body = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: copy.pt.meta.title,
  description: copy.pt.meta.description,
  alternates: {
    canonical: "/",
    languages: { "pt-BR": "/", en: "/?lang=en" },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: profile.siteUrl,
    siteName: profile.name,
    title: copy.pt.meta.title,
    description: copy.pt.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: copy.pt.meta.title,
    description: copy.pt.meta.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05080a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} h-full`}>
      <body className="grain min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
