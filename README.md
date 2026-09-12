# Ahmed Tarek Mohamed — Portfolio

Personal developer portfolio built with Next.js (App Router), TypeScript, Tailwind CSS v4, GSAP ScrollTrigger and Lenis.

All content lives in `src/data/resume.ts` and is taken directly from the resume.

## Scripts

```bash
npm run dev     # local dev server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Structure

```
src/
  app/                 layout, page, global styles, icon
  data/resume.ts       single source of truth for all content
  lib/                 gsap registration, readiness signal
  components/
    providers/         SmoothScroll (Lenis + ScrollTrigger sync)
    layout/            Navbar, Preloader, ScrollProgress, Footer
    sections/          Hero, About, Experience, Skills, Projects,
                       ProjectMosaic, ProjectCard, Education, Contact
    ui/                Button, Chip, SectionHeading, Icons, useReveal
public/projects/       screenshots of the live projects
```
