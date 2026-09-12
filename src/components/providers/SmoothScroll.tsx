"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type ScrollTarget = string | HTMLElement | number;

type SmoothScrollApi = {
  scrollTo: (target: ScrollTarget, offset?: number) => void;
  stop: () => void;
  start: () => void;
};

const SmoothScrollContext = createContext<SmoothScrollApi>({
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

/** Native fallback used before Lenis exists or when motion is reduced. */
function nativeScrollTo(target: ScrollTarget, offset = 0) {
  if (typeof target === "number") {
    window.scrollTo({ top: target + offset });
    return;
  }
  const el =
    typeof target === "string"
      ? document.querySelector<HTMLElement>(target)
      : target;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top });
}

/**
 * Lenis smooth scrolling synchronised with GSAP's ticker + ScrollTrigger,
 * mirroring the reference setup (lerp 0.08). Falls back to native scrolling
 * when the user prefers reduced motion. The API object is stable; it reads
 * the live Lenis instance through a ref.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  const api = useMemo<SmoothScrollApi>(
    () => ({
      scrollTo: (target, offset = 0) => {
        const lenis = lenisRef.current;
        if (lenis) lenis.scrollTo(target, { offset, duration: 1.4 });
        else nativeScrollTo(target, offset);
      },
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
    }),
    [],
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={api}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
