"use client";

import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/Reveal";
import { useLang } from "@/lib/LangProvider";

export default function Faq() {
  const { t } = useLang();

  return (
    <section id="duvidas" className="mx-auto max-w-[1400px] px-5 pb-24 sm:pb-32">
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <h2 className="font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {t.faq.title}
          </h2>
        </Reveal>

        <div className="lg:col-span-8">
          {t.faq.items.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.05}>
              <details name="faq" className="group border-b border-biolum/12">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-lg tracking-tight text-tissue transition-colors duration-200 hover:text-biolum">
                  {item.q}
                  <CaretDown
                    size={18}
                    aria-hidden
                    className="shrink-0 text-biolum transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <p className="max-w-[64ch] pb-6 leading-relaxed text-tissue-dim">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
