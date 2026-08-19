"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useCalm } from "@/lib/MotionProvider";

export default function Membrane() {
  const ref = useRef<HTMLDivElement>(null);
  const { calm } = useCalm();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const leftX = useTransform(scrollYProgress, [0.3, 0.78], [0, -52]);
  const rightX = useTransform(scrollYProgress, [0.3, 0.78], [0, 52]);
  const bridgeThin = useTransform(scrollYProgress, [0.3, 0.66], [1, 0.05]);
  const bridgeStretch = useTransform(scrollYProgress, [0.3, 0.78], [0.95, 2]);
  const bridgeFade = useTransform(scrollYProgress, [0.5, 0.72], [1, 0]);
  const spindle = useTransform(scrollYProgress, [0.32, 0.6, 0.75], [0, 0.6, 0]);
  const chromaSpread = useTransform(scrollYProgress, [0.3, 0.7], [0, 7]);
  const chromaBack = useTransform(scrollYProgress, [0.3, 0.7], [0, -7]);

  if (calm) {
    return <div aria-hidden className="mx-auto h-px w-full max-w-[1400px] bg-biolum/15" />;
  }

  const cell = (
    <>
      <circle cx="200" cy="60" r="31" fill="rgba(61,232,192,0.07)" />
      <circle cx="200" cy="60" r="31" stroke="#3de8c0" strokeOpacity="0.5" strokeWidth="1.2" />
      <circle cx="200" cy="60" r="11" stroke="#3de8c0" strokeOpacity="0.32" strokeWidth="1" />
    </>
  );

  return (
    <div ref={ref} aria-hidden className="flex h-32 w-full items-center justify-center sm:h-40">
      <svg viewBox="0 0 400 120" className="h-full w-[min(100%,26rem)]" fill="none">
        <motion.ellipse
          cx="200"
          cy="60"
          rx="32"
          ry="26"
          fill="rgba(61,232,192,0.05)"
          stroke="#3de8c0"
          strokeOpacity="0.32"
          strokeWidth="1.2"
          style={{
            scaleX: bridgeStretch,
            scaleY: bridgeThin,
            opacity: bridgeFade,
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
        />

        <motion.g style={{ opacity: spindle }}>
          <line x1="150" y1="60" x2="250" y2="60" stroke="#2aa9d8" strokeOpacity="0.5" strokeDasharray="2 7" />
          <line x1="158" y1="48" x2="242" y2="48" stroke="#2aa9d8" strokeOpacity="0.28" strokeDasharray="2 9" />
          <line x1="158" y1="72" x2="242" y2="72" stroke="#2aa9d8" strokeOpacity="0.28" strokeDasharray="2 9" />
        </motion.g>

        <motion.g style={{ x: leftX }}>
          {cell}
          <motion.g style={{ x: chromaBack }}>
            <line x1="196" y1="55" x2="204" y2="57" stroke="#3de8c0" strokeOpacity="0.55" strokeWidth="1.6" />
            <line x1="196" y1="64" x2="204" y2="62" stroke="#3de8c0" strokeOpacity="0.55" strokeWidth="1.6" />
          </motion.g>
        </motion.g>

        <motion.g style={{ x: rightX }}>
          {cell}
          <motion.g style={{ x: chromaSpread }}>
            <line x1="196" y1="55" x2="204" y2="57" stroke="#3de8c0" strokeOpacity="0.55" strokeWidth="1.6" />
            <line x1="196" y1="64" x2="204" y2="62" stroke="#3de8c0" strokeOpacity="0.55" strokeWidth="1.6" />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}
