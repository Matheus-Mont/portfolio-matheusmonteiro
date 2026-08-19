"use client";

import { motion } from "motion/react";
import { useMagnetic } from "@/lib/useMagnetic";

type Common = {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  magnetic?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-display text-[0.95rem] font-medium tracking-tight transition-transform duration-200 active:scale-[0.97]";

const styles = {
  primary:
    "bg-venom px-6 py-3.5 text-abyss shadow-[0_10px_40px_-12px_rgba(255,94,58,0.65)] hover:brightness-110",
  ghost:
    "border border-biolum/25 px-6 py-3.5 text-tissue hover:border-biolum/60 hover:bg-biolum/5",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  magnetic = true,
  ...rest
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { ref, style } = useMagnetic(magnetic ? 0.28 : 0);
  return (
    <motion.div ref={ref} style={style} className="inline-block">
      <button className={`${base} ${styles[variant]} ${className}`} {...rest}>
        {children}
      </button>
    </motion.div>
  );
}

export function ButtonLink({
  children,
  variant = "primary",
  className = "",
  magnetic = true,
  ...rest
}: Common & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { ref, style } = useMagnetic(magnetic ? 0.28 : 0);
  return (
    <motion.div ref={ref} style={style} className="inline-block">
      <a className={`${base} ${styles[variant]} ${className}`} {...rest}>
        {children}
      </a>
    </motion.div>
  );
}
