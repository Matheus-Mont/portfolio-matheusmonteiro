"use client";

import { useEffect, useRef } from "react";
import { startSwarm, type SwarmOptions } from "@/components/canvas/organisms";
import { useCalm } from "@/lib/MotionProvider";

export default function MicrobeSwarm({
  className = "",
  ...options
}: SwarmOptions & { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { calm, ready } = useCalm();

  useEffect(() => {
    if (!ready || calm || !ref.current) return;
    return startSwarm(ref.current, options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, calm]);

  if (calm) return null;

  return <canvas ref={ref} aria-hidden className={className} />;
}
