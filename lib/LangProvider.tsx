"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";
import { copy, type Dict, type Lang } from "@/content/copy";

type LangValue = { lang: Lang; t: Dict; setLang: (l: Lang) => void; toggle: () => void };

const LangContext = createContext<LangValue>({
  lang: "pt",
  t: copy.pt,
  setLang: () => {},
  toggle: () => {},
});

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const langStore = {
  subscribe(callback: () => void) {
    listeners.add(callback);
    window.addEventListener("storage", callback);
    return () => {
      listeners.delete(callback);
      window.removeEventListener("storage", callback);
    };
  },
  get(): Lang {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl === "en" || fromUrl === "pt") return fromUrl;
    return window.localStorage.getItem("lang") === "en" ? "en" : "pt";
  },
  set(next: Lang) {
    window.localStorage.setItem("lang", next);
    const url = new URL(window.location.href);
    url.searchParams.delete("lang");
    window.history.replaceState(null, "", url);
    emit();
  },
};

export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(langStore.subscribe, langStore.get, () => "pt" as Lang);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.title = copy[lang].meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", copy[lang].meta.description);
  }, [lang]);

  const setLang = useCallback((next: Lang) => langStore.set(next), []);
  const toggle = useCallback(() => langStore.set(langStore.get() === "pt" ? "en" : "pt"), []);

  return (
    <LangContext.Provider value={{ lang, t: copy[lang], setLang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
