# Setsuzoku LLP — Official Web Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2.35-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Hosted-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![MSME](https://img.shields.io/badge/MSME-Udyam_Registered-orange?style=for-the-badge)](https://udyamregistration.gov.in/)

The official enterprise web platform for **Setsuzoku LLP** (An Edu Alt Tech & Global Software Engineering Company). Engineered with Next.js 14, TypeScript, Tailwind CSS, GSAP, and Framer Motion, delivering high-performance digital experiences, enterprise applications, and cloud-native solutions.

---

## Table of Contents

- [Overview & Brand Identity](#overview--brand-identity)
- [Technology Stack](#technology-stack)
- [Architecture & Design System](#architecture--design-system)
- [Backend, Integrations & Hosting](#backend-integrations--hosting)
- [Key Features & Highlights](#key-features--highlights)
- [Prompts & Engineering Evolution](#prompts--engineering-evolution)
- [Project Directory Structure](#project-directory-structure)
- [Getting Started & Local Development](#getting-started--local-development)
- [Deployment Guide](#deployment-guide)
- [Contact & Corporate Information](#contact--corporate-information)

---

## Overview & Brand Identity

**Setsuzoku LLP** (*"Connect • Create • Grow"*) bridges ambitious ideas to high-impact software, AI, and digital products.

- **Entity**: Setsuzoku LLP
- **Government Recognition**: **UDYAM REGISTERED MICRO ENTERPRISE** — Registered with the Ministry of Micro, Small and Medium Enterprises (MSME), Government of India.
- **Headquarters**: Kakinada, Andhra Pradesh, India
- **Core Offerings**: Custom Web Applications, Enterprise ERP/CRM Systems, UI/UX Design, Cloud Infrastructure, AI Solutions, Digital Transformation.
- **Official Domains**: 
  - Main Website: [`https://setsuzoku.in`](https://setsuzoku.in)
  - Interactive Application Demo: [`https://www.setsuzoku.info`](https://www.setsuzoku.info)

---

## Technology Stack

### Frontend & Core Engine
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Next.js** | `14.2.35` | React framework using App Router, Static Site Generation (SSG), Server Components, and optimized image/font pipelines. |
| **React** | `18.x` | Declarative component UI library with concurrent rendering and hooks architecture. |
| **TypeScript** | `5.x` | Strict type safety across components, configurations, and mock datasets. |

### Styling & Motion Engineering
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Tailwind CSS** | `3.4.x` | Utility-first styling with custom brand palettes (`brand-blue: #0052FF`, `brand-green: #10B981`, slate neutrals). |
| **GSAP** | `3.15.0` | High-fidelity timeline animations, loading screen transitions, and performance-optimized canvas effects. |
| **Framer Motion** | `14.0.0` | Fluid gesture animations, micro-interactions, layout transitions, and interactive component states. |
| **Lucide React** | `1.52.0` | Modern, lightweight icon suite for consistent interface symbology. |
| **Tailwind Merge & Clsx** | Latest | Dynamic class generation and collision-free utility overrides. |

### Quality & Build Tooling
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **ESLint** | `8.x` | Static code analysis with Next.js core web vitals and strict TypeScript rules. |
| **SWC Minifier** | Native Next.js | Ultra-fast native Rust-based compilation and minification. |

---

## Architecture & Design System

1. **Light & Editorial Theme**:
   - Modern enterprise aesthetic featuring clear typography, generous whitespace, subtle border contrasts, and crisp drop shadows.
   - Brand color accents: Setsuzoku Blue (`#0052FF`), Emerald (`#10B981`), and Deep Slate (`#0F172A`).

2. **Custom Interactive Branded Cursor** (`src/components/ui/BrandedCursor.tsx`):
   - Bespoke cursor aura and ripple animations powered by GSAP.
   - Context-aware hover states that morph over buttons, cards, images, and links.
   - Automatically disabled on touch devices and dedicated demo interfaces for optimal performance.

3. **Dynamic Loading Screen** (`src/components/layout/LoadingScreen.tsx`):
   - Cinematic entry experience with branded video synchronization, smooth SVG curtain lift, and seamless page reveal.

4. **Component-Driven Atomic Structure**:
   - Reusable primitives: `Button`, `Card`, `Container`, `SectionHeading`, `Badge`.
   - Structural modules: `Navbar`, `Footer`, `HeroContent`, `MSMEBadge`.

---

## Backend, Integrations & Hosting

### 1. Hosting Platform — Vercel Edge Network
- **Deployment Target**: [Vercel](https://vercel.com/) (Hobby / Personal Tier).
- **Git Provider**: GitHub (`hemanthphani3-lang/setsuzoku-web`).
- **Continuous Deployment**: Automated git-push build pipelines on `main` branch with zero-downtime atomic rollouts.
- **Global CDN**: Edge caching and asset compression for sub-second international response times.

### 2. Backend & Server-Side Functions
- **Next.js App Router Route Handlers**:
  - `/api/contact`: Form submission handling and inquiry routing.
- **HTTP Security Headers** (`next.config.mjs`):
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - `X-DNS-Prefetch-Control: on`

### 3. Edge Redirects & Demo Routing
- **Target URL**: `https://www.setsuzoku.info`
- **Hero CTA**: The "Demo" button in the hero section opens `https://www.setsuzoku.info` in a new tab (`external={true}`, `target="_blank" rel="noopener noreferrer"`).
- **Server-Level 307 Redirects**: Configured in `next.config.mjs`:
  ```javascript
  async redirects() {
    return [
      {
        source: "/demo",
        destination: "https://www.setsuzoku.info",
        permanent: false,
      },
      {
        source: "/demo/:path*",
        destination: "https://www.setsuzoku.info",
        permanent: false,
      },
    ];
  }
  ```
- **Client Fallback**: `src/app/demo/page.tsx` executes `redirect("https://www.setsuzoku.info")` via Next.js navigation.

---

## Key Features & Highlights

### 1. MSME Government Registration Integration
- **Header Badge**: Compact `MSME RECOGNISED` badge with green shield indicator beside the Setsuzoku company logo.
- **Footer Credentials**: Comprehensive government recognition card displaying:
  - Official MSME emblem (`/brand/msme-logo.jpg`) with clean transparent/white framing.
  - Credential headline: **UDYAM REGISTERED MICRO ENTERPRISE**
  - Ministry attribution: *Registered with the Ministry of Micro, Small and Medium Enterprises, Government of India.*
  - Strict privacy preservation: Omits private certificate numbers and issue dates.

### 2. "Trusted By" Client Organizations Section
High-resolution organization logos integrated cleanly into the footer:
1. **New Era** (`/clients/new-era.png`)
2. **Decode / Dcode** (`/clients/dcode.png`)
3. **Joy School** (`/clients/joy-school.png`)
4. **Genesis** (`/clients/genesis.png`)
5. **MamaSparsh** (`/clients/mamasparsh.png`)
- Custom background removal, transparency preservation, and proportional scaling.

### 3. ISB Professional Engagement Statement
- Professional credibility statement in the footer:
  > *"Providing technology and digital solutions to professionals associated with the Indian School of Business (ISB)."*
- Accompanying *"Executive Solutions"* indicator tag.

### 4. Interactive Enterprise Application Demo Suite (`src/components/demo/`)
A complete 12-module frontend enterprise software demonstration simulating business applications engineered by Setsuzoku:
- **Sales**: Leads Pipeline, Quotations Generator, Client CRM
- **Delivery**: Project Milestones, Kanban Tasks, Client Approvals
- **Money**: Invoicing System, Payment Logs, Financial Analytics
- **Admin**: Client Portal, Team & Permissions, System Settings
- **Privacy Standard**: 100% fictional data with `@example.com` domains, simulated transactions, and persistent `DEMO MODE — FICTIONAL DATA` badge.

### 5. Comprehensive Legal & Regulatory Center
- **Privacy Policy** (`/privacy`): Compliant with India's **Digital Personal Data Protection Act (DPDPA 2023)** and global frameworks (GDPR, CCPA).
- **Google API Limited Use Disclosure**: Explicit section detailing compliance with the Google API Services User Data Policy for Setsuzoku Mail Studio.
- **Terms & Conditions** (`/terms`): Enterprise engagement contracts, IP ownership, liability terms, and grievance officer details.

---

## Prompts & Engineering Evolution

The platform was built through structured, iterative agentic development prompts. Below is the historical prompt ledger:

### Prompt 1: Legal Compliance, Privacy Policy & DPDPA Implementation
> **Objective**: Implement comprehensive, legally enforceable Privacy Policy and Terms & Conditions pages.
> - Full compliance with India's DPDPA 2023, Information Technology Act 2000, and SPDI Rules 2011.
> - Dedicated Google API Services User Data Policy / Limited Use disclosure for Setsuzoku Mail Studio.
> - Formulated clear grievance redressal mechanisms, data retention timelines, and cookie controls.
> - Linked across global sitemap, robots.txt, and footer navigation.

### Prompt 2: MSME Identity Header & Footer Integration
> **Objective**: Integrate official MSME registration credentials into the header and footer.
> - Header: Small, professional `MSME RECOGNISED` badge beside the primary Setsuzoku logo.
> - Footer: Integrated `UDYAM REGISTERED MICRO ENTERPRISE` credentials under the Ministry of Micro, Small and Medium Enterprises, Government of India.
> - Strict rule: Do not expose private certificate registration numbers or dates.

### Prompt 3: Official MSME Ministry Logo Integration
> **Objective**: Add the official MSME logo asset to the footer.
> - Preserved official proportions and clarity.
> - Clean background container placed alongside company credentials.
> - Fully responsive across mobile, tablet, and desktop viewports.

### Prompt 4: Footer "Trusted By" Client Logos & ISB Statement
> **Objective**: Showcase partner/client organization logos and executive credibility statement in the footer.
> - Added "Trusted By" subsection featuring 5 organizations: New Era, Genesis, MamaSparsh, Joy School, and Decode.
> - Added professional engagement statement regarding solutions provided to professionals associated with the Indian School of Business (ISB).

### Prompt 5: Client Logo Asset Optimization & Styling
> **Objective**: Remove opaque backgrounds and normalize visual sizing of client logos.
> - Cleaned white backgrounds on client assets to render seamlessly on dark footer cards.
> - Balanced visual weight and increased relative dimensions of smaller logos (Decode & Joy School).

### Prompt 6: Hero Section Demo Button Placement
> **Objective**: Place a prominent secondary action button beside "Start a conversation".
> - Added the `Demo →` button to the hero action bar.
> - Configured outline styling with hover transition and responsive stacking.

### Prompt 7: Interactive Application Demo Suite (12 Modules)
> **Objective**: Create a complete, standalone frontend enterprise dashboard demo.
> - Implemented 12 interactive modules across Sales, Delivery, Money, and Admin.
> - Interactive React state, filters, modal creators, tab switchers, and local storage persistence.
> - Strict fictional data isolation with reserved `@example.com` emails and persistent demo notices.

### Prompt 8: External Redirection to `www.setsuzoku.info`
> **Objective**: Connect the Demo CTA and `/demo` route directly to `https://www.setsuzoku.info`.
> - Updated Hero `Button` to `href="https://www.setsuzoku.info"` with `external={true}`.
> - Configured HTTP 307 temporary redirects in `next.config.mjs` for `/demo` and `/demo/:path*`.
> - Added server-component redirect fallback in `src/app/demo/page.tsx`.

### Prompt 9: Git Push & Vercel Production Deployment
> **Objective**: Commit all source code and assets, push to GitHub (`hemanthphani3-lang/setsuzoku-web`), and configure Vercel deployment.
> - Staged and committed 38 files with conventional commit messages.
> - Pushed to `origin/main`.
> - Configured Vercel personal Hobby account integration for automated zero-cost continuous deployment.

---

## Project Directory Structure

```text
setsuzoku-web/
├── public/
│   ├── brand/
│   │   ├── setsuzoku-logo.png       # Primary Setsuzoku brand logo
│   │   └── msme-logo.jpg            # Official MSME government registration emblem
│   ├── clients/
│   │   ├── dcode.png                # Decode / Dcode client logo
│   │   ├── genesis.png              # Genesis client logo
│   │   ├── joy-school.png           # Joy School client logo
│   │   ├── mamasparsh.png           # MamaSparsh client logo
│   │   └── new-era.png              # New Era client logo
│   └── og.png                       # OpenGraph social share card
├── src/
│   ├── app/
│   │   ├── api/contact/             # Contact inquiry route handler
│   │   ├── about/                   # About Setsuzoku company page
│   │   ├── careers/                 # Careers and job openings
│   │   ├── contact/                 # Contact form and office info
│   │   ├── demo/                    # Demo redirect route handler
│   │   ├── pricing/                 # Services pricing matrix
│   │   ├── privacy/                 # DPDPA & Google API privacy policy
│   │   ├── services/                # Comprehensive service detail pages
│   │   ├── team/                    # Leadership and team profiles
│   │   ├── terms/                   # Terms and conditions page
│   │   ├── work/                    # Case studies and portfolio
│   │   ├── globals.css              # Global styles & Tailwind layers
│   │   ├── layout.tsx               # Root HTML shell & metadata
│   │   └── page.tsx                 # Homepage entry point
│   ├── components/
│   │   ├── demo/                    # Enterprise demo modules & state shell
│   │   │   ├── modules/             # 12 interactive functional modules
│   │   │   ├── DemoContext.tsx      # Demo global state & mock store
│   │   │   ├── DemoShell.tsx        # Dashboard container
│   │   │   ├── DemoSidebar.tsx      # Collapsible navigation
│   │   │   ├── DemoTopbar.tsx       # Top search and notifications
│   │   │   └── mockData.ts          # Strictly fictional demo datasets
│   │   ├── home/
│   │   │   └── hero/                # Hero section & action CTAs
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # Global navbar with MSME badge
│   │   │   ├── Footer.tsx           # Footer with Trusted By, MSME & ISB
│   │   │   └── LoadingScreen.tsx    # GSAP preloader animation
│   │   └── ui/                      # Atoms (Button, Card, BrandedCursor, etc.)
│   └── data/
│       └── site.ts                  # Centralized business & navigation metadata
├── next.config.mjs                  # Security headers & 307 demo redirects
├── package.json                     # Project manifest and scripts
├── tailwind.config.ts               # Custom typography and palette extensions
└── tsconfig.json                    # TypeScript compiler configuration
```

---

## Getting Started & Local Development

### Prerequisites
- **Node.js**: `v18.17.0` or higher (Node.js 20+ recommended)
- **Package Manager**: `npm` (v9+) or `pnpm` / `yarn`
- **Git**: Installed and configured

### 1. Clone the Repository
```bash
git clone https://github.com/hemanthphani3-lang/setsuzoku-web.git
cd setsuzoku-web
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Linting
```bash
npm run lint
```

### 5. Production Build & Test
```bash
npm run build
npm run start
```

---

## Deployment Guide

### Vercel Deployment (Recommended)

1. **Connect Repository**:
   - Push your changes to GitHub: `git push origin main`.
   - Log into your [Vercel Dashboard](https://vercel.com/dashboard).
2. **Import Project**:
   - Ensure you are on your **Personal Account (Hobby)** scope (`hemanthphani3-lang`).
   - Click **Add New...** → **Project**.
   - Select `hemanthphani3-lang/setsuzoku-web`.
3. **Configure Project Settings**:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. **Environment Variables**:
   Add the following under **Project Settings → Environment Variables**:
   ```env
   NEXT_PUBLIC_SITE_URL=https://setsuzoku.in
   ```
5. **Domains**:
   - Assign production domains (`setsuzoku.in`, `www.setsuzoku.in`).
   - Automatic SSL certificates are provisioned via Let's Encrypt on Vercel Edge.

---

## Contact & Corporate Information

- **Company**: Setsuzoku LLP
- **Email**: [info@setsuzoku.in](mailto:info@setsuzoku.in)
- **Phone / WhatsApp**: [+91 90149 35073](tel:+919014935073)
- **LinkedIn**: [linkedin.com/company/setsuzoku](https://linkedin.com/company/setsuzoku)
- **Instagram**: [@setsuzoku_llp](https://instagram.com/setsuzoku_llp)
- **Registered Address**: Kakinada, Andhra Pradesh, 533001, India

---

© 2026 Setsuzoku LLP. All rights reserved.
