"use client";

import { useMemo, useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { education, experience, profile } from "@/data/resume";

/**
 * Sticky block revealed from beneath the hero, exactly the way the reference's
 * main block is revealed beneath its intro: the wrapper is pulled up by -100%
 * and eases to 0 as the block enters, so it appears to wait under the curtain.
 * While pinned, the summary fills in word by word, scrubbed to scroll.
 */
export function About() {
  const block = useRef<HTMLElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const paragraph = useRef<HTMLParagraphElement>(null);

  const words = useMemo(() => profile.summary.split(" "), []);

  useGSAP(
    () => {
      if (!block.current || !wrapper.current || !paragraph.current) return;
      const wordEls = paragraph.current.querySelectorAll<HTMLElement>("[data-word]");

      if (prefersReducedMotion()) {
        gsap.set(wordEls, { opacity: 1 });
        return;
      }

      // Curtain reveal.
      gsap.from(wrapper.current, {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: block.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      });

      // Word-by-word fill while the block is pinned.
      gsap.fromTo(
        wordEls,
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.4,
          scrollTrigger: {
            trigger: block.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.4,
          },
        },
      );

      // Side facts slide in slightly later in the pin.
      gsap.from("[data-fact]", {
        opacity: 0,
        y: 24,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: block.current,
          start: "top top",
          end: "+=45%",
          scrub: 0.4,
        },
      });
    },
    { scope: block },
  );

  return (
    <section
      ref={block}
      id="about"
      data-nav-theme="dark"
      className="relative z-10 h-[230vh] bg-ink text-cream"
    >
      <div
        ref={wrapper}
        className="grain sticky top-0 flex h-svh flex-col justify-center overflow-hidden bg-ink will-change-transform"
      >
        <div className="container-page grid gap-10 pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-0">
          <div className="lg:col-span-8">
            <p className="text-eyebrow mb-8 text-rose">About</p>
            <p
              ref={paragraph}
              className="text-display max-w-[38ch] text-[clamp(1.2rem,2.25vw,2.15rem)] leading-[1.2] tracking-[-0.01em]"
            >
              {words.map((word, i) => (
                <span key={i} data-word className="inline-block">
                  {word}
                  {i < words.length - 1 ? " " : ""}
                </span>
              ))}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-5 text-sm lg:col-span-4 lg:grid-cols-1 lg:gap-6 lg:self-end lg:border-l lg:border-cream/15 lg:pl-8">
            <div data-fact>
              <dt className="text-eyebrow mb-1.5 text-cream/50">Based in</dt>
              <dd className="text-base">{profile.location}</dd>
            </div>
            <div data-fact>
              <dt className="text-eyebrow mb-1.5 text-cream/50">Education</dt>
              <dd className="text-base">
                {education.degree}
                <span className="block text-cream/60">{education.period}</span>
              </dd>
            </div>
            <div data-fact className="hidden sm:block">
              <dt className="text-eyebrow mb-1.5 text-cream/50">Latest role</dt>
              <dd className="text-base">
                {experience[0].role}
                <span className="block text-cream/60">
                  {experience[0].company} · {experience[0].period}
                </span>
              </dd>
            </div>
            <div data-fact className="hidden sm:block">
              <dt className="text-eyebrow mb-1.5 text-cream/50">Languages</dt>
              <dd className="text-base">
                {profile.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
