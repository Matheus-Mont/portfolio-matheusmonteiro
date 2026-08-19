"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";

type MotionValue = {
  calm: boolean;
  ready: boolean;
  toggle: () => void;
};

const MotionContext = createContext<MotionValue>({ calm: false, ready: false, toggle: () => {} });

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const calmStore = {
  subscribe(callback: () => void) {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    listeners.add(callback);
    media.addEventListener("change", callback);
    window.addEventListener("storage", callback);
    return () => {
      listeners.delete(callback);
      media.removeEventListener("change", callback);
      window.removeEventListener("storage", callback);
    };
  },
  get(): boolean {
    const stored = window.localStorage.getItem("calm");
    if (stored === "true") return true;
    if (stored === "false") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },
  set(value: boolean) {
    window.localStorage.setItem("calm", String(value));
    emit();
  },
};

const noop = () => () => {};

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const calm = useSyncExternalStore(calmStore.subscribe, calmStore.get, () => false);
  const ready = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

  useEffect(() => {
    document.documentElement.dataset.calm = String(calm);
  }, [calm]);

  const toggle = useCallback(() => calmStore.set(!calmStore.get()), []);

  return (
    <MotionContext.Provider value={{ calm, ready, toggle }}>{children}</MotionContext.Provider>
  );
}

export const useCalm = () => useContext(MotionContext);
