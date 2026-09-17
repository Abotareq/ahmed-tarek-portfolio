/**
 * Portfolio content. Every value here comes from the resume — nothing is invented.
 */

export const profile = {
  name: "Ahmed Tarek Mohamed",
  firstName: "Ahmed",
  lastName: "Tarek",
  initials: "AT",
  title: "Full Stack Developer",
  location: "Giza, Egypt",
  degree: "Bachelor of Science in Computer Science",
  email: "2hmadtareq@gmail.com",
  phone: "+20-01112968759",
  phoneHref: "tel:+201112968759",
  github: "https://github.com/Abotareq",
  githubHandle: "Abotareq",
  linkedin: "https://www.linkedin.com/in/ahmad-tarek-0587a31b0",
  summary:
    "Full-stack developer working mainly in .NET and React, with hands-on backend and frontend experience across SQL Server, EF Core, React, and Angular. Contributed to the architecture and backend of Tawreed, a B2B group purchasing platform for small businesses, working with Clean Architecture, ASP.NET Core, JWT authentication, and role-based access control. Also work across the MERN stack and have shipped a live Arabic RTL e-commerce platform with React and Node. Comfortable working across the stack from database schema to UI.",
  // Short hero line, condensed from the summary
  intro:
    "I build full-stack products in .NET and React — from database schema to UI.",
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Very Good" },
  ],
} as const;

export type SkillCategory = {
  id: string;
  label: string;
  items: readonly string[];
};

export const skills: readonly SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    items: ["JavaScript", "TypeScript", "C#", "C++", "Python", "SQL"],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "Angular",
      "Tailwind CSS",
      "Bootstrap",
      "HTML5",
      "CSS3",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "ASP.NET Core Web API",
      "Entity Framework Core",
      "GraphQL",
    ],
  },
  {
    id: "databases",
    label: "Databases",
    items: ["MongoDB", "Mongoose", "SQL Server", "Prisma ORM"],
  },
  {
    id: "auth",
    label: "Authentication",
    items: ["JWT", "ASP.NET Identity", "Role-Based Access Control"],
  },
  {
    id: "tools",
    label: "Tools",
    items: ["Git", "GitHub", "Postman", "VS Code", "Docker (Basic)"],
  },
  {
    id: "concepts",
    label: "Concepts",
    items: [
      "REST APIs",
      "OOP",
      "Design Patterns",
      "Clean Architecture",
      "DDD",
      "Agile Methodology",
      "Team Leadership",
    ],
  },
];

export type Experience = {
  role: string;
  company: string;
  location?: string;
  period: string;
  points: readonly string[];
  tech: readonly string[];
};

export const experience: readonly Experience[] = [
  {
    role: "Software Full-Stack Engineer Trainee",
    company: "Next for Technology Development",
    location: "Cairo, Egypt",
    period: "2026",
    points: [
      "Built and deployed full-stack features end to end: ASP.NET Core Web APIs backed by SQL Server and EF Core, paired with React front ends.",
      "Implemented JWT authentication and role-based authorization across a layered architecture.",
      "Used Git branching and pull request workflows in a team setting.",
    ],
    tech: ["ASP.NET Core", "SQL Server", "EF Core", "React", "JWT", "Git"],
  },
  {
    role: "MEARN Stack Trainee",
    company: "Information Technology Institute (ITI)",
    location: "Egypt",
    period: "2025",
    points: [
      "Built full-stack applications on the MERN stack: Express and Node APIs, MongoDB schemas, React and Angular front ends.",
      "Built and integrated RESTful APIs between frontend and backend layers.",
      "Worked in a team using Git version control and Agile sprints.",
    ],
    tech: ["MongoDB", "Express", "Angular", "React", "Node.js", "Agile"],
  },
];

export type ProjectLink = { label: string; href: string };

export type ProjectImage = { src: string; alt: string };

export type Project = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  /** Screenshot of the live site / repository README */
  image: ProjectImage;
  role: string;
  year: string;
  description: string;
  features: readonly string[];
  tech: readonly string[];
  links: readonly ProjectLink[];
};

