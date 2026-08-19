"use client";

import BackToTop from "@/components/BackToTop";
import MicrobeSwarm from "@/components/canvas/MicrobeSwarm";
import SkipLink from "@/components/SkipLink";
import SporeTrail from "@/components/canvas/SporeTrail";
import WhatsAppFab from "@/components/WhatsAppFab";
import Nav from "@/sections/Nav";
import { LangProvider } from "@/lib/LangProvider";
import { MotionProvider } from "@/lib/MotionProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <MotionProvider>
        <SkipLink />
        <div id="top-sentinel" aria-hidden className="absolute top-0 h-px w-full" />
        <MicrobeSwarm className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-80" density={0.75} />
        <SporeTrail />
        <Nav />
        <main id="main">{children}</main>
        <WhatsAppFab />
        <BackToTop />
      </MotionProvider>
    </LangProvider>
  );
}
