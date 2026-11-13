import type { Metadata } from "next";
import { Rajdhani, Rubik } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScrollTop } from "@/components/layout/ScrollTop";
import { ChatWidget } from "@/components/layout/ChatWidget";
import { TemplateEffects } from "@/components/layout/TemplateEffects";
import {
  GITHUB_URL,
  LINKEDIN_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_ROLE,
  SITE_URL,
} from "@/lib/constants";
// Reeni template styles, in the template's original order: vendor CSS first,
// then the compiled SCSS. styles/vendor/odometer.css is the template's copy of
// odometer's default theme without the IE `*property` hacks, which Turbopack's
// CSS parser rejects — so the npm theme file is intentionally not imported.
import "@/styles/vendor/fontawesome.css";
import "@/styles/vendor/odometer.css";
import "@/styles/vendor/animate.min.css";
import "@/styles/vendor/bootstrap.min.css";
import "@/styles/scss/main.scss";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const rubik = Rubik({
  variable: "--font-rubik",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_ROLE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  // No canonical here: a canonical in the root layout is inherited by every
  // page, which pointed /about, /projects/* etc. at the homepage. Each page
  // sets its own `alternates.canonical` instead.
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_ROLE}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_ROLE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Only facts stated elsewhere on the site (education, experience, skills).
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      jobTitle: SITE_ROLE,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/images/port-pic.png`,
      knowsAbout: [
        "Mobile application development",
        "Flutter",
        "Backend engineering",
        "Python",
        "REST APIs",
        "PostgreSQL",
        "AI integration",
      ],
      alumniOf: { "@type": "CollegeOrUniversity", name: "Adekunle Ajasin University" },
      sameAs: [GITHUB_URL, LINKEDIN_URL].filter((url): url is string => Boolean(url)),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rajdhani.variable} ${rubik.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        {/* A plain <script> (Next.js' JSON-LD recommendation) so the structured
            data is in the server-rendered HTML; `<` is escaped against injection. */}
        <script
          id="person-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {/* Demo 09 is dark-only, so the theme is forced to the template's default
            (dark) styling. A stored "light" preference from the previous site is
            ignored. Re-enabling a light theme would mean dropping `forcedTheme`
            (the template's `.tmp-white-version` styles are still available). */}
        <ThemeProvider
          attribute="class"
          value={{ light: "tmp-white-version", dark: "tmp-dark-version" }}
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {/* No accent wrapper: Demo 09 uses the template's default pink (#FF014F). */}
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <ScrollTop />
          <ChatWidget />
          <TemplateEffects />
        </ThemeProvider>
      </body>
    </html>
  );
}
