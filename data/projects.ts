import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Mustapha Ambali",
    slug: "portfolio",
    category: "Developer Portfolio",
    description:
      "A modern portfolio showcasing my work as a software developer, built with Next.js, TypeScript, and a strong focus on performance, accessibility, and clean design.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    status: "Live",
    featured: true,
    homepageFeatured: true,
    year: 2026,
    image: "/images/DevPort1.jpg",
    highlight:
      "Used CSS masking instead of a bounding box so the hero portrait blends directly into the page background rather than sitting in a card.",
    caseStudy: [
      {
        heading: "Overview",
        paragraphs: [
          "This site is where I present my work — built with Next.js on the App Router, styled with Tailwind CSS, and deployed on Vercel. The goal was a portfolio that felt premium and considered rather than a generic template: consistent spacing and typography, a design system built around my own brand colors, and content that stays honest about what's finished versus still in progress.",
        ],
      },
      {
        heading: "Engineering",
        paragraphs: [
          "The contact form is backed by a Resend-powered API route with server-side validation, a honeypot field, and IP-based rate limiting, rather than a form that just looks functional. Theming (light, dark, system) is handled with next-themes, and motion throughout uses Framer Motion, kept deliberately subtle — fades and small lifts rather than anything flashy.",
        ],
      },
      {
        heading: "Current status",
        paragraphs: [
          "Live and actively maintained. I keep refining sections as my projects and experience evolve.",
        ],
      },
    ],
  },
  {
    title: "Fihone",
    slug: "fihone",
    category: "Mobile Security App",
    description:
      "A mobile security platform designed to protect devices through secure authentication, activity monitoring, and intelligent device management.",
    technologies: ["Flutter", "Dart", "Backend API", "Authentication", "Location services"],
    status: "In active development",
    featured: true,
    homepageFeatured: true,
    year: 2026,
    image: "/images/Fihone1.png",
    highlight:
      "Built the mobile client and backend as separate systems from day one, keeping auth and device data off the device.",
    caseStudy: [
      {
        heading: "Overview",
        paragraphs: [
          "Fihone is a cross-platform mobile application built to give people more visibility and control over the security of their own devices. The idea is a single app where someone can review device activity, manage security controls, and respond quickly if something looks wrong — rather than piecing that together across several disconnected tools.",
          "The mobile client is built in Flutter, backed by an API that handles authentication, device data, and location services. It's under active development, and the architecture is still evolving as the core flows get built out and tested.",
        ],
      },
      {
        heading: "What I built",
        bullets: [
          "Device monitoring and security controls",
          "Device registration and tracking",
          "Activity monitoring",
          "User authentication",
        ],
      },
      {
        heading: "The problem",
        paragraphs: [
          "Most people have no easy way to see what's actually happening on their devices, or to act quickly if a device is lost, misused, or behaving unexpectedly. That kind of visibility tends to be scattered across manufacturer apps, carrier tools, or nothing at all.",
          "Fihone is my attempt at pulling that into one place — a mobile app that treats device security as something you can actually check in on, not just something you hope is fine.",
        ],
      },
      {
        heading: "Engineering",
        paragraphs: [
          "The app is split cleanly between the Flutter client and a separate backend API, so the mobile app isn't doing anything it shouldn't — authentication, device data, and location handling all live behind the API rather than in the client.",
          "Authentication is the foundation everything else depends on, so it was one of the first things built and the part I've spent the most time getting right. From there, device registration ties a physical device to an account, and activity monitoring builds on top of that to surface what's actually going on.",
          "State management on the client is built around keeping device and account data in sync with the backend without over-fetching, which becomes more important as more monitoring features get added.",
        ],
      },
      {
        heading: "Challenges",
        paragraphs: [
          "Location and device permissions behave differently across Android and iOS, and getting a consistent, trustworthy signal out of both without draining the battery or annoying the user has taken more iteration than I expected.",
          "Keeping the mobile client and backend in agreement about device state — especially when a device goes offline or a user has multiple devices — has been the other recurring problem worth solving properly rather than patching around.",
        ],
      },
      {
        heading: "Decisions",
        paragraphs: [
          "I chose Flutter early on so the same codebase could reasonably target both Android and iOS without maintaining two separate clients while the product is still taking shape.",
          "I also decided to build the backend as a proper separate API from day one, rather than embedding logic into the client, even though that meant more upfront setup. It keeps security-sensitive logic off the device and makes it possible to add an admin or web layer later without rebuilding the mobile app.",
        ],
      },
      {
        heading: "Current status",
        paragraphs: [
          "Fihone is still in active development. Core authentication, device registration, and activity monitoring are being built and tested incrementally rather than all at once, and the app isn't publicly released yet.",
        ],
      },
    ],
  },
  {
    title: "Regiforte",
    slug: "regiforte",
    category: "Academy Management App",
    description:
      "A mobile platform that simplifies student presence, attendance, and academy operations through QR technology and an offline-first approach.",
    technologies: [
      "Flutter",
      "Dart",
      "Flask",
      "PostgreSQL",
      "QR Scanning",
      "Offline-first",
      "REST API",
    ],
    status: "In active development",
    featured: true,
    homepageFeatured: true,
    year: 2026,
    image: "/images/Regiforte1.png",
    highlight:
      "Designed offline-first so a presence scan never fails just because the phone has no signal.",
    caseStudy: [
      {
        heading: "Overview",
        paragraphs: [
          "Regiforte started from a simple problem: attendance and student presence in a learning environment can become unnecessarily manual. Students may arrive for class, come in for self-learning, leave the premises, or need to be identified quickly, while administrators still need a reliable record of who is actually around.",
          "I'm building Regiforte to make that process more digital and easier to manage, starting with the mobile experience and the core presence system.",
        ],
      },
      {
        heading: "The problem",
        paragraphs: [
          "Regiforte is designed around an environment where:",
        ],
        bullets: [
          "Students attend classes several days a week",
          "Students may also come to the school outside scheduled class times",
          "Students may come specifically for self-learning",
          "The school needs to know who is currently inside the premises",
          "Attendance and presence shouldn't depend entirely on paper",
          "Students need a reliable way to identify themselves",
          "Internet connectivity can't always be assumed",
          "The system needs to work around real school schedules and holidays",
        ],
      },
      {
        heading: "Core product idea",
        paragraphs: [
          "Regiforte is built around presence, not just attendance as a yes/no classroom checkbox. A student might arrive for a scheduled class, arrive for self-learning, visit for another reason, leave the premises, or return later — and the app is meant to record what's actually happening rather than force every visit into a single \"attended\" or \"absent\" state.",
        ],
      },
      {
        heading: "Digital identity",
        paragraphs: [
          "Each student has a digital identity inside the app — profile information, a profile photo, and a QR-based credential that represents them. That credential is what gets scanned to identify a student and record the relevant presence event.",
          "Physical ID cards or dedicated scanning hardware are possible extensions later, but right now the digital credential inside the app is the primary form of identification.",
        ],
      },
      {
        heading: "QR scanning",
        paragraphs: [
          "A student uses their digital credential to identify themselves when entering or leaving the school. The scanning flow is meant to be quick, clear about what just happened, and straightforward for staff to understand and rely on — without overstating how secure any particular mechanism is until it's actually been hardened.",
        ],
      },
      {
        heading: "Offline-first design",
        paragraphs: [
          "This is one of the more important engineering decisions in the project. Connectivity in a school building isn't guaranteed, and a presence event shouldn't fail just because a phone temporarily has no internet connection.",
          "The app is being designed with an offline-first approach: relevant presence data can be stored locally and synchronized once connectivity returns, rather than depending on a live connection for every scan.",
        ],
        bullets: [
          "Local presence storage",
          "Connectivity awareness",
          "Synchronization once back online",
          "Reliable event handling",
          "Avoiding duplicate events",
        ],
      },
      {
        heading: "School schedule",
        paragraphs: [
          "Regiforte is also designed around real school operating schedules rather than treating every day the same way. The app needs to understand things like opening hours, class schedules, when the last class of the day ends, school and public holidays, and that some visits are for self-learning rather than a scheduled class.",
          "That schedule and calendar context is what lets the app give a student more meaningful feedback than a plain confirmation.",
        ],
      },
      {
        heading: "Smart presence experience",
        paragraphs: [
          "After a scan, the app tries to say something useful rather than just confirming success. What it shows depends on what's actually happening — whether the student is arriving or leaving, and whether it's during a scheduled class or outside of it. A few examples of the kind of feedback it's designed to give:",
        ],
        bullets: [
          "You're checked out.",
          "You're back at Regiforte.",
          "Today's classes have ended. You're welcome to stay and keep learning.",
        ],
      },
      {
        heading: "Profile experience",
        paragraphs: [
          "The profile experience holds information like a profile photo, date of birth, gender, emergency contact, and identity details. This isn't just a settings screen — it's part of what makes the digital identity behind the QR credential meaningful, since that identity is what staff and the system rely on when a student is scanned in or out.",
        ],
      },
      {
        heading: "Architecture",
        paragraphs: [
          "I wanted the presence system to stay independent from the UI, so the app separates the presence domain, the repository layer, synchronization logic, and the presentation layer. That makes it easier to change how data is stored or synchronized later without having to rebuild the interface around it.",
          "Underneath that sits the usual foundation a Flutter app needs to stay maintainable as it grows — routing, authentication, design tokens and theming, environment configuration, and a profile and schedule layer that the presence system reads from. None of it is meant to be clever; it's meant to still make sense once a backend and an admin dashboard are attached to it.",
        ],
      },
      {
        heading: "Engineering challenges",
        bullets: [
          "Reliable presence events — recording one is easy when everything works; the harder part is keeping it accurate when connectivity changes or a student scans more than once.",
          "Offline behavior — the app has to keep working with no signal, without losing or duplicating presence data.",
          "Schedule context — a scan at 9am and a scan at 2pm can mean different things depending on the day's schedule, so the app needs to understand that rather than treating every scan identically.",
          "Student identity — reliably connecting a physical person to their digital identity, quickly enough that it doesn't slow anyone down.",
          "User feedback — a scan shouldn't just return \"success\"; the student should understand what happened and what their presence status actually means.",
        ],
      },
      {
        heading: "Product thinking",
        paragraphs: [
          "Regiforte isn't just a screen with a QR scanner attached to it. It has to account for real school operations, the different reasons a student might show up, unreliable connectivity, scheduling rules, identity, clear feedback, and data that stays consistent once a backend and synchronization are added — while remaining something I can keep building on rather than rewrite.",
        ],
      },
      {
        heading: "Current status",
        paragraphs: [
          "I'm currently building the mobile foundation and core presence experience. The system is being developed incrementally, with the architecture designed so backend services and administrative functionality can be introduced without having to rebuild the mobile application from scratch.",
        ],
      },
      {
        heading: "Future direction",
        paragraphs: ["Planned, not yet built:"],
        bullets: [
          "Backend integration",
          "Administrator web dashboard",
          "School management tools",
          "Richer attendance and presence analytics",
          "Notifications",
          "Expanded reporting",
          "Production deployment",
        ],
      },
    ],
  },
  {
    title: "Wallet API",
    slug: "financial-wallet-api",
    category: "Backend Service",
    description:
      "A backend project for handling users, wallets, transactions, transfers, authentication, and account management. I built it as a way to work through the backend concerns that appear once you move beyond simple CRUD APIs.",
    technologies: [
      "Python",
      "Flask",
      "PostgreSQL",
      "SQLAlchemy",
      "REST API",
      "JWT authentication",
      "Docker",
    ],
    status: "In development",
    featured: true,
    year: 2026,
    highlight:
      "Modeled wallets and transactions as related entities so a transfer updates both sides consistently — never left to the client.",
    caseStudy: [
      {
        heading: "Overview",
        paragraphs: [
          "A backend project built to practice designing a REST API the way a real financial product would need it: clear data models for users, wallets, and transactions, safe transfer logic, authenticated endpoints, and sensible account management. Built with Flask and PostgreSQL, using SQLAlchemy for the data layer and JWT for authentication, with Docker for a consistent local environment.",
        ],
      },
      {
        heading: "What I built",
        bullets: [
          "User accounts and authentication",
          "Wallets and balances",
          "Transactions and transfers",
          "Account management",
        ],
      },
      {
        heading: "Engineering",
        paragraphs: [
          "The API is organized around clear resources — users, wallets, transactions — with endpoints that require a valid JWT before touching wallet or transaction data. Passwords are hashed rather than stored in plain text, and request data is validated before it reaches the database layer.",
          "Error handling is treated as part of the API's actual behavior rather than an afterthought: failed transfers, invalid input, and auth failures return meaningful responses instead of generic errors.",
        ],
      },
      {
        heading: "Database design",
        paragraphs: [
          "Wallets and transactions are modelled as related SQLAlchemy entities rather than flattened into a single table, so a transfer updates both sides of a transaction consistently instead of relying on the client to keep balances in sync.",
        ],
      },
      {
        heading: "Security considerations",
        paragraphs: [
          "Authentication is required for anything that touches account or money data, and the focus so far has been getting the fundamentals right — hashed passwords, token-based auth, and validated input — before layering on anything more advanced.",
        ],
      },
      {
        heading: "Docker setup",
        paragraphs: [
          "The project runs in Docker to keep the local environment consistent between development sessions, and to make it straightforward to bring PostgreSQL up alongside the API without manual setup.",
        ],
      },
      {
        heading: "Current status",
        paragraphs: [
          "The API is in development. Core flows — accounts, wallets, transactions, and transfers — are functional and being refined; it isn't deployed anywhere publicly yet.",
        ],
      },
    ],
  },
  {
    title: "Go Backend Project",
    slug: "go-backend-project",
    category: "Backend · REST API",
    description:
      "A future backend project exploring Go, after building REST APIs in Python and Flask.",
    technologies: ["Go", "PostgreSQL", "REST API", "Docker"],
    status: "Coming soon",
    featured: true,
    year: 2026,
    caseStudy: [
      {
        heading: "Overview",
        paragraphs: [
          "I want to build a backend project in Go after spending time with Flask, mainly to see how Go's standard library and type system shape API design differently. Nothing has been built yet — this is a planned project, not a project in progress.",
        ],
      },
      {
        heading: "Current status",
        paragraphs: [
          "Coming soon. Details will be added once work actually begins.",
        ],
      },
    ],
  },
];

/** The three curated picks shown on the homepage, in this exact order. */
const HOMEPAGE_ORDER = ["regiforte", "fihone", "portfolio"];

/** Curated homepage projects — always these three, always in this order. */
export function getHomepageProjects(): Project[] {
  return HOMEPAGE_ORDER.map((slug) => projects.find((project) => project.slug === slug)).filter(
    (project): project is Project => Boolean(project),
  );
}

/** Projects with real, in-progress work — shown with full case-study cards. */
export function getPrimaryProjects(): Project[] {
  return projects.filter(
    (project) => project.featured && project.status !== "Coming soon",
  );
}

/** Planned projects with no real work yet — shown de-emphasized. */
export function getFutureProjects(): Project[] {
  return projects.filter(
    (project) => project.featured && project.status === "Coming soon",
  );
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
