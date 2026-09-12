"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { profile } from "@/data/resume";
import { Button } from "@/components/ui/Button";
import { useReveal } from "@/components/ui/useReveal";
import {
  ArrowUpRight,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "@/components/ui/Icons";

/**
 * Final call to action. The headline lines rise out of clipped containers
 * as the section enters; the email is the biggest thing on the screen.
 */
export function Contact() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  useGSAP(
    () => {
      if (!root.current) return;
      const lines = gsap.utils.toArray<HTMLElement>("[data-line]", root.current);
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        lines,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        },
      );
    },
    { scope: root },
  );

  const rows = [
    {
      icon: <MailIcon />,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: <PhoneIcon />,
      label: "Phone",
      value: profile.phone,
      href: profile.phoneHref,
    },
    {
      icon: <PinIcon />,
      label: "Location",
      value: profile.location,
    },
    {
      icon: <GitHubIcon />,
      label: "GitHub",
      value: `github.com/${profile.githubHandle}`,
      href: profile.github,
    },
    {
      icon: <LinkedInIcon />,
      label: "LinkedIn",
      value: "linkedin.com/in/ahmad-tarek",
      href: profile.linkedin,
    },
  ];

  return (
    <section
      ref={root}
      id="contact"
      data-nav-theme="dark"
      className="grain relative z-10 overflow-hidden bg-ink py-28 text-cream md:py-40"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[20vw] bottom-[-30vh] size-[70vmax] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--pink) 0%, var(--rose) 40%, transparent 70%)",
        }}
      />

      <div className="container-page relative">
        <p data-reveal className="text-eyebrow mb-8 text-rose">
          Contact
        </p>

        <h2 className="text-display text-[clamp(3rem,9vw,8.5rem)]">
          <span className="block overflow-hidden pb-[0.06em]">
            <span data-line className="block">
              Let&apos;s build
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.12em]">
            <span data-line className="block italic text-rose">
              something together.
            </span>
          </span>
        </h2>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p data-reveal className="max-w-[40ch] text-lg leading-relaxed text-cream/75 md:text-xl">
              Looking for a full-stack developer who can take a feature from
              database schema to UI? My inbox is open.
            </p>

            <a
              data-reveal
              href={`mailto:${profile.email}`}
              className="group mt-8 inline-flex max-w-full items-baseline gap-3 break-all font-serif text-[clamp(1.5rem,4.2vw,3.6rem)] leading-tight"
            >
              <span className="relative">
                {profile.email}
                <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-100 bg-rose transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-0" />
                <span className="absolute inset-x-0 -bottom-1 h-px origin-right scale-x-0 bg-pink transition-transform delay-100 duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100" />
              </span>
              <ArrowUpRight
                size={22}
                className="shrink-0 self-center transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>

            <div data-reveal className="mt-10 flex flex-wrap gap-3">
              <Button
                href={`mailto:${profile.email}`}
                tone="cream"
                icon={<ArrowUpRight size={14} />}
              >
                Email me
              </Button>
              <Button
                href={profile.linkedin}
                tone="cream"
                variant="outline"
                icon={<ArrowUpRight size={14} />}
              >
                Connect on LinkedIn
              </Button>
            </div>
          </div>

          <ul className="flex flex-col divide-y divide-cream/15 border-y border-cream/15 lg:col-span-5">
            {rows.map((row) => {
              const inner = (
                <>
                  <span className="flex items-center gap-3 text-cream/60">
                    <span className="text-rose">{row.icon}</span>
                    <span className="text-eyebrow">{row.label}</span>
                  </span>
                  <span className="text-right text-sm sm:text-base">{row.value}</span>
                </>
              );
              return (
                <li key={row.label} data-reveal>
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.href.startsWith("http") ? "_blank" : undefined}
                      rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center justify-between gap-6 py-5 transition-colors duration-300 hover:text-pink"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center justify-between gap-6 py-5">
                      {inner}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
