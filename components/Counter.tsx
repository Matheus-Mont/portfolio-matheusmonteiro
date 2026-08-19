"use client";

import { useEffect, useRef } from "react";
import { useCalm } from "@/lib/MotionProvider";

export default function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { calm } = useCalm();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (calm) {
      el.textContent = `${value}${suffix}`;
      return;
    }

    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1400;
        const step = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = `${Math.round(value * eased)}${suffix}`;
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, suffix, calm]);

  return <span ref={ref}>0{suffix}</span>;
}
