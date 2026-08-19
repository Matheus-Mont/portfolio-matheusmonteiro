"use client";

import { Waveform, WaveformSlash } from "@phosphor-icons/react/dist/ssr";
import { useCalm } from "@/lib/MotionProvider";
import { useLang } from "@/lib/LangProvider";

export default function CalmToggle({ className = "" }: { className?: string }) {
  const { calm, toggle } = useCalm();
  const { t } = useLang();
  const Icon = calm ? WaveformSlash : Waveform;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={calm}
      aria-label={calm ? t.nav.calmOffAria : t.nav.calmOnAria}
      title={calm ? t.nav.calmOffAria : t.nav.calmOnAria}
      className={`inline-flex items-center gap-2 rounded-full border border-biolum/20 px-3 py-2 font-display text-xs tracking-tight text-tissue-dim transition-colors duration-200 hover:border-biolum/50 hover:text-tissue ${className}`}
    >
      <Icon size={16} weight="regular" aria-hidden />
      <span className="hidden sm:inline">{calm ? t.nav.calmOff : t.nav.calmOn}</span>
    </button>
  );
}
