import Image from "next/image";
import type { Project } from "@/data/resume";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { ArrowUpRight } from "@/components/ui/Icons";

type Skin = "cream" | "ink" | "pink";

const skins: Record<
  Skin,
  { card: string; tone: "ink" | "cream"; muted: string }
> = {
  cream: {
    card: "bg-cream-soft text-ink border border-mauve/25",
    tone: "ink",
    muted: "text-mauve",
  },
  ink: {
    card: "bg-ink text-cream",
    tone: "cream",
    muted: "text-cream/60",
  },
  pink: {
    card: "bg-pink text-ink",
    tone: "ink",
    muted: "text-ink/60",
  },
};

type ProjectCardProps = {
  project: Project;
  skin: Skin;
  total: number;
};

/**
 * One full project "case". On large screens the cards are sticky so they
 * stack and slide over one another as you scroll; on smaller screens (where
 * a card can be taller than the viewport) they simply flow.
 */
export function ProjectCard({ project, skin, total }: ProjectCardProps) {
  const s = skins[skin];

  return (
    <article
      id={`project-${project.id}`}
      data-card
      className={`grain relative origin-top overflow-hidden rounded-2xl md:rounded-3xl lg:sticky lg:will-change-transform ${s.card}`}
    >
      {/* Dimmer, faded in by the parent as the next card slides over */}
      <div
        data-dim
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-ink opacity-0"
      />
      <div className="grid gap-10 p-6 sm:p-8 md:grid-cols-12 md:gap-8 md:p-10 xl:p-12">
        {/* Left — identity */}
        <div className="flex flex-col md:col-span-5">
          <p className={`text-eyebrow flex items-center gap-3 ${s.muted}`}>
            <span>{project.index}</span>
            <span className="h-px w-8 bg-current opacity-40" />
            <span>of {String(total).padStart(2, "0")}</span>
          </p>

          <h3 className="text-display mt-6 text-[clamp(2.4rem,4.5vw,4.2rem)] leading-[0.98]">
            {project.name}
          </h3>
          <p className="mt-4 text-lg leading-snug md:text-xl">{project.tagline}</p>

          <dl className={`mt-8 grid grid-cols-2 gap-4 text-sm ${s.muted}`}>
            <div>
              <dt className="text-eyebrow mb-1 opacity-80">Role</dt>
              <dd className={s.tone === "cream" ? "text-cream" : "text-ink"}>
                {project.role}
              </dd>
            </div>
            <div>
              <dt className="text-eyebrow mb-1 opacity-80">Year</dt>
              <dd className={s.tone === "cream" ? "text-cream" : "text-ink"}>
                {project.year}
              </dd>
            </div>
          </dl>

          {/* Screenshot */}
          <a
            href={project.links[0].href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.name}: ${project.links[0].label}`}
            className={`group/img relative mt-8 block aspect-[16/10] overflow-hidden rounded-xl ${
              skin === "ink" ? "bg-cream/10" : "bg-ink/5"
            }`}
          >
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover object-top transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover/img:scale-[1.04]"
            />
            <span
              aria-hidden
              className="absolute inset-0 rounded-xl ring-1 ring-inset ring-ink/10"
            />
          </a>

          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            {project.links.map((link, i) => (
              <Button
                key={link.href}
                href={link.href}
                tone={s.tone}
                variant={i === 0 ? "solid" : "outline"}
                icon={<ArrowUpRight size={14} />}
              >
                {link.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Right — substance */}
        <div className="md:col-span-7 md:pl-8 lg:pl-16">
          <p className="max-w-[56ch] text-base leading-relaxed md:text-lg">
            {project.description}
          </p>

          <p className={`text-eyebrow mt-8 ${s.muted}`}>What I worked on</p>
          <ul className="mt-4 flex flex-col gap-3 text-[15px] leading-relaxed md:text-base">
            {project.features.map((f) => (
              <li key={f} className="flex gap-3">
                <span
                  className={`mt-[0.7em] block h-px w-4 shrink-0 ${
                    skin === "ink" ? "bg-rose" : "bg-ink/50"
                  }`}
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <p className={`text-eyebrow mt-8 ${s.muted}`}>Technologies</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <Chip key={t} tone={s.tone}>
                {t}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