export const projects: readonly Project[] = [
  {
    id: "tawreed",
    index: "01",
    name: "Tawreed",
    tagline: "Group Purchasing Platform for Small Businesses",
    image: {
      src: "/projects/tawreed.webp",
      alt: "Tawreed landing page with an order summary of pooled products",
    },
    role: "Contributor — Architecture & Backend",
    year: "2026",
    description:
      "A B2B platform connecting small business buyers with suppliers for bulk ordering. Small businesses pool orders and access supplier pricing normally reserved for bulk buyers.",
    features: [
      "Contributed to system architecture and backend design.",
      "Backend built with ASP.NET Core Web API, C#, Entity Framework Core, SQL Server, and ASP.NET Identity, applying Clean Architecture principles.",
      "Authentication and role-based authorization logic using JWT and FluentValidation.",
      "Repository Pattern, Service Layer architecture, dependency injection, and DTO mapping in assigned modules.",
    ],
    tech: [
      "ASP.NET Core Web API",
      "C#",
      "EF Core",
      "SQL Server",
      "ASP.NET Identity",
      "JWT",
      "FluentValidation",
      "Clean Architecture",
    ],
    links: [{ label: "Live site", href: "https://tawreed-frontend.vercel.app/" }],
  },
  {
    id: "herfy",
    index: "02",
    name: "Herfy",
    tagline: "Arabic E‑commerce Platform with RTL Support",
    image: {
      src: "/projects/herfy.webp",
      alt: "Herfy storefront home page with hero carousel and categories",
    },
    role: "Team Lead — Full-stack, 4-person team",
    year: "2025",
    description:
      "A full-stack Arabic e-commerce web app (Herfy clone) with right-to-left support, built by a four-person team with a separate storefront and admin dashboard.",
    features: [
      "Led the team as formally assigned lead: assigned tasks, reviewed pull requests, and made architecture decisions.",
      "Role-based authorization, JWT authentication, cart management, checkout workflows, and order management.",
      "Application state managed with Redux Toolkit, Context API, and TanStack Query.",
    ],
    tech: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redux Toolkit",
      "TanStack Query",
    ],
    links: [
      { label: "Storefront", href: "https://herfey-client-side.vercel.app/en" },
      { label: "Admin dashboard", href: "https://herafy-admin.vercel.app" },
    ],
  },
  {
    id: "customer-service",
    index: "03",
    name: "Customer Support Request Management",
    tagline: "DDD / Clean Architecture Backend System",
    image: {
      src: "/projects/customer-service.webp",
      alt: "README of the Customer Support Request Management API repository",
    },
    role: "Solo — Backend",
    year: "2026",
    description:
      "A backend for handling and routing customer support requests, covering request submission, assignment, status changes, and messaging between customers and agents.",
    features: [
      "Clean Architecture with DDD and CQRS (MediatR).",
      "JWT authentication with refresh token rotation, email verification, and forgot/reset password flows using ASP.NET Identity.",
      "Real-time message delivery with SignalR, broadcasting updates per request to connected customers and agents.",
      "Role-based and resource-level authorization so customers, agents, and managers each see only the requests they should.",
    ],
    tech: [
      "ASP.NET Core",
      "C#",
      "DDD",
      "CQRS",
      "MediatR",
      "SignalR",
      "ASP.NET Identity",
      "JWT",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/Abotareq/customer-service" },
    ],
  },
  {
    id: "inventory",
    index: "04",
    name: "Fulfillment & Inventory Management Platform",
    tagline: "Multi-warehouse Inventory & Order Backend",
    image: {
      src: "/projects/inventory.webp",
      alt: "README of the Fulfillment & Inventory Management Platform repository",
    },
    role: "Solo — Backend",
    year: "2026",
    description:
      "A backend API for managing product catalogs, warehouse inventory, and customer orders. Tracks products across multiple warehouses, keeps stock accurate as orders move through their lifecycle, and maintains a full audit trail of every change — without double-counting or overselling.",
    features: [
      "Clean Architecture across five projects (Domain, Application, Infrastructure, Contracts, Api) with MediatR CQRS and FluentValidation.",
      "Per-warehouse stock with a two-phase reservation model and an order lifecycle (Draft → Submitted → Processing → Completed) with clean cancellation.",
      "Optimistic concurrency on Stock and Order, idempotent order creation via client-supplied keys, and price snapshots on order items.",
      "Domain events dispatched from a SaveChanges interceptor write field-level audit logs and stock/order history in the same transaction.",
      "JWT authentication via ASP.NET Identity with four roles: Administrator, Warehouse Operator, Sales Agent, and Manager.",
    ],
    tech: [
      ".NET 10",
      "ASP.NET Core Web API",
      "EF Core",
      "SQL Server",
      "MediatR",
      "FluentValidation",
      "ErrorOr",
      "ASP.NET Identity",
      "JWT",
      "Swagger",
    ],
    links: [
      { label: "Live site", href: "https://inventory-management-platform-nu.vercel.app" },
      { label: "GitHub", href: "https://github.com/Abotareq/Inventory-Management-Platform" },
    ],
  },
];

export const education = {
  degree: "Bachelor of Science (BS) in Computer Science",
  period: "2019 – 2024",
  program:
    "Dual-accredited program: University of Greenwich & October University for Modern Sciences & Arts (MSA), Egypt",
  institutions: [
    "University of Greenwich",
    "October University for Modern Sciences & Arts (MSA)",
  ],
  grade: "Good",
} as const;

export type Training = {
  program: string;
  institution: string;
  period: string;
  description: string;
  tech: readonly string[];
};

export const trainings: readonly Training[] = [
  {
    program: "Software Full-Stack Engineer Trainee Program",
    institution: "Next for Technology Development, Cairo, Egypt",
    period: "2026",
    description:
      "Built and deployed full-stack features end to end — ASP.NET Core Web APIs backed by SQL Server and EF Core, paired with React front ends — with JWT authentication, role-based authorization, and Git branching / pull request workflows in a team setting.",
    tech: ["ASP.NET Core", "SQL Server", "EF Core", "React", "JWT", "Git"],
  },
  {
    program: "MEARN Stack Program",
    institution: "Information Technology Institute (ITI), Egypt",
    period: "2025",
    description:
      "Full-stack training on the MERN stack — Express and Node APIs, MongoDB schemas, React and Angular front ends, RESTful API integration, Git, and Agile sprints.",
    tech: ["MongoDB", "Express", "Angular", "React", "Node.js", "REST APIs", "Git", "Agile"],
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;
