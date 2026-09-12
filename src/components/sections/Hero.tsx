"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { onReady } from "@/lib/ready";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { profile } from "@/data/resume";
import { Button } from "@/components/ui/Button";
import {
  ArrowDown,
  ArrowUpRight,
  GitHubIcon,
  LinkedInIcon,
} from "@/components/ui/Icons";

/**
 * Full-viewport typographic hero. It sits above the About block (z-index) so
 * that, like the reference intro, scrolling it away acts as a curtain that
 * reveals the sticky content underneath.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      if (!root.current || !inner.current) return;
      const q = gsap.utils.selector(root);
      const reduced = prefersReducedMotion();

      // ---- Intro (after the preloader lifts)
      const lines = q<HTMLElement>("[data-line]");
      const items = q<HTMLElement>("[data-item]");
      if (reduced) {
        gsap.set([lines, items], { opacity: 1, y: 0 });
      } else {
        gsap.set(lines, { yPercent: 110 });
        gsap.set(items, { opacity: 0, y: 20 });
        const off = onReady(() => {
          gsap
            .timeline({ defaults: { ease: "expo.out" } })
            .to(lines, { yPercent: 0, duration: 1.4, stagger: 0.1 })
            .to(
              items,
              { opacity: 1, y: 0, duration: 1, stagger: 0.08 },
              "-=0.9",
            );
        });
        return () => off();
      }
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (!root.current || !inner.current || prefersReducedMotion()) return;

      // ---- Scroll-out: content drifts up and fades as the hero leaves.
      gsap.to(inner.current, {
        yPercent: -18,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // ---- Slow drift of the background glow.
      if (glow.current) {
        gsap.to(glow.current, {
          xPercent: 12,
          yPercent: -10,
          duration: 14,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="home"
      data-nav-theme="light"
      className="grain relative z-20 flex min-h-svh flex-col justify-end overflow-hidden bg-cream"
    >
      {/* Ambient glow — palette gradient only */}
      <div
        ref={glow}
        aria-hidden
        className="pointer-events-none absolute -right-[10vw] top-[-10vh] size-[70vmax] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--pink) 0%, var(--rose) 45%, transparent 72%)",
        }}
      />

      <div
        ref={inner}
        className="container-page relative flex flex-1 flex-col justify-center pb-28 pt-32 md:pb-32"
      >
        <p
          data-item
          className="text-eyebrow mb-8 flex items-center gap-3 text-mauve"
        >
          <span className="inline-block size-1.5 rounded-full bg-ink" />
          {profile.title} — {profile.location}
        </p>

        <h1 className="text-display text-[clamp(3.4rem,11.5vw,11rem)]">
          <span className="block overflow-hidden pb-[0.08em]">
            <span data-line className="block">
              {profile.firstName} {profile.lastName}
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.12em]">
            <span data-line className="block italic text-mauve">
              Mohamed.
            </span>
          </span>
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <p
            data-item
            className="max-w-[34ch] text-lg leading-relaxed text-ink/80 md:col-span-6 md:text-xl"
          >
            {profile.intro}
          </p>

          <div
            data-item
            className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end"
          >
            <Button
              href="#projects"
              icon={<ArrowDown size={14} />}
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#projects");
              }}
            >
              View projects
            </Button>
            <Button
              href="#contact"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact");
              }}
            >
              Contact me
            </Button>
            <div className="ml-1 flex items-center gap-1">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid size-11 place-items-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-pink hover:bg-pink"
              >
                <GitHubIcon />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid size-11 place-items-center rounded-full border border-ink/20 text-ink transition-colors duration-300 hover:border-pink hover:bg-pink"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="container-page relative flex items-end justify-between pb-7 text-mauve">
        <button
          type="button"
          data-item
          onClick={() => scrollTo("#about")}
          className="text-eyebrow group flex items-center gap-3"
        >
          <span className="relative block h-10 w-px overflow-hidden bg-mauve/30">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-hint_1.8s_ease-in-out_infinite] bg-ink" />
          </span>
          Scroll
        </button>
        <a
          data-item
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-eyebrow link-line hidden items-center gap-1 md:inline-flex"
        >
          github.com/{profile.githubHandle}
          <ArrowUpRight size={12} />
        </a>
      </div>

      <style>{`
        @keyframes scroll-hint {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
