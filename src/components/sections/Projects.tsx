"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { projects } from "@/data/resume";
import { ProjectMosaic } from "./ProjectMosaic";
import { ProjectCard } from "./ProjectCard";

const skins = ["cream", "ink", "pink", "ink"] as const;

/** Preferred pin offset below the fixed nav, and breathing room at the bottom. */
const PIN_TOP = 96;
const PIN_BOTTOM_GAP = 24;

/**
 * Where a card should stick. Cards that fit pin just under the nav; a card
 * taller than the viewport pins so that its *bottom* stays visible — the
 * offset goes negative — which guarantees every card can be read in full
 * before the next one slides over it.
 */
const pinTop = (card: HTMLElement) =>
  Math.min(PIN_TOP, window.innerHeight - card.offsetHeight - PIN_BOTTOM_GAP);

/**
 * Projects = sticky mosaic opener + a stack of sticky project cards. As each
 * new card slides up over the previous one, the card beneath eases back
 * (scale + dim overlay) so the stack reads as depth rather than clutter.
 */
export function Projects() {
  const stack = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!stack.current) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", stack.current);

      // Stacking only exists at lg+, matching the `lg:sticky` on the cards.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const applyOffsets = () =>
          cards.forEach((card) => {
            card.style.top = `${pinTop(card)}px`;
          });
        applyOffsets();
        // Re-measure whenever ScrollTrigger recalculates (resize, fonts, images).
        ScrollTrigger.addEventListener("refreshInit", applyOffsets);

        if (!prefersReducedMotion()) {
          cards.forEach((card, i) => {
            const next = cards[i + 1];
            if (!next) return;
            const dim = card.querySelector("[data-dim]");
            const trigger: ScrollTrigger.Vars = {
              trigger: next,
              start: "top bottom",
              end: () => `top ${pinTop(next)}px`,
              scrub: true,
              invalidateOnRefresh: true,
            };
            gsap.to(card, { scale: 0.94, ease: "none", scrollTrigger: trigger });
            if (dim) {
              gsap.to(dim, { opacity: 0.45, ease: "none", scrollTrigger: trigger });
            }
          });
        }

        return () => {
          ScrollTrigger.removeEventListener("refreshInit", applyOffsets);
          cards.forEach((card) => card.style.removeProperty("top"));
        };
      });
      return () => mm.revert();
    },
    { scope: stack },
  );

  return (
    <section id="projects" data-nav-theme="light" className="relative z-10 bg-cream">
      <ProjectMosaic scrollTarget={`#project-${projects[0].id}`} />

      <div ref={stack} className="container-page relative pb-28 pt-4 md:pb-40">
        <div className="flex flex-col gap-6 md:gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              skin={skins[i % skins.length]}
              total={projects.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
