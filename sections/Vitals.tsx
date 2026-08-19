"use client";

import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import { vitals } from "@/content/profile";
import { useLang } from "@/lib/LangProvider";

export default function Vitals() {
  const { t } = useLang();

  return (
    <section className="border-y border-biolum/10 bg-abyss-2/60">
      <div className="mx-auto max-w-[1400px] px-5 py-12">
        <dl className="grid grid-cols-2 gap-y-9 sm:grid-cols-4">
          {vitals.map((item, i) => (
            <Reveal
              key={item.key}
              delay={i * 0.08}
              className="flex flex-col-reverse px-2 sm:border-l sm:border-biolum/12 sm:first:border-l-0 sm:px-7"
            >
              <dt className="mt-2 text-sm leading-snug text-tissue-dim">{t.vitals.labels[item.key]}</dt>
              <dd className="font-display text-4xl font-semibold tracking-tight text-biolum tabular-nums sm:text-5xl">
                <Counter value={item.value} suffix={item.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
        <Reveal delay={0.3}>
          <p className="mt-10 text-sm text-tissue-dim">{t.vitals.micro}</p>
        </Reveal>
      </div>
    </section>
  );
}
