"use client";

import { Translate } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/Reveal";
import { education } from "@/content/profile";
import { useLang } from "@/lib/LangProvider";

export default function Education() {
  const { t } = useLang();

  return (
    <section id="formacao" className="mx-auto max-w-[1400px] px-5 py-24 sm:py-32">
      <Reveal>
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {t.education.title}
        </h2>
      </Reveal>

      <dl className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
        {education.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.08} className="flex gap-5">
            <span
              aria-hidden
              className="mt-1 shrink-0 font-display text-sm tracking-tight text-biolum tabular-nums"
            >
              {item.period}
            </span>
            <div className="min-w-0">
              <dt className="font-display text-lg leading-snug font-semibold tracking-tight text-balance">
                {t.education.items[item.id]}
              </dt>
              <dd className="mt-1 text-sm text-tissue-dim">{item.org}</dd>
            </div>
          </Reveal>
        ))}
      </dl>

      <Reveal delay={0.3}>
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-biolum/12 pt-8">
          <h3 className="inline-flex items-center gap-2 font-display text-sm text-biolum">
            <Translate size={17} weight="light" aria-hidden />
            {t.education.languagesTitle}
          </h3>
          {t.education.languages.map((lang) => (
            <p key={lang.name} className="text-sm text-tissue-dim">
              <span className="text-tissue">{lang.name}</span> {lang.level}
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
