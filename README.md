# Leo Leong — Portfolio

Personal portfolio for Leo Leong Ding Xuan — Cybersecurity & Digital Forensics graduate, former Trend Micro intern, software engineer at heart.

**Stack:** Next.js 15 · TypeScript · Tailwind CSS · Vercel

---

## Quick Start

```bash
npm install
cp .env.example .env.local   # fill in your values
npm run dev                   # http://localhost:3000
```

## Project Structure

```
leo-portfolio/
├── app/
│   ├── api/contact/route.ts    # Secure contact API (rate limiting, validation, sanitisation)
│   ├── about/page.tsx
│   ├── projects/page.tsx       # Filterable project case studies
│   ├── skills/page.tsx
│   ├── certifications/page.tsx
│   ├── contact/page.tsx
│   ├── layout.tsx
│   └── globals.css             # Design tokens
├── components/
│   ├── layout/                 # Navbar, Footer
│   ├── sections/               # Hero, FeaturedProjects, Specialties, AvailabilityBanner
│   └── ui/                     # Card, Tag, Badge, SkillBar, SectionHeader
├── data/index.ts               # ALL site content — single source of truth
├── lib/utils.ts
├── .env.example
└── next.config.ts              # Security headers + CSP
```

## Updating Content

Everything lives in `data/index.ts`. Edit `siteConfig`, `projects`, `skillCategories`, `certifications`, `achievements`, or `timeline` — the whole site updates automatically.

## Contact Form

Secure by default: server-side validation, HTML sanitisation, honeypot, rate limiting (5 req / 15 min per IP). To enable email: add `SENDGRID_API_KEY` to `.env.local` and uncomment the SendGrid block in `app/api/contact/route.ts`.

## Security Headers

Configured in `next.config.ts`: HSTS, X-Frame-Options, X-Content-Type-Options, CSP, Referrer-Policy, Permissions-Policy.

## Deployment

**Vercel:** `vercel --prod` — add env vars in dashboard.
**Railway/Render:** `npm run build && npm start`

## Adding Resume

Place PDF at `public/Leo_Leong_Resume.pdf` — the About page links to it automatically.
