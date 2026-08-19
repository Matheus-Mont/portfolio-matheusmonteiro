"use client";

import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/content/profile";
import { useLang } from "@/lib/LangProvider";
import { useCalm } from "@/lib/MotionProvider";

export default function WhatsAppFab() {
  const { t } = useLang();
  const { calm } = useCalm();
  const href = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
    `${t.contact.prefill} ${t.services.items[0].name.toLowerCase()}.`,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.ui.whatsapp}
      className="fixed right-5 bottom-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-biolum text-abyss shadow-[0_10px_35px_-10px_rgba(61,232,192,0.8)] transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      {!calm && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-biolum/60 animate-sting"
        />
      )}
      <WhatsappLogo size={28} weight="fill" aria-hidden className="relative" />
    </a>
  );
}
