"use client";

import Reveal from "@/components/Reveal";
import { useLang } from "@/lib/LangProvider";

export default function Symptoms() {
  const { t } = useLang();
  const columns = [t.symptoms.colA, t.symptoms.colB];

  return (
    <section className="mx-auto max-w-[1400px] overflow-x-clip px-5 py-24 sm:py-32">
      <Reveal>
        <h2 className="max-w-[20ch] font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {t.symptoms.title}
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-20">
        {columns.map((column, ci) => (
          <div key={column.title}>
            <Reveal from={ci === 0 ? "left" : "right"}>
              <h3 className="font-display text-sm tracking-wide text-biolum">{column.title}</h3>
            </Reveal>
            <ul className="mt-5">
              {column.items.map((item, i) => (
                <Reveal
                  as="li"
                  key={item}
                  from={ci === 0 ? "left" : "right"}
                  delay={0.06 * i}
                  className="border-b border-biolum/12 py-5 text-lg leading-snug text-tissue-dim first:border-t first:border-biolum/12"
                >
                  {item}
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Reveal delay={0.15}>
        <p className="mt-16 font-display text-2xl font-medium tracking-tight text-tissue sm:text-3xl">
          {t.symptoms.bridge}
        </p>
      </Reveal>
    </section>
  );
}
