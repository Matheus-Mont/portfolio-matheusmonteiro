"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/lib/LangProvider";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#topo"
          aria-label={t.ui.backToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25 }}
          className="fixed right-5 bottom-24 z-40 grid h-11 w-11 place-items-center rounded-full border border-biolum/25 bg-abyss-2/90 text-tissue-dim backdrop-blur transition-colors duration-200 hover:border-biolum/60 hover:text-tissue"
        >
          <ArrowUp size={18} aria-hidden />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
