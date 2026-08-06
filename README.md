# Mustapha Ambali — Portfolio

Personal developer portfolio for Mustapha Ambali, built with the Next.js App
Router. Deployed at [ambalimustapha.dev](https://ambalimustapha.dev).

## Features

- Home, About, Work (projects + case studies), Writing, and Contact pages
- A working contact form (`app/api/contact/route.ts`) that sends real email via Resend
- Light / dark / system theme, persisted, with no flash on load
- Project case studies driven by structured data (`data/projects.ts`)
- SEO: metadata, Open Graph + Twitter images (generated), sitemap, robots.txt,
  JSON-LD `Person` schema
- Accessible navigation (keyboard support, focus states, skip link, reduced
  motion support)
- No fabricated content — projects, links, and status are kept honest and
  are meant to be updated as real work ships

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org) (strict mode)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Framer Motion](https://www.framer.com/motion/) for entrance/interaction animation
- [Lucide React](https://lucide.dev) for icons
- [Resend](https://resend.com) for the contact form's email delivery

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

The contact form sends email via [Resend](https://resend.com). Copy
`.env.example` to `.env.local` and fill in:

- `RESEND_API_KEY` — from [resend.com/api-keys](https://resend.com/api-keys).
  Required for the form to actually send mail. Server-only, never exposed to
  the browser.
- `RESEND_FROM_EMAIL` — optional. Leave unset to use Resend's shared
  `onboarding@resend.dev` test address, or set it once you've verified
  `ambalimustapha.dev` in Resend (e.g. `contact@ambalimustapha.dev`).

Without `RESEND_API_KEY` set, the site still builds and runs — the contact
form shows a clear error asking the visitor to email directly instead of
silently failing.

On Vercel: add both variables in Project Settings → Environment Variables.

## Project structure

```text
app/                  Routes (App Router)
  about/               /about
  contact/             /contact
  projects/            /projects and /projects/[slug]
  writing/             /writing
  api/contact/         POST route that sends the contact form via Resend
  layout.tsx           Root layout, fonts, metadata, JSON-LD
  page.tsx             Homepage (composes all sections)
  sitemap.ts           /sitemap.xml
  robots.ts            /robots.txt
  opengraph-image.tsx  Generated OG image
  twitter-image.tsx    Generated Twitter card image
  not-found.tsx         Custom 404

components/
  layout/              Navbar, Footer
  sections/            Hero, About, Skills, FeaturedProjects, Experience,
                       Education, Writing, Contact
  project/             Case study page building blocks
  ui/                  Button, ThemeToggle, ProjectCard, SocialLinks, etc.
  providers/           ThemeProvider (next-themes)

data/                  Structured content: projects, skills, experience, writing
lib/                   utils, constants, hooks, OG image generator
types/                 Shared TypeScript types
public/
  resume/              CV (replace the placeholder PDF with the real one)
  images/, projects/   Static assets (empty until real screenshots exist)
```

## Updating content

- **Projects** — edit `data/projects.ts`. Each project supports a
  `githubUrl` / `liveUrl`; only set these once a real link exists.
- **Skills** — edit `data/skills.ts`.
- **Experience** — edit `data/experience.ts`.
- **Writing** — edit `data/writing.ts`; posts appear automatically once added.
- **Resume** — replace `public/resume/mustapha-ambali-cv.pdf` with the real CV
  (keep the same filename, or update `RESUME_PATH` in `lib/constants.ts`).
- **Contact email / LinkedIn** — update `CONTACT_EMAIL` and `LINKEDIN_URL` in
  `lib/constants.ts` once confirmed.

## Development

```bash
npm run dev      # start the dev server
npm run lint     # ESLint
npx tsc --noEmit # type-check
```

## Production build

```bash
npm run build
npm run start
```

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com/new).
3. Deploy — add `RESEND_API_KEY` (and `RESEND_FROM_EMAIL` if you've verified a
   domain) in Project Settings → Environment Variables so the contact form
   can send email in production.
4. In the Vercel project settings, add the custom domain `ambalimustapha.dev`.
5. Configure DNS at your domain registrar per Vercel's instructions (A/CNAME
   records shown in the Vercel dashboard).
6. Wait for DNS propagation and verify Vercel issues an HTTPS certificate
   automatically.
7. Visit the production build and confirm the pages, theme toggle, and
   metadata (view source / social share preview) look correct.
