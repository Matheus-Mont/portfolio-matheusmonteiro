"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "@/components/Reveal";
import { useCalm } from "@/lib/MotionProvider";
import { useLang } from "@/lib/LangProvider";

export default function Protocol() {
  const { t } = useLang();
  const { calm } = useCalm();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const grow = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-24 sm:py-32">
      <Reveal>
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {t.protocol.title}
        </h2>
      </Reveal>

      <div ref={ref} className="relative mt-16">
        <motion.span
          aria-hidden
          style={calm ? { scaleX: 1 } : { scaleX: grow }}
          className="absolute top-[7px] left-0 hidden h-px w-full origin-left bg-gradient-to-r from-biolum/70 via-biolum/35 to-transparent md:block"
        />
        <motion.span
          aria-hidden
          style={calm ? { scaleY: 1 } : { scaleY: grow }}
          className="absolute top-0 left-[7px] h-full w-px origin-top bg-gradient-to-b from-biolum/70 via-biolum/35 to-transparent md:hidden"
        />

        <ol className="grid gap-10 md:grid-cols-4 md:gap-8">
          {t.protocol.steps.map((step, i) => (
            <Reveal as="li" key={step.name} delay={i * 0.12} className="relative pl-8 md:pt-8 md:pl-0">
              <span
                aria-hidden
                className="absolute top-[3px] left-0 h-[15px] w-[15px] rounded-full border border-biolum/60 bg-abyss md:top-0"
              />
              <h3 className="font-display text-xl font-semibold tracking-tight">{step.name}</h3>
              <p className="mt-2 max-w-[34ch] leading-relaxed text-tissue-dim">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
