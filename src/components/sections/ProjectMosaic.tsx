"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { projects } from "@/data/resume";
import { Button } from "@/components/ui/Button";
import { ArrowDown } from "@/components/ui/Icons";

type Tile = {
  kind: "name" | "image" | "tech" | "meta";
  text: string;
  sub?: string;
  image?: { src: string; alt: string };
};

const tileStyle: Record<Tile["kind"], string> = {
  name: "bg-ink text-cream",
  image: "bg-rose text-cream",
  tech: "bg-cream-soft text-ink border border-mauve/25",
  meta: "bg-pink text-ink",
};

/** Build a mosaic of 4 rows where every column belongs to one project. */
function buildTiles(): Tile[] {
  const rows: Tile[][] = [
    projects.map((p) => ({ kind: "name", text: p.name })),
    projects.map((p) => ({ kind: "image", text: p.tagline, image: p.image })),
    projects.map((p) => ({
      kind: "tech",
      text: p.tech.slice(0, 3).join(" / "),
    })),
    projects.map((p) => ({ kind: "meta", text: p.year, sub: p.role.split(" — ")[0] })),
  ];
  // Row-major order → index % 3 is the column, which is the project.
  return rows.flat();
}

const NUM_COLUMNS = projects.length;
const tiles = buildTiles();
const numberWords = ["", "One", "Two", "Three", "Four", "Five", "Six"];
const countWord = numberWords[NUM_COLUMNS] ?? String(NUM_COLUMNS);

/**
 * Sticky opener for the projects section, re-imagining the reference's
 * signature interaction: a grid of tiles (type + screenshots) slides in
 * column by column (alternating from top and bottom), then the grid zooms
 * and splits apart to uncover the section statement and a call to action.
 */
