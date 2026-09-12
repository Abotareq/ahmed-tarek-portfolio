"use client";

import type { RefObject } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Staggers every [data-reveal] descendant into view once its trigger enters
 * the viewport. Elements inside a [data-reveal-group] animate together with
 * that group as the trigger; everything else uses the scope as the trigger.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      if (prefersReducedMotion()) {
        gsap.set(root.querySelectorAll("[data-reveal]"), { opacity: 1 });
        return;
      }

      const groups = Array.from(
        root.querySelectorAll<HTMLElement>("[data-reveal-group]"),
      );
      const loose = Array.from(
        root.querySelectorAll<HTMLElement>("[data-reveal]"),
      ).filter((el) => !el.closest("[data-reveal-group]"));

      const animate = (items: HTMLElement[], trigger: HTMLElement) => {
        if (!items.length) return;
        gsap.fromTo(
          items,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.08,
            clearProps: "transform",
            scrollTrigger: { trigger, start: "top 82%", once: true },
          },
        );
      };

      animate(loose, root);
      groups.forEach((group) =>
        animate(
          Array.from(group.querySelectorAll<HTMLElement>("[data-reveal]")),
          group,
        ),
      );
    },
    { scope },
  );
}
