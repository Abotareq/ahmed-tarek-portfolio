"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { markReady } from "@/lib/ready";

/**
 * Cream curtain with a single pulsing line while fonts load (the reference
 * gates its animations behind image preloading the same way). Lifts with a
 * clip-path wipe, then signals the hero to start.
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const minDelay = new Promise((r) => setTimeout(r, 650));
    const fonts =
      "fonts" in document ? document.fonts.ready : Promise.resolve();

    let cancelled = false;
    Promise.all([minDelay, fonts]).then(() => {
      if (cancelled) return;
      if (prefersReducedMotion()) {
        setDone(true);
        markReady();
        return;
      }
      gsap.to(el, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.9,
        ease: "expo.inOut",
        onStart: () => setTimeout(markReady, 350),
        onComplete: () => setDone(true),
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      <span className="loader-line block h-px w-24 bg-ink" />
    </div>
  );
}
