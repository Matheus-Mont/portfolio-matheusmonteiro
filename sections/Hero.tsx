"use client";

import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/Button";
import MicrobeSwarm from "@/components/canvas/MicrobeSwarm";
import { useCalm } from "@/lib/MotionProvider";
import { useLang } from "@/lib/LangProvider";

export default function Hero() {
  const { t } = useLang();
  const { calm } = useCalm();
  const sectionRef = useRef<HTMLElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const lensY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [9, -9]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-9, 9]), { stiffness: 150, damping: 18 });

  const onLensMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (calm || !lensRef.current) return;
    const rect = lensRef.current.getBoundingClientRect();
    tiltX.set((event.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const lines = t.hero.titleLines;
  let charIndex = 0;
  const ticks = Array.from({ length: 24 }, (_, i) => i * 15);

  return (
    <section
      ref={sectionRef}
      id="topo"
      className="relative flex min-h-[100dvh] items-center pt-24 pb-16"
    >
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 px-5 lg:grid-cols-12 lg:gap-8">
        <motion.div style={calm ? undefined : { y: copyY, opacity: fade }} className="lg:col-span-7">
          <h1
            aria-label={lines.join(" ")}
            className="font-display text-[clamp(2.05rem,5.1vw,3.45rem)] leading-[1.06] font-semibold tracking-tight"
          >
            {lines.map((line, li) => (
              <span key={li} className={`block ${li === 1 ? "text-biolum" : ""}`} aria-hidden>
                {calm
                  ? line
                  : line.split(" ").map((word, wi) => (
                      <span key={`${li}-${wi}`} className="inline-block whitespace-nowrap">
                        {[...word].map((char, ci) => {
                          charIndex += 1;
                          return (
                            <motion.span
                              key={ci}
                              className="inline-block"
                              initial={{ opacity: 0, y: "0.45em" }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: 0.12 + charIndex * 0.016,
                                duration: 0.55,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            >
                              {char}
                            </motion.span>
                          );
                        })}
                        <span className="inline-block">&nbsp;</span>
                      </span>
                    ))}
              </span>
            ))}
          </h1>

          <motion.p
            initial={calm ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[52ch] text-lg leading-relaxed text-tissue-dim"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={calm ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="#contato">
              {t.hero.ctaPrimary}
              <ArrowRight size={17} weight="bold" aria-hidden />
            </ButtonLink>
            <ButtonLink href="#projetos" variant="ghost">
              {t.hero.ctaSecondary}
            </ButtonLink>
          </motion.div>
        </motion.div>

        <motion.div
          style={calm ? undefined : { y: lensY }}
          className="relative mx-auto w-full max-w-[420px] lg:col-span-5 lg:max-w-none"
        >
          <motion.div
            ref={lensRef}
            onPointerMove={onLensMove}
            onPointerLeave={() => {
              tiltX.set(0);
              tiltY.set(0);
            }}
            style={calm ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
            className="relative aspect-square w-full overflow-hidden rounded-full"
            aria-label={t.hero.slideAria}
            role="img"
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(61,232,192,0.12),rgba(5,8,10,0.45)_72%)]" />
            <MicrobeSwarm
              density={2.6}
              interactive={false}
              light={false}
              className="absolute inset-0 h-full w-full rounded-full"
            />
            <div className="absolute inset-0 rounded-full border border-biolum/25 bg-biolum/[0.03] backdrop-blur-[1px] backdrop-saturate-150" />
            <div className="absolute inset-[9%] rounded-full border border-biolum/15" />
            <div className="absolute inset-[26%] rounded-full border border-plasma/20" />
            <div
              className="absolute inset-[3%] rounded-full border border-dashed border-biolum/20 motion-safe:animate-[spin_60s_linear_infinite]"
              aria-hidden
            />
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
              {ticks.map((deg) => {
                const long = deg % 90 === 0;
                const rInner = long ? 89 : 93;
                const rOuter = 96;
                const rad = (deg * Math.PI) / 180;
                const round = (n: number) => Math.round(n * 100) / 100;
                return (
                  <line
                    key={deg}
                    x1={round(100 + rInner * Math.cos(rad))}
                    y1={round(100 + rInner * Math.sin(rad))}
                    x2={round(100 + rOuter * Math.cos(rad))}
                    y2={round(100 + rOuter * Math.sin(rad))}
                    stroke="#3de8c0"
                    strokeOpacity={long ? 0.34 : 0.16}
                    strokeWidth={long ? 1 : 0.6}
                  />
                );
              })}
              <line x1="100" y1="72" x2="100" y2="128" stroke="#3de8c0" strokeOpacity="0.22" />
              <line x1="72" y1="100" x2="128" y2="100" stroke="#3de8c0" strokeOpacity="0.22" />
            </svg>
            <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_0_rgba(230,240,238,0.12),inset_0_-30px_60px_-30px_rgba(61,232,192,0.35)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
