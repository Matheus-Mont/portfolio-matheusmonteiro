"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/Button";
import CalmToggle from "@/components/CalmToggle";
import LangToggle from "@/components/LangToggle";
import { useLang } from "@/lib/LangProvider";
import { profile } from "@/content/profile";

export default function Nav() {
  const { t } = useLang();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting));
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        stuck ? "border-b border-biolum/10 bg-abyss/85 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between gap-4 px-5">
        <a href="#topo" className="font-display text-lg font-semibold tracking-tight text-tissue">
          <span className="sm:hidden">{profile.shortName}</span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        <nav aria-label={t.footer.navTitle} className="hidden items-center gap-7 lg:flex">
          {t.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-sm text-tissue-dim transition-colors duration-200 hover:text-biolum"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <LangToggle />
            <CalmToggle />
          </div>
          <ButtonLink href="#contato" className="!px-4 !py-2.5 !text-[0.8rem] sm:!px-5 sm:!text-sm" magnetic={false}>
            {t.nav.cta}
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="grid h-10 w-10 place-items-center rounded-full border border-biolum/20 text-tissue lg:hidden"
          >
            {open ? <X size={18} aria-hidden /> : <List size={18} aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-biolum/10 bg-abyss/97 backdrop-blur-xl lg:hidden"
          >
            <nav className="mx-auto flex max-w-[1400px] flex-col px-5 pb-6">
              {t.nav.links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                  className="border-b border-biolum/10 py-4 font-display text-xl text-tissue"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-5 flex gap-2 sm:hidden">
                <LangToggle />
                <CalmToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
