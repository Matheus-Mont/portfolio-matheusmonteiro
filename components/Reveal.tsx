"use client";

import { motion } from "motion/react";
import { useCalm } from "@/lib/MotionProvider";

type Props = {
  children: React.ReactNode;
  delay?: number;
  from?: "bottom" | "left" | "right";
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

const offsets = {
  bottom: { x: 0, y: 34 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
};

export default function Reveal({ children, delay = 0, from = "bottom", className, as = "div" }: Props) {
  const { calm } = useCalm();
  const Tag = motion[as];
  const off = offsets[from];

  return (
    <Tag
      className={className}
      initial={calm ? false : { opacity: 0, ...off }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
