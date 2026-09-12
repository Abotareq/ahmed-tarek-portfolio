"use client";

import { useRef } from "react";
import { education, trainings } from "@/data/resume";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip } from "@/components/ui/Chip";
import { useReveal } from "@/components/ui/useReveal";

/**
 * Degree + training programs as panels that share the same rhythm as the
 * rest of the site: eyebrow, serif title, quiet detail rows.
 */
export function Education() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section
      ref={root}
      id="education"
      data-nav-theme="light"
      className="relative z-10 border-t border-mauve/20 bg-cream-soft py-28 md:py-40"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Education & Training"
          title={
            <>
              Where I <em className="italic text-mauve">learned</em>
            </>
          }
          className="mb-16 md:mb-24"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {/* Degree */}
          <article
            data-reveal-group
            className="group relative flex flex-col rounded-2xl border border-mauve/25 bg-cream p-7 transition-colors duration-500 hover:border-rose md:p-10"
          >
            <div data-reveal className="flex items-baseline justify-between gap-4">
              <p className="text-eyebrow text-mauve">Degree</p>
              <p className="text-display text-3xl text-mauve">{education.period}</p>
            </div>

            <h3
              data-reveal
              className="text-display mt-8 text-[clamp(1.9rem,3.2vw,2.8rem)] leading-tight"
            >
              {education.degree}
            </h3>

            <p data-reveal className="mt-5 text-base leading-relaxed text-ink/80">
              Dual-accredited program, Egypt
            </p>

            <ul data-reveal className="mb-8 mt-6 flex flex-col gap-2 text-base">
              {education.institutions.map((inst) => (
                <li key={inst} className="flex gap-3">
                  <span className="mt-[0.7em] block h-px w-4 shrink-0 bg-rose" />
                  {inst}
                </li>
              ))}
            </ul>

            <dl data-reveal className="mt-auto flex gap-10 border-t border-mauve/20 pt-6 text-sm">
              <div>
                <dt className="text-eyebrow mb-1 text-mauve">Grade</dt>
                <dd>{education.grade}</dd>
              </div>
            </dl>
          </article>

          {/* Training programs */}
          {trainings.map((training, i) => {
            const dark = i % 2 === 0;
            return (
              <article
                key={training.program}
                data-reveal-group
                className={`group relative flex flex-col rounded-2xl p-7 md:p-10 ${
                  dark ? "bg-ink text-cream" : "bg-pink text-ink"
                }`}
              >
                <div data-reveal className="flex items-baseline justify-between gap-4">
                  <p className={`text-eyebrow ${dark ? "text-rose" : "text-ink/60"}`}>
                    Training
                  </p>
                  <p className={`text-display text-3xl ${dark ? "text-rose" : "text-ink/60"}`}>
                    {training.period}
                  </p>
                </div>

                <h3
                  data-reveal
                  className="text-display mt-8 text-[clamp(1.9rem,3.2vw,2.8rem)] leading-tight"
                >
                  {training.program}
                </h3>
                <p
                  data-reveal
                  className={`text-caption mt-3 ${dark ? "text-cream/60" : "text-ink/60"}`}
                >
                  {training.institution}
                </p>

                <p
                  data-reveal
                  className={`mb-8 mt-6 text-base leading-relaxed ${dark ? "text-cream/85" : "text-ink/85"}`}
                >
                  {training.description}
                </p>

                <div
                  data-reveal
                  className={`mt-auto flex flex-wrap gap-2 border-t pt-6 ${
                    dark ? "border-cream/15" : "border-ink/15"
                  }`}
                >
                  {training.tech.map((t) => (
                    <Chip key={t} tone={dark ? "cream" : "ink"}>
                      {t}
                    </Chip>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
