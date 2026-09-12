"use client";

import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { navLinks, profile } from "@/data/resume";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-cream/15 bg-ink text-cream">
      <div className="container-page flex flex-col gap-10 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-display text-3xl">{profile.name}</p>
          <p className="text-caption mt-2 text-cream/60">
            {profile.title} · {profile.location}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              className="link-line text-caption text-cream/60 transition-colors hover:text-cream"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-cream/70 transition-colors hover:text-pink"
          >
            <GitHubIcon size={20} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-cream/70 transition-colors hover:text-pink"
          >
            <LinkedInIcon size={20} />
          </a>
        </div>
      </div>

      <div className="container-page flex flex-col gap-2 border-t border-cream/10 py-5 text-xs text-cream/45 sm:flex-row sm:justify-between">
        <p>
          © {year} {profile.name}
        </p>
        <button
          type="button"
          onClick={() => scrollTo(0)}
          className="link-line self-start text-left sm:self-auto"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
