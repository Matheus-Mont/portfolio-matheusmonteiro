"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { profile, stack } from "@/content/profile";
import { useCalm } from "@/lib/MotionProvider";
import { useLang } from "@/lib/LangProvider";

export default function About() {
  const { t } = useLang();
  const { calm } = useCalm();

  return (
    <section id="sobre" className="border-y border-biolum/10 bg-abyss-2/50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1400px] items-start gap-12 px-5 lg:grid-cols-12 lg:gap-16">
        <Reveal from="left" className="min-w-0 lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[14px] border border-biolum/18">
            <Image
              src="/photos/matheus-hero.jpg"
              alt={t.about.photoAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
              priority={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(5,8,10,0.55),transparent_60%)]" />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-6 rounded-[10px] border border-biolum/12"
            />
          </div>
        </Reveal>

        <div className="min-w-0 lg:col-span-7">
          <Reveal>
            <h2 className="max-w-[20ch] font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {t.about.title}
            </h2>
          </Reveal>
          {t.about.body.map((paragraph, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08}>
              <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-tissue-dim">{paragraph}</p>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <h3 className="mt-14 font-display text-sm tracking-wide text-biolum">
              {t.about.stackTitle}
            </h3>
          </Reveal>

          <div className="relative mt-5 w-full max-w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <ul
              className={`flex w-max gap-3 ${calm ? "flex-wrap" : "motion-safe:animate-marquee hover:[animation-play-state:paused]"}`}
            >
              {(calm ? stack : [...stack, ...stack]).map((tech, i) => (
                <li
                  key={`${tech}-${i}`}
                  aria-hidden={!calm && i >= stack.length}
                  className="rounded-full border border-biolum/15 px-4 py-2 font-display text-sm text-tissue-dim"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={0.35}>
            <p className="mt-10 text-sm text-tissue-dim">
              {profile.city} <span className="text-biolum">/</span> {profile.handle}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
