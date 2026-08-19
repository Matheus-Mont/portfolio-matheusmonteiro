"use client";

import { useLang } from "@/lib/LangProvider";

export default function SkipLink() {
  const { t } = useLang();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-venom focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:text-abyss"
    >
      {t.nav.skip}
    </a>
  );
}
