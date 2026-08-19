"use client";

import { Translate } from "@phosphor-icons/react/dist/ssr";
import { useLang } from "@/lib/LangProvider";

export default function LangToggle({ className = "" }: { className?: string }) {
  const { lang, toggle, t } = useLang();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.nav.otherLangAria}
      className={`inline-flex items-center gap-2 rounded-full border border-biolum/20 px-3 py-2 font-display text-xs tracking-tight text-tissue-dim transition-colors duration-200 hover:border-biolum/50 hover:text-tissue ${className}`}
    >
      <Translate size={16} aria-hidden />
      <span>{lang === "pt" ? "EN" : "PT"}</span>
    </button>
  );
}
