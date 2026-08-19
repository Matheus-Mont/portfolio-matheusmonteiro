"use client";

import { useEffect, useRef } from "react";
import { useCalm } from "@/lib/MotionProvider";

type Spore = { x: number; y: number; vx: number; vy: number; life: number; size: number };

export default function SporeTrail() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { calm, ready } = useCalm();

  useEffect(() => {
    const canvas = ref.current;
    if (!ready || calm || !canvas) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let alive = false;
    const spores: Spore[] = [];

    const resize = () => {
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = "lighter";
      for (let i = spores.length - 1; i >= 0; i--) {
        const s = spores[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy -= 0.012;
        s.vx *= 0.97;
        s.life -= 0.016;
        if (s.life <= 0) {
          spores.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(61, 232, 192, ${0.28 * s.life})`;
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      if (spores.length > 0) {
        raf = requestAnimationFrame(draw);
      } else {
        alive = false;
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      for (let i = 0; i < 2; i++) {
        spores.push({
          x: event.clientX,
          y: event.clientY,
          vx: (Math.random() - 0.5) * 1.1,
          vy: (Math.random() - 0.5) * 1.1,
          life: 0.35 + Math.random() * 0.25,
          size: 1.5 + Math.random() * 3.5,
        });
      }
      if (spores.length > 130) spores.splice(0, spores.length - 130);
      if (!alive) {
        alive = true;
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [calm, ready]);

  if (calm) return null;

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 hidden lg:block"
    />
  );
}
