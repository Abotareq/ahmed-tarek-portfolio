"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { skills } from "@/data/resume";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";
import { useReveal } from "@/components/ui/useReveal";

const allTech = skills.flatMap((c) => c.items);

/**
 * Skills as an index: one row per category, hairlines that draw in as each
 * row enters, chips that stagger in. Beneath it, two marquee strips of every
 * technology travel in opposite directions, driven purely by scroll.
 */
export function Skills() {
  const root = useRef<HTMLElement>(null);
  const marqueeA = useRef<HTMLDivElement>(null);
  const marqueeB = useRef<HTMLDivElement>(null);
  useReveal(root);

  useGSAP(
    () => {
      if (!root.current) return;
      if (prefersReducedMotion()) {
        gsap.set("[data-rule]", { scaleX: 1 });
        return;
      }

      gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: rule, start: "top 88%", once: true },
          },
        );
      });

      // Scroll-linked marquee — no timers, so it only moves when you do.
      if (marqueeA.current && marqueeB.current) {
        const strip = marqueeA.current.parentElement as HTMLElement;
        gsap.fromTo(
          marqueeA.current,
          { xPercent: 0 },
          {
            xPercent: -7,
            ease: "none",
            scrollTrigger: { trigger: strip, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
        gsap.fromTo(
          marqueeB.current,
          { xPercent: -7 },
          {
            xPercent: 0,
            ease: "none",
            scrollTrigger: { trigger: strip, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
      }
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="skills"
      data-nav-theme="light"
      className="relative z-10 bg-cream pt-28 md:pt-40"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Skills"
          title={
            <>
              The stack I <em className="italic text-mauve">work in</em>
            </>
          }
          description="Languages, frameworks, and concepts I use across the stack — from the database schema to the UI."
          className="mb-16 md:mb-24"
        />

        <ul>
          {skills.map((category, i) => (
            <li
              key={category.id}
              data-reveal-group
              className="group relative grid gap-5 py-7 transition-colors duration-500 md:grid-cols-12 md:items-baseline md:gap-8 md:py-9"
            >
              <span
                data-rule
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left bg-mauve/30"
              />

              <p
                data-reveal
                className="text-eyebrow text-mauve md:col-span-1"
              >
                0{i + 1}
              </p>

              <h3
                data-reveal
                className="text-display text-[clamp(1.6rem,2.6vw,2.3rem)] leading-none transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-2 md:col-span-3"
              >
                {category.label}
              </h3>

              <div className="flex flex-wrap gap-2 md:col-span-8">
                {category.items.map((item) => (
                  <span key={item} data-reveal>
                    <Chip>{item}</Chip>
                  </span>
                ))}
              </div>
            </li>
          ))}
          <li aria-hidden className="relative">
            <span data-rule className="absolute inset-x-0 top-0 h-px origin-left bg-mauve/30" />
          </li>
        </ul>
      </div>

      {/* Scroll-driven marquee */}
      <div className="relative mt-24 select-none overflow-hidden border-y border-mauve/20 py-6 md:mt-32">
        <div ref={marqueeA} className="flex w-max whitespace-nowrap will-change-transform">
          {[...allTech, ...allTech].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="text-display px-6 text-[clamp(1.8rem,4vw,3.4rem)] text-ink"
            >
              {t}
              <span className="ml-12 inline-block size-2 rounded-full bg-pink align-middle" />
            </span>
          ))}
        </div>
        <div
          ref={marqueeB}
          className="mt-3 flex w-max whitespace-nowrap will-change-transform"
        >
          {[...allTech, ...allTech].reverse().map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="text-display px-6 text-[clamp(1.8rem,4vw,3.4rem)] text-mauve/60"
            >
              {t}
              <span className="ml-12 inline-block size-2 rounded-full bg-rose align-middle" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
