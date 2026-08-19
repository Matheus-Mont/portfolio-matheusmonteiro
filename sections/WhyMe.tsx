"use client";

import { Leaf, Microscope, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import Membrane from "@/components/Membrane";
import Reveal from "@/components/Reveal";
import { useLang } from "@/lib/LangProvider";

const icons = [Microscope, ShieldCheck, Leaf];

export default function WhyMe() {
  const { t } = useLang();

  return (
    <section className="bg-abyss-2/40">
      <Membrane />
      <div className="mx-auto max-w-[1400px] px-5 pt-6 pb-24 sm:pb-32">
        <Reveal>
          <h2 className="max-w-[24ch] font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {t.why.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-5">
          {t.why.cards.map((card, i) => {
            const Icon = icons[i];
            const big = i === 0;
            return (
              <Reveal
                key={card.title}
                delay={i * 0.1}
                as="article"
                className={`relative overflow-hidden rounded-[14px] border border-biolum/15 p-8 ${
                  big ? "lg:col-span-3 lg:row-span-2 lg:p-10" : "lg:col-span-2"
                }`}
              >
                {big && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(61,232,192,0.22),transparent_65%)] motion-safe:animate-breathe"
                  />
                )}
                {i === 1 && (
                  <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.28]">
                    <defs>
                      <pattern id="cells" width="26" height="30" patternUnits="userSpaceOnUse">
                        <path
                          d="M13 1 L25 8 L25 22 L13 29 L1 22 L1 8 Z"
                          fill="none"
                          stroke="#3de8c0"
                          strokeOpacity="0.35"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cells)" />
                  </svg>
                )}
                {i === 2 && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(42,169,216,0.16),transparent_58%)]"
                  />
                )}

                <div className="relative">
                  <Icon size={big ? 34 : 26} weight="light" className="text-biolum" aria-hidden />
                  <h3
                    className={`mt-6 font-display font-semibold tracking-tight ${
                      big ? "text-2xl sm:text-3xl" : "text-xl"
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p className={`mt-3 max-w-[46ch] leading-relaxed text-tissue-dim ${big ? "text-lg" : ""}`}>
                    {card.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
