import type { Project } from "@/types";

const FINASSIST_IMAGES = "/images/finassist-six-professional-images";

export const projects: Project[] = [
  {
    title: "Sabimate",
    slug: "sabimate",
    disciplines: ["Mobile", "Backend"],
    category: "Study-Abroad Guidance App",
    description:
      "A Flutter app and FastAPI backend that help students plan studying abroad, with an AI assistant grounded in each student's own profile.",
    // Order matters: cards show the first three, so mobile and backend lead.
    technologies: [
      "Flutter",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Dart",
      "Python",
      "Riverpod",
      "Docker",
      "OpenAI API",
    ],
    status: "In active development",
    featured: true,
    year: 2026,
    image: "/images/Sabimate1.png",
    imageAlt: "Sabimate logo with the tagline \"Know before you go\" on a dark teal background",
    highlight:
      "Built the AI agent on a dedicated backend with persistent student context, keeping research behind feature flags and Redis-enforced quotas.",
    caseStudy: [
      {
        heading: "Overview",
        paragraphs: [
          "Sabimate is an AI-powered education guidance platform designed to help students make better-informed decisions about studying abroad. Choosing where and what to study means weighing admission requirements, countries, costs, scholarships and eligibility at the same time — and that information is spread across dozens of sources.",
          "Instead of sending students through a maze of pages, Sabimate is built around a conversation. A student describes their academic background, budget and preferred destinations once during onboarding, and the assistant uses that profile to give answers that fit their situation rather than generic advice.",
        ],
      },
      {
        heading: "The problem",
        paragraphs: [
          "International education decisions involve more than finding a university. Students need to know whether their academic profile is competitive, which countries match their preferences, what they should budget for and which opportunities are worth pursuing.",
          "The answers exist, but they're scattered across university websites, scholarship portals and government pages, and each assumes you already know what to look for. Sabimate brings that into one assistant that understands the student's context and helps them work through their options in plain conversation.",
        ],
      },
      {
        heading: "What I built",
        bullets: [
          "Flutter mobile app for Android and iOS, using Riverpod and go_router",
          "Email and password accounts with email verification and password reset",
          "Multi-step student onboarding: education, grades and grading scale, language tests, preferred countries, budget range, funding and scholarship preferences",
          "Chat with streamed assistant replies (server-sent events), rendered as markdown with follow-up suggestions",
          "Persistent conversations, messages and assistant generations",
          "An assistant pipeline that assembles each reply from the student's profile and conversation history",
          "A research engine that plans searches, reads official pages and returns cited sources",
          "Source and citation display in the chat interface",
          "FastAPI backend with PostgreSQL, Alembic migrations and Redis",
          "Containerised development environment and automated CI",
        ],
      },
      {
        heading: "Engineering and architecture",
        paragraphs: [
          "The mobile app is built in Flutter and talks to a Python backend written with FastAPI. The backend owns everything that matters for trust and continuity: accounts and sessions, student profiles and preferences, conversations and messages, and the orchestration of every assistant reply. PostgreSQL stores that state through async SQLAlchemy, with schema changes managed by Alembic migrations, and Redis backs the rate limits and usage quotas.",
          "All model calls go through a single provider adapter built on the OpenAI Responses API, with separate fast, standard and reasoning tiers configured per environment. Application code never calls a model directly, which keeps prompts, retries and timeouts in one place and makes the provider replaceable.",
          "Normal conversational replies and research are deliberately separate paths. When research is enabled, a planner on the fast tier decides what to search for, the search runs through OpenAI's hosted web search, and official pages can be read through a hardened fetcher before the evidence is screened. Citations are validated before they reach the student, so a source only appears if it actually supports the answer.",
          "The backend is organised into modules with enforced layer boundaries (checked with import-linter), strict type checking with mypy, and roughly 240 test files covering units and integration against real PostgreSQL and Redis, with fakes standing in for the model and search providers.",
        ],
      },
      {
        heading: "Challenges",
        paragraphs: [
          "Personalisation is only useful if the assistant reliably uses the student's actual profile. Assembling the right context for every reply — profile, preferences and recent conversation — without bloating each request took careful design of the context-assembly step.",
          "Research is valuable but expensive and harder to keep accurate, so it needed its own controls: a daily research quota enforced atomically in Redis, idempotent per-search accounting, and validation that every cited source genuinely backs what the assistant says. Reply volume is rate-limited per user as well, and the limiter fails closed rather than letting traffic through if Redis is unavailable.",
          "Streaming replies over server-sent events while also persisting each message and generation meant the backend and the Flutter client had to agree precisely on message state, including what happens when a stream is interrupted.",
        ],
      },
      {
        heading: "Technical decisions",
        paragraphs: [
          "Flutter gives one codebase for Android and iOS while the product is still taking shape. FastAPI provides a typed, structured Python backend that fits naturally alongside the AI tooling, and PostgreSQL holds user and conversation data that has to persist reliably.",
          "Model access lives behind one dedicated provider adapter rather than being scattered through the codebase, and every assistant and research capability sits behind its own feature flag. That lets each capability be switched on independently once it has been tested, while keeping cost and scope under control.",
          "Presentation, business logic and AI orchestration are kept in clearly separate layers, so new capabilities can be added to the assistant without reworking the app or the data model.",
        ],
      },
      {
        heading: "Current status",
        paragraphs: [
          "Sabimate is in active development. Accounts, email verification, the full student onboarding, persisted conversations with streamed replies and source display are built end to end, and the backend is deployed with automated migrations.",
          "The assistant and research engine are built and tested but remain behind feature flags while they're configured and evaluated for production, so they aren't publicly available yet. Saved items, billing, social sign-in and notifications are still to come, and the curated programme and scholarship data that will feed personalised recommendations is being assembled. Sabimate doesn't claim partnerships with universities or guarantee admissions or scholarships.",
        ],
      },
    ],
  },
  {
    title: "FinAssist",
    slug: "finassist",
    disciplines: ["Mobile", "Backend"],
    category: "Personal Finance App",
    description:
      "A Flutter app backed by a Flask REST API that runs financial calculations on the server, then lets an AI assistant explain the results.",
    technologies: [
      "Flutter",
      "Flask",
      "REST API",
      "Dart",
      "Python",
      "Riverpod",
      "JWT authentication",
      "Firebase Cloud Messaging",
      "AI integration",
    ],
    status: "In development",
    featured: true,
    year: 2026,
    image: `${FINASSIST_IMAGES}/01-finassist-homepage-cover.png`,
    imageAlt:
      "FinAssist cover with three app screens: the welcome screen, an AI chat and the currency converter",
    imageSize: { width: 1600, height: 1100 },
    // The title text sits close to the cover's left edge, so the cover is shown
    // whole rather than cropped to the card's shape, on its own edge colours
    // (darker on the left, lighter on the right).
    imageBackdrop: "linear-gradient(90deg, #060f0d, #061b15)",
    // Phones cut out of the presentation slides pixel for pixel (no resampling;
    // 03, 05 and 06 from the copies with the account details masked).
    gallery: [
      {
        src: `${FINASSIST_IMAGES}/02-finassist-ai-chat-phone.png`,
        alt: "FinAssist chat screen: the assistant asks which currency a 6,000 subscription is in, then confirms Netflix was added at ₦6,000 per month",
        caption: "AI chat: the assistant asks for the missing currency, then adds the subscription.",
        width: 444,
        height: 931,
      },
      {
        src: `${FINASSIST_IMAGES}/03-finassist-conversation-history-phone.png`,
        alt: "FinAssist navigation panel with a New chat button, a search field and a list of earlier conversations",
        caption: "Conversation history: start a new chat or reopen an earlier one.",
        width: 444,
        height: 931,
      },
      {
        src: `${FINASSIST_IMAGES}/04-finassist-currency-converter-phone.png`,
        alt: "FinAssist currency converter set to convert US dollars to Nigerian naira, with a Convert button",
        caption: "Currency converter, one of the app's tools.",
        width: 444,
        height: 931,
      },
      {
        src: `${FINASSIST_IMAGES}/05-finassist-profile-settings-phone.png`,
        alt: "FinAssist profile screen listing personal information, password, security, notifications, appearance, and language and currency settings",
        caption: "Profile and settings: account, security and app preferences.",
        width: 444,
        height: 931,
      },
      {
        src: `${FINASSIST_IMAGES}/06-finassist-light-theme-phones.png`,
        alt: "FinAssist chat and profile screens side by side in the light theme",
        caption: "Light theme: the chat and profile screens.",
        width: 741,
        height: 730,
      },
    ],
    highlight:
      "Kept the numbers deterministic: the backend calculates, and the assistant receives the result as structured context to explain it rather than recompute it.",
    caseStudy: [
      {
        heading: "Overview",
        paragraphs: [
          "FinAssist is an AI-powered financial assistant built with Flutter and Python Flask. It combines conversational AI with practical financial tools, helping users calculate, understand and manage everyday financial information.",
          "Its core principle is simple: the backend handles the calculations, while AI helps users understand the results.",
        ],
      },
      {
        heading: "The Problem",
        paragraphs: [
          "Financial tools often provide numbers without helping users understand what they mean. FinAssist brings calculations and conversational explanations together, allowing users to ask questions and follow up without switching between different apps.",
        ],
      },
      {
        heading: "What I Built",
        bullets: [
          "Cross-platform Flutter app with Riverpod state management.",
          "Authentication using JWT access and refresh tokens.",
          "AI chat with server-side conversation history.",
          "Document and image attachments in chat.",
          "Backend-powered currency conversion.",
          "Subscription tracking with renewal schedules and totals.",
          "Structured tool-to-chat integration through Ask FinAssist.",
          "Push notifications using Firebase Cloud Messaging.",
          "Profile and preference management.",
        ],
      },
      {
        heading: "Engineering Highlights",
        subsections: [
          {
            heading: "Reliable financial calculations",
            paragraphs: [
              "Currency conversions run on the Flask backend using an external exchange-rate source. The AI does not generate financial figures; it explains results returned by the backend.",
            ],
          },
          {
            heading: "Tool-to-chat integration",
            paragraphs: [
              "Ask FinAssist passes versioned, structured tool results into the user's existing conversation. This allows the assistant to explain calculations and answer follow-up questions using the actual results.",
            ],
          },
          {
            heading: "Application architecture",
            paragraphs: [
              "The Flutter frontend communicates with a Flask REST API through a repository layer. Conversations are stored server-side, with a secure local cache on the device.",
            ],
          },
        ],
      },
      {
        heading: "Challenges & Decisions",
        paragraphs: [
          "One of the main challenges was connecting financial tools to the existing chat experience without losing the accuracy of their results.",
          "I addressed this with a shared, structured context format, keeping calculations deterministic and using AI specifically for explanations rather than arithmetic.",
          "The app uses Flutter for a shared Android and iOS codebase and Flask for a lightweight backend.",
        ],
      },
      {
        heading: "Current Status",
        paragraphs: [
          "FinAssist is in development. The chat, conversation history, document attachments, currency converter, subscription tracker and push notifications are built.",
          "Additional calculators and a financial dashboard are being developed or reworked.",
          "FinAssist is not a bank or licensed financial adviser. Its explanations and projections are not financial advice.",
        ],
        subsections: [
          {
            heading: "Testing",
            paragraphs: [
              "Approximately 380 tests covering application functionality, including tool-to-chat integration.",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Fihone",
    slug: "fihone",
    disciplines: ["Mobile", "Backend"],
    category: "Device Security App",
    imageAlt: "Fihone app screens showing the shield logo, a device location map and the app's splash screen",
    description:
      "A Flutter app with its own backend API for device registration, activity monitoring and security controls, keeping sensitive logic off the device.",
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
        heading: "The problem",
        paragraphs: [
          "Most people have no easy way to see what's actually happening on their devices, or to act quickly if a device is lost, misused, or behaving unexpectedly. That kind of visibility tends to be scattered across manufacturer apps, carrier tools, or nothing at all.",
          "Fihone is my attempt at pulling that into one place — a mobile app that treats device security as something you can actually check in on, not just something you hope is fine.",
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
    title: "ambalimustapha.dev",
    slug: "portfolio",
    disciplines: ["Web"],
    category: "Portfolio Website",
    description:
      "This site: a statically generated Next.js and TypeScript app with a validated, rate-limited contact API that delivers branded email through Resend.",
    technologies: ["Next.js", "TypeScript", "React", "SCSS", "Resend"],
    status: "Live",
    featured: true,
    year: 2026,
    image: "/images/DevPort1.jpg",
    imageAlt: "The ambalimustapha.dev homepage displayed on a laptop screen",
    liveUrl: "https://ambalimustapha.dev",
    githubUrl: "https://github.com/ambalimustaphadev/ambalimustapha.dev",
    highlight:
      "The contact form posts to a server route that validates input, rate-limits by IP, filters bots with a honeypot and escapes every field before any email is sent.",
    caseStudy: [
      {
        heading: "Overview",
        paragraphs: [
          "This site is where I present my work. It's built with Next.js on the App Router, React and strict TypeScript, styled with SCSS and deployed on Vercel. Every page except the contact endpoint is generated statically at build time, so visitors are served prerendered HTML.",
          "Content lives in typed data files rather than in components: projects, case studies, articles, skills and experience. The figures shown on the site, such as the project count, are calculated from that same data, so they can't drift out of date.",
        ],
      },
      {
        heading: "What I built",
        bullets: [
          "A server-side contact API (Next.js route handler) that sends email through Resend",
          "Input validation with length limits, a honeypot field and per-IP rate limiting",
          "A branded HTML notification email with HTML escaping and a plain-text fallback",
          "Project, case study and article pages generated from typed content",
          "Filterable project listing and a homepage menu that highlights the section in view",
          "Per-page canonical URLs, Open Graph and Twitter metadata, a sitemap and structured data",
        ],
      },
      {
        heading: "Engineering",
        paragraphs: [
          "The contact form is a real backend feature rather than a form that only looks functional. The route handler checks every field on the server, rejects oversized input, quietly drops submissions that fill the hidden honeypot and limits each IP address to three messages every ten minutes. The visitor's name is stripped of control characters and every field is HTML-escaped before it goes into the email, which closes off header injection and markup injection.",
          "The notification email is built from table-based markup with inline styles so it renders consistently in Gmail, sets the visitor as the Reply-To address and carries a unique reference header so separate enquiries don't collapse into one thread.",
          "Search and sharing metadata is generated per page: each route has its own canonical URL, title, description and social preview, and articles publish BlogPosting structured data.",
        ],
      },
      {
        heading: "Accessibility",
        paragraphs: [
          "The site includes a skip link, visible keyboard focus styles and screen-reader feedback for the contact form. Scrolling and typing animations respect the reduced-motion setting, and decorative images are hidden from assistive technology while informative ones carry descriptive alt text.",
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
    title: "Regiforte",
    slug: "regiforte",
    // Mobile only for now: the case study lists backend integration as planned,
    // not built, so no backend technologies or discipline are claimed.
    disciplines: ["Mobile"],
    category: "Attendance & Presence App",
    description:
      "An offline-first Flutter app that records student presence with QR-based digital IDs, designed so a scan never fails for lack of signal.",
    technologies: ["Flutter", "Dart", "QR scanning", "Offline-first"],
    status: "In active development",
    featured: true,
    year: 2026,
    image: "/images/Regiforte1.png",
    imageAlt:
      "Regiforte app screens showing the splash screen, a QR check-in credential and a visit history with a weekly trend chart",
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
    disciplines: ["Backend"],
    category: "Wallet & Transactions API",
    description:
      "A Flask and PostgreSQL REST API for users, wallets and transfers, with JWT authentication, validated input and consistent transaction records.",
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
    disciplines: ["Backend"],
    category: "Backend · REST API",
    description:
      "A future backend project exploring Go, after building REST APIs in Python and Flask.",
    technologies: ["Go", "PostgreSQL", "REST API", "Docker"],
    status: "Coming soon",
    // Not listed or counted: nothing has been built yet (see the overview).
    // The page stays reachable but is excluded from the sitemap and indexing.
    featured: false,
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
// Every other project stays on /projects.
const HOMEPAGE_ORDER = ["sabimate", "finassist", "fihone"];

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

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