export function ProjectMosaic({ scrollTarget }: { scrollTarget: string }) {
  const block = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const description = useRef<HTMLParagraphElement>(null);
  const cta = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLUListElement>(null);
  const { scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      const els = {
        block: block.current,
        wrapper: wrapper.current,
        content: content.current,
        title: title.current,
        description: description.current,
        cta: cta.current,
        grid: grid.current,
      };
      if (Object.values(els).some((el) => !el)) return;
      const { block: b, content: c, title: t, description: d, cta: k, grid: g } =
        els as { [K in keyof typeof els]: NonNullable<(typeof els)[K]> };

      const items = Array.from(g.querySelectorAll<HTMLElement>("li"));
      const columns: HTMLElement[][] = Array.from({ length: NUM_COLUMNS }, () => []);
      items.forEach((item, i) => columns[i % NUM_COLUMNS].push(item));

      if (prefersReducedMotion()) {
        gsap.set([d, k], { opacity: 1 });
        gsap.set(g, { opacity: 0.12 });
        return;
      }

      // Hidden until the grid opens up.
      gsap.set([d, k], { opacity: 0, pointerEvents: "none" });

      // Vertically centre the title inside the content box (percent-based so
      // it survives resizes), the same trick the reference uses.
      const dy = (c.offsetHeight - t.offsetHeight) / 2;
      const titleOffsetY = (dy / c.offsetHeight) * 100;
      gsap.set(t, { yPercent: titleOffsetY });

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
        },
        (ctx) => {
          const { desktop } = ctx.conditions as { desktop: boolean };
          const zoom = desktop ? 1.9 : 1.5;
          // Percentages are relative to tile size, so small mobile tiles need
          // far larger values to open a hole big enough for the statement.
          const spreadX = desktop ? 42 : 60;
          const spreadY = desktop ? 42 : 140;

          // --- Reveal: columns arrive from above/below, staggered.
          const reveal = gsap.timeline();
          const wh = window.innerHeight;
          const travel = wh - (wh - g.offsetHeight) / 2;
          columns.forEach((column, colIndex) => {
            const fromTop = colIndex % 2 === 0;
            reveal.from(
              column,
              {
                y: travel * (fromTop ? -1 : 1),
                stagger: { each: 0.06, from: fromTop ? "end" : "start" },
                ease: "power1.inOut",
              },
              "reveal",
            );
          });

          // --- Zoom + split: outer columns push out, inner columns part
          // vertically (and drift outward a little) to open a hole in the middle.
          const last = columns.length - 1;
          const inner = columns.slice(1, last);
          const open = gsap.timeline({ defaults: { duration: 1, ease: "power3.inOut" } });
          open.to(g, { scale: zoom });
          open.to(columns[0], { xPercent: -spreadX }, "<");
          open.to(columns[last], { xPercent: spreadX }, "<");
          inner.forEach((column, i) => {
            // -1 … 1 across the inner columns; 0 for a single centre column.
            const side = inner.length > 1 ? (i / (inner.length - 1)) * 2 - 1 : 0;
            open.to(
              column,
              {
                xPercent: side * spreadX * 0.6,
                yPercent: (j) => (j < Math.floor(column.length / 2) ? -1 : 1) * spreadY,
                duration: 0.5,
                ease: "power1.inOut",
              },
              i === 0 ? "-=0.5" : "<",
            );
          });
          open.to(g, { opacity: 0.45, duration: 0.6, ease: "power1.out" }, "-=0.4");

          // --- Content toggle (direction-aware, like the reference).
          const toggleContent = (visible: boolean) => {
            gsap
              .timeline({ defaults: { overwrite: true } })
              .to(t, {
                yPercent: visible ? 0 : titleOffsetY,
                duration: 0.7,
                ease: "power2.inOut",
              })
              .to(
                [d, k],
                {
                  opacity: visible ? 1 : 0,
                  duration: 0.4,
                  ease: `power1.${visible ? "inOut" : "out"}`,
                  pointerEvents: visible ? "all" : "none",
                },
                visible ? "-=90%" : "<",
              );
          };

          const master = gsap.timeline({
            scrollTrigger: {
              trigger: b,
              start: "top 25%",
              end: "bottom bottom",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          master
            .add(reveal)
            .add(open, "-=0.6")
            .add(() => toggleContent(master.scrollTrigger!.direction === 1), "-=0.32");
        },
      );

      return () => mm.revert();
    },
    { scope: block },
  );

  return (
    <div ref={block} className="relative h-[380vh]">
      <div
        ref={wrapper}
        className="grain sticky top-0 h-svh overflow-hidden bg-cream will-change-transform"
      >
        {/* Statement — sits beneath the grid and is uncovered by it */}
        <div
          ref={content}
          className="container-page relative z-0 flex h-full flex-col items-center justify-center text-center"
        >
          <h2
            ref={title}
            className="text-display max-w-[12ch] text-[clamp(3rem,8.5vw,8rem)]"
          >
            Selected <em className="italic text-mauve">projects</em>
          </h2>
          <p
            ref={description}
            className="mt-6 max-w-[44ch] text-base leading-relaxed text-ink/75 md:text-lg"
          >
            {countWord} projects across .NET and the MERN stack — from
            architecture and authentication to checkout flows, real-time
            messaging, and multi-warehouse inventory.
          </p>
          <div ref={cta} className="mt-8">
            <Button
              href={scrollTarget}
              icon={<ArrowDown size={14} />}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(scrollTarget, -96);
              }}
            >
              Explore the work
            </Button>
          </div>
        </div>

        {/* Mosaic */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ width: `min(92vw, ${NUM_COLUMNS * 15}rem)` }}
        >
          <ul
            ref={grid}
            className="grid gap-x-3 gap-y-4 will-change-transform md:gap-x-6 md:gap-y-8"
            style={{ gridTemplateColumns: `repeat(${NUM_COLUMNS}, minmax(0, 1fr))` }}
          >
            {tiles.map((tile, i) => (
              <li
                key={i}
                className={`relative flex aspect-square w-full flex-col justify-between overflow-hidden rounded-md p-3 will-change-transform md:rounded-lg md:p-5 ${tileStyle[tile.kind]}`}
              >
                {tile.kind === "image" && tile.image && (
                  <>
                    <Image
                      src={tile.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 16rem, 30vw"
                      className="object-cover object-left-top"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent"
                    />
                  </>
                )}
                <span className="text-eyebrow relative opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {tile.kind === "image" ? (
                  <span className="relative text-[clamp(0.6rem,1.25vw,0.9rem)] leading-snug">
                    {tile.text}
                  </span>
                ) : tile.kind === "name" ? (
                  <span className="text-display text-[clamp(0.95rem,2.3vw,1.85rem)] leading-[1.05]">
                    {tile.text}
                  </span>
                ) : tile.kind === "meta" ? (
                  <span>
                    <span className="text-display block text-[clamp(1.4rem,3.4vw,2.8rem)] leading-none">
                      {tile.text}
                    </span>
                    <span className="text-eyebrow mt-1 block opacity-70">{tile.sub}</span>
                  </span>
                ) : (
                  <span className="text-[clamp(0.6rem,1.25vw,0.9rem)] leading-snug">
                    {tile.text}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
