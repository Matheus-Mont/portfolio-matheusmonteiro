"use client";

import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/Button";
import Reveal from "@/components/Reveal";
import { useLang } from "@/lib/LangProvider";

export default function Offer() {
  const { t } = useLang();

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 sm:py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-[14px] border border-biolum/25 bg-[radial-gradient(120%_140%_at_15%_0%,rgba(61,232,192,0.14),transparent_58%),radial-gradient(100%_120%_at_85%_100%,rgba(42,169,216,0.12),transparent_60%)] px-7 py-12 sm:px-14 sm:py-16">
          <h2 className="max-w-[18ch] font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
            {t.offer.title}
          </h2>
          <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-tissue-dim">{t.offer.body}</p>

          <ul className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {t.offer.items.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 0.08} className="flex items-start gap-3">
                <CheckCircle size={21} weight="light" className="mt-0.5 shrink-0 text-biolum" aria-hidden />
                <span className="text-tissue-dim">{item}</span>
              </Reveal>
            ))}
          </ul>

          <div className="mt-11">
            <ButtonLink href="#contato">{t.offer.cta}</ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
