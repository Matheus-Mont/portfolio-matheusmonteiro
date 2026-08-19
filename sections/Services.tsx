"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Broadcast, Browser, Bug, Flask } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/Reveal";
import { useCalm } from "@/lib/MotionProvider";
import { useLang } from "@/lib/LangProvider";

const icons = [Flask, Browser, Bug, Broadcast];

export default function Services() {
  const { t } = useLang();
  const { calm, ready } = useCalm();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready || calm || !wrapRef.current) return;
    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !wrapRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".strain-inner");
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          const trigger = {
            trigger: cards[i + 1].parentElement,
            start: "top bottom",
            end: "top top",
            scrub: true,
          };
          gsap.to(card, { scale: 0.93, ease: "none", scrollTrigger: trigger });
          gsap.to(card.querySelector(".strain-veil"), {
            opacity: 0.72,
            ease: "none",
            scrollTrigger: trigger,
          });
        });
      }, wrapRef);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [calm, ready]);

  return (
    <section id="servicos" className="mx-auto max-w-[1400px] px-5 py-24 sm:py-32">
      <Reveal>
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {t.services.title}
        </h2>
      </Reveal>

      <div ref={wrapRef} className="mt-12">
        {t.services.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <div
              key={item.name}
              className="strain-card sticky"
              style={{ top: `calc(5.5rem + ${i * 1.1}rem)`, zIndex: i + 1 }}
            >
              <article className="strain-inner relative mb-6 origin-top overflow-hidden rounded-[14px] border border-biolum/18 bg-abyss-3 p-8 shadow-[0_-20px_60px_-30px_rgba(5,8,10,0.9)] sm:p-12">
                <span
                  aria-hidden
                  className="strain-veil pointer-events-none absolute inset-0 bg-abyss opacity-0"
                />
                <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-[54ch]">
                    <Icon size={30} weight="light" className="text-biolum" aria-hidden />
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                        {item.name}
                      </h3>
                      {i === 0 && (
                        <span className="rounded-full border border-biolum/40 px-3 py-1 font-display text-xs text-biolum">
                          {t.services.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-4 text-lg leading-relaxed text-tissue-dim">{item.body}</p>
                  </div>
                  <a
                    href="#contato"
                    className="group inline-flex shrink-0 items-center gap-2 font-display text-sm text-biolum transition-colors duration-200 hover:text-tissue"
                  >
                    {t.services.link}
                    <ArrowRight
                      size={16}
                      weight="bold"
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
