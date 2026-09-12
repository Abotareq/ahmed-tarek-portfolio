"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { experience } from "@/data/resume";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";
import { useReveal } from "@/components/ui/useReveal";

/**
 * Timeline with a sticky heading and a spine that draws as you scroll past
 * each entry. Dots light up when the spine reaches them.
 */
export function Experience() {
  const root = useRef<HTMLElement>(null);
  const spine = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  useReveal(root);

  useGSAP(
    () => {
      if (!spine.current || !list.current) return;
      if (prefersReducedMotion()) {
        gsap.set(spine.current, { scaleY: 1 });
        return;
      }

      gsap.fromTo(
        spine.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-dot]").forEach((dot) => {
        gsap.to(dot, {
          backgroundColor: "var(--ink)",
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: { trigger: dot, start: "top 70%", toggleActions: "play none none reverse" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="experience"
      data-nav-theme="light"
      className="relative z-10 bg-cream py-28 md:py-40"
    >
      <div className="container-page grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="Experience"
              title={
                <>
                  Where I&apos;ve <em className="italic text-mauve">built</em>
                </>
              }
              description="Hands-on, end-to-end work across .NET and MERN stacks, in team settings with Git workflows and Agile sprints."
            />
          </div>
        </div>

        <ol ref={list} className="relative lg:col-span-8">
          {/* Spine */}
          <div
            aria-hidden
            className="absolute bottom-0 left-[7px] top-0 w-px bg-mauve/25 md:left-[9px]"
          />
          <div
            ref={spine}
            aria-hidden
            className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-ink md:left-[9px]"
          />

          {experience.map((job, i) => (
            <li
              key={job.role + job.company}
              data-reveal-group
              className={`relative pl-10 md:pl-14 ${i < experience.length - 1 ? "pb-20 md:pb-24" : ""}`}
            >
              <span
                data-dot
                aria-hidden
                className="absolute left-0 top-[0.55rem] block size-[15px] scale-75 rounded-full border-[3px] border-cream bg-mauve/40 outline outline-1 outline-mauve/30 md:size-[19px]"
              />

              <div className="grid gap-6 md:grid-cols-[7rem_1fr] md:gap-10">
                <p
                  data-reveal
                  className="text-display text-[2.4rem] leading-none text-mauve md:pt-1"
                >
                  {job.period}
                </p>

                <div>
                  <h3
                    data-reveal
                    className="text-display text-[clamp(1.75rem,3vw,2.6rem)] leading-tight"
                  >
                    {job.role}
                  </h3>
                  <p data-reveal className="text-caption mt-3 text-mauve">
                    {job.company}
                    {job.location && <span> — {job.location}</span>}
                  </p>

                  <ul className="mt-7 flex flex-col gap-3 text-[15px] leading-relaxed text-ink/85 md:text-base">
                    {job.points.map((pt) => (
                      <li key={pt} data-reveal className="flex gap-3">
                        <span className="mt-[0.7em] block h-px w-4 shrink-0 bg-rose" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div data-reveal className="mt-7 flex flex-wrap gap-2">
                    {job.tech.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
