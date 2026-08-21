"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CaretLeft, CaretRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/Reveal";
import { projects } from "@/content/profile";
import { useCalm } from "@/lib/MotionProvider";
import { useLang } from "@/lib/LangProvider";

export default function Work() {
  const { t } = useLang();
  const { calm } = useCalm();
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll("article");
    const first = cards[0];
    const last = cards[cards.length - 1];
    if (!first || !last) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === first) setAtStart(entry.intersectionRatio > 0.9);
          if (entry.target === last) setAtEnd(entry.intersectionRatio > 0.9);
        }
      },
      { root: track, threshold: [0, 0.9, 1] },
    );
    observer.observe(first);
    observer.observe(last);
    return () => observer.disconnect();
  }, []);

  const slide = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.querySelector("article");
      const step = card ? card.getBoundingClientRect().width + 20 : track.clientWidth * 0.8;
      track.scrollBy({ left: direction * step, behavior: calm ? "auto" : "smooth" });
    },
    [calm],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !window.matchMedia("(pointer: fine)").matches) return;

    let dragging = false;
    let startX = 0;
    let startScroll = 0;

    const onDown = (event: PointerEvent) => {
      dragging = true;
      startX = event.clientX;
      startScroll = track.scrollLeft;
      track.style.scrollSnapType = "none";
      track.setPointerCapture(event.pointerId);
    };
    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      track.scrollLeft = startScroll - (event.clientX - startX);
    };
    const onUp = (event: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      track.style.scrollSnapType = "";
      track.releasePointerCapture(event.pointerId);
    };

    track.addEventListener("pointerdown", onDown);
    track.addEventListener("pointermove", onMove);
    track.addEventListener("pointerup", onUp);
    track.addEventListener("pointercancel", onUp);
    return () => {
      track.removeEventListener("pointerdown", onDown);
      track.removeEventListener("pointermove", onMove);
      track.removeEventListener("pointerup", onUp);
      track.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const arrow =
    "grid h-11 w-11 place-items-center rounded-full border border-biolum/25 text-tissue transition-colors duration-200 hover:border-biolum/60 hover:bg-biolum/5 disabled:cursor-not-allowed disabled:border-biolum/10 disabled:text-tissue-dim/40";

  return (
    <section
      id="projetos"
      className="border-y border-biolum/10 bg-abyss-2/70 py-24 sm:py-32"
    >
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-end justify-between gap-6 px-8 sm:px-5">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {t.work.title}
          </h2>
        </Reveal>
        <div className="flex gap-2 lg:hidden">
          <button type="button" onClick={() => slide(-1)} disabled={atStart} aria-label={t.work.prev} className={arrow}>
            <CaretLeft size={18} aria-hidden />
          </button>
          <button type="button" onClick={() => slide(1)} disabled={atEnd} aria-label={t.work.next} className={arrow}>
            <CaretRight size={18} aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-label={t.work.hint}
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-8 scroll-pr-8 pb-4 sm:scroll-pl-5 sm:scroll-pr-5 [scrollbar-width:none] lg:mt-14 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-5 lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => {
          const item = t.work.items[project.id];
          return (
            <article
              key={project.id}
              className="flex w-[76vw] shrink-0 snap-start flex-col overflow-hidden rounded-[14px] border border-biolum/18 bg-abyss-3/80 first:ml-8 last:mr-8 sm:w-[62vw] sm:first:ml-5 sm:last:mr-5 lg:w-auto lg:shrink lg:first:ml-0 lg:last:mr-0"
            >
              <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-abyss sm:aspect-[16/10]">
                <Image
                  src={project.shot}
                  alt={`${item.name}: ${t.work.shotAlt}`}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 62vw, 76vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss-3/70 via-transparent to-transparent" />
              </div>

              <div className="flex flex-1 flex-col gap-4 p-5 sm:gap-5 sm:p-8">
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{item.name}</h3>
                  <p className="mt-1 text-sm text-biolum">{item.kind}</p>
                </div>

                <dl className="space-y-3 text-sm leading-snug sm:space-y-4 sm:text-[0.95rem] sm:leading-relaxed">
                  {(["problem", "did", "result"] as const).map((key) => (
                    <div key={key}>
                      <dt className="font-display text-xs text-tissue-dim">{t.work.labels[key]}</dt>
                      <dd
                        className={`line-clamp-2 sm:line-clamp-none ${key === "result" ? "text-tissue" : "text-tissue-dim"}`}
                      >
                        {item[key]}
                      </dd>
                    </div>
                  ))}
                </dl>

                <ul className="flex flex-wrap gap-2 pt-1 sm:pt-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-biolum/15 px-3 py-1 font-display text-xs text-tissue-dim"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-3">
                  <a
                    href={project.deploy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 font-display text-sm text-biolum transition-colors duration-200 hover:text-tissue"
                  >
                    {t.work.viewLive}
                    <ArrowUpRight
                      size={15}
                      weight="bold"
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-display text-sm text-tissue-dim transition-colors duration-200 hover:text-tissue"
                  >
                    <GithubLogo size={15} aria-hidden />
                    {t.work.viewCode}
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
