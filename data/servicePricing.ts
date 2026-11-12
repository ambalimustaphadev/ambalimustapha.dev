export type ServicePackage = {
  /** Used in the CTA link (?service=…) to prefill the contact form. */
  slug: string;
  title: string;
  /** Starting price in USD; shown as "$800+". */
  startingPrice: number;
  billing: string;
  description: string;
  features: string[];
  cta: string;
  /** Opening line placed in the contact form's message when this CTA is used. */
  enquiry: string;
  featured?: boolean;
};

// Project-based starting estimates (USD), shown in the homepage "My Services"
// pricing section. Final quotes depend on scope.
export const servicePackages: ServicePackage[] = [
  {
    slug: "flutter-mobile",
    title: "Flutter Mobile Development",
    startingPrice: 800,
    billing: "Per Project",
    description:
      "Cross-platform mobile applications built with Flutter, delivering polished user experiences and reliable functionality across Android and iOS.",
    features: [
      "Android and iOS application development",
      "Modern, responsive Flutter interfaces",
      "Riverpod state management",
      "REST API and backend integration",
      "Authentication and database integration",
      "Testing, optimization and deployment support",
    ],
    cta: "Discuss Your App",
    enquiry: "Flutter Mobile Development enquiry",
  },
  {
    slug: "backend-api",
    title: "Backend & API Engineering",
    startingPrice: 400,
    billing: "Per Project",
    description:
      "Scalable backend systems and high-performance APIs built with modern Python technologies to power applications and digital products.",
    features: [
      "Python backend development",
      "FastAPI and Flask development",
      "RESTful API architecture and development",
      "Database design and integration",
      "Authentication and authorization",
      "Third-party API integrations",
      "API documentation and deployment",
    ],
    cta: "Discuss Your Backend",
    enquiry: "Backend & API Engineering enquiry",
  },
  {
    slug: "ai-agent",
    title: "AI Agent Development",
    startingPrice: 600,
    billing: "Per Project",
    description:
      "Intelligent AI-powered applications and agentic systems that automate workflows, process information and deliver useful experiences.",
    features: [
      "AI-powered application development",
      "AI agent and assistant development",
      "OpenAI API and LLM integrations",
      "Conversational AI and chat interfaces",
      "Python-based AI backend development",
      "Tool integration and workflow automation",
      "AI integration into existing applications",
    ],
    cta: "Discuss Your AI Project",
    enquiry: "AI Agent Development enquiry",
    featured: true,
  },
  {
    slug: "web",
    title: "Web Development",
    startingPrice: 250,
    billing: "Per Project",
    description:
      "Modern, responsive websites and web applications designed to establish your online presence and support your business.",
    features: [
      "Next.js and React development",
      "TypeScript and modern frontend development",
      "Responsive business websites",
      "Portfolio websites and landing pages",
      "SEO fundamentals and performance optimization",
      "Deployment and initial setup",
    ],
    cta: "Discuss Your Website",
    enquiry: "Web Development enquiry",
  },
];

/** Contact-form message prefill for a service slug, or undefined if unknown. */
export function enquiryMessageFor(slug: string | null): string | undefined {
  const service = servicePackages.find((item) => item.slug === slug);
  return service ? `${service.enquiry}: ` : undefined;
}
