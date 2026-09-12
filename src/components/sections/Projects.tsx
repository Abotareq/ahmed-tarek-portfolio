"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { projects } from "@/data/resume";
import { ProjectMosaic } from "./ProjectMosaic";
import { ProjectCard } from "./ProjectCard";

const skins = ["cream", "ink", "pink"] as const;

/**
 * Projects = sticky mosaic opener + a stack of sticky project cards. As each
 * new card slides up over the previous one, the card beneath eases back
 * (scale + dim overlay) so the stack reads as depth rather than clutter.
 */
export function Projects() {
  const stack = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!stack.current || prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", stack.current);

      // Stacking only exists at lg+, matching the `lg:sticky` on the cards.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          const dim = card.querySelector("[data-dim]");
          const trigger = {
            trigger: next,
            start: "top bottom",
            end: "top 112px",
            scrub: true,
          };
          gsap.to(card, { scale: 0.94, ease: "none", scrollTrigger: trigger });
          if (dim) gsap.to(dim, { opacity: 0.45, ease: "none", scrollTrigger: trigger });
        });
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
