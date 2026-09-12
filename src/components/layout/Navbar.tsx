"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { navLinks, profile } from "@/data/resume";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";

type Theme = "light" | "dark";

/**
 * Fixed "frame" navigation, in the spirit of the reference: small text pinned
 * to the corners of the viewport, hovering underlines, and no bar background.
 * It flips to cream text when a dark section scrolls beneath it, and folds
 * into a full-screen menu on small screens.
 */
export function Navbar() {
  const { scrollTo, stop, start } = useSmoothScroll();
  const [theme, setTheme] = useState<Theme>("light");
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const overlayItems = useRef<HTMLUListElement>(null);

  // Watch every section for its theme + id to drive nav colour and active state.
  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>("[data-nav-theme]");
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 48px",
        end: "bottom 48px",
        onToggle: (self) => {
          if (self.isActive) {
            setTheme(section.dataset.navTheme as Theme);
            // Project cards carry a theme but no section id — keep the
            // current nav item lit while they pass.
            const owner = section.closest<HTMLElement>("section[id]");
            if (owner) setActive(owner.id);
          }
        },
      });
    });
  });

  const go = useCallback(
    (href: string) => {
      if (!open) {
        scrollTo(href);
        return;
      }
      // Lenis is paused while the overlay is open; let the close effect
      // resume it (and the curtain start lifting) before we move.
      setOpen(false);
      window.setTimeout(() => scrollTo(href), 350);
    },
    [open, scrollTo],
  );

  // Mobile overlay open/close animation + scroll lock.
  useEffect(() => {
    const el = overlay.current;
    const items = overlayItems.current?.querySelectorAll("li");
    if (!el || !items) return;

    if (open) {
      stop();
      gsap.set(el, { pointerEvents: "auto" });
      gsap
        .timeline()
        .to(el, {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.8,
          ease: "expo.inOut",
        })
        .fromTo(
          items,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.05 },
          "-=0.35",
        );
    } else {
      start();
      gsap
        .timeline({ onComplete: () => gsap.set(el, { pointerEvents: "none" }) })
        .to(items, { opacity: 0, y: -16, duration: 0.3, ease: "power2.in" })
        .to(
          el,
          { clipPath: "inset(0 0 100% 0)", duration: 0.7, ease: "expo.inOut" },
          "-=0.1",
        );
    }
  }, [open, stop, start]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // The open overlay is ink, so the frame must read cream over it.
  const color = open || theme === "dark" ? "text-cream" : "text-ink";

  return (
    <>
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${color}`}
      >
        {/* Blurred, faded backdrop so content stays legible as it passes under */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-28 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_40%,transparent)]"
        />
        <div className="container-page relative flex items-center justify-between py-5 md:py-6">
          {/* Mark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("#home");
            }}
            className="pointer-events-auto flex items-center gap-3"
            aria-label="Back to top"
          >
            <span className="grid size-9 place-items-center rounded-full border border-current text-[11px] font-medium tracking-[0.12em]">
              {profile.initials}
            </span>
            <span className="text-caption hidden sm:inline">
              {profile.name}
            </span>
          </a>

          {/* Desktop links */}
          <nav
            aria-label="Primary"
            className="pointer-events-auto hidden items-center gap-6 lg:flex"
          >
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.href);
                  }}
                  aria-current={isActive ? "true" : undefined}
                  className={`link-line text-caption transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="pointer-events-auto flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hidden opacity-60 transition-opacity hover:opacity-100 sm:block"
            >
              <GitHubIcon />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hidden opacity-60 transition-opacity hover:opacity-100 sm:block"
            >
              <LinkedInIcon />
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="text-caption flex items-center gap-2 lg:hidden"
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 top-0 block h-px w-full bg-current transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] ${
                    open ? "translate-y-[5.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 block h-px w-full bg-current transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] ${
                    open ? "-translate-y-[5.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        ref={overlay}
        id="mobile-menu"
        aria-hidden={!open}
        className="grain pointer-events-none fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pb-8 pt-28 text-cream"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <ul ref={overlayItems} className="flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <li key={link.href} className="opacity-0">
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.href);
                }}
                className="text-display flex items-baseline gap-4 py-1.5 text-[clamp(2.4rem,9vw,4rem)]"
              >
                <span className="text-eyebrow text-rose">0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-end justify-between border-t border-cream/15 pt-6">
          <div className="text-caption flex flex-col gap-2 text-cream/70">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <span>{profile.location}</span>
          </div>
          <div className="flex gap-5">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GitHubIcon size={22} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedInIcon size={22} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
