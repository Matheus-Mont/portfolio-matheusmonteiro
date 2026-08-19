"use client";

import BackToTop from "@/components/BackToTop";
import MicrobeSwarm from "@/components/canvas/MicrobeSwarm";
import SkipLink from "@/components/SkipLink";
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
        {/* 100lvh, not 100%: lvh ignores the mobile address bar, so scrolling
            never resizes this canvas. Blurred because it sits outside the lens. */}
        <MicrobeSwarm
          className="pointer-events-none fixed top-0 left-0 -z-10 h-[100lvh] w-full opacity-70 blur-[1.5px]"
          density={0.75}
        />
        <Nav />
        <main id="main">{children}</main>
        <WhatsAppFab />
        <BackToTop />
      </MotionProvider>
    </LangProvider>
  );
}
