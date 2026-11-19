export interface StartingPriceItem {
  name: string;
  price: string;
  numericPrice: number;
  highlight?: boolean;
  description: string;
}

export interface WebsiteTypeItem {
  id: string;
  name: string;
  category: "Landing & Portfolio" | "Business & Corporate" | "E-Commerce" | "Web Apps & Platforms" | "Specialist & Content";
  priceRange: string;
  scope: string;
  deliverables: string[];
}

export interface PricingPackageItem {
  id: string;
  name: string;
  price: string;
  numericPrice: number;
  badge?: string;
  popular?: boolean;
  summary: string;
  features: string[];
  revisions: string;
  support: string;
  ctaText: string;
}

export interface AddOnServiceItem {
  name: string;
  priceRange: string;
  unit?: string;
  category: "Content & Design" | "Features & Integrations" | "SEO & Growth" | "Advanced";
}

export interface RecurringCostItem {
  item: string;
  cost: string;
  period: "year" | "month" | "at cost";
  type: "Infrastructure" | "Maintenance & Retainers" | "Third-Party";
}

export interface ProjectTimelineItem {
  projectType: string;
  duration: string;
  notes: string;
}

export interface CommercialTermSection {
  title: string;
  points: string[];
}

export const PRICING_HERO = {
  badge: "TRANSPARENT 2026 PRICING GUIDE",
  heading: "Website Development Pricing",
  subheading: "Clear packages. Transparent scope. Digital experiences built for growth.",
  disclaimer:
    "Displayed prices are starting estimates and planning benchmarks. Final quotations depend on exact project scope, integrations, content readiness, and agreed delivery timelines.",
};

export const STARTING_PRICES: StartingPriceItem[] = [
  {
    name: "Landing Page",
    price: "₹8,000",
    numericPrice: 8000,
    description: "High-impact single page engineered for product launches, ad campaigns, and direct conversion.",
  },
  {
    name: "Starter Business Website",
    price: "₹18,000",
    numericPrice: 18000,
    description: "Multi-page digital presence establishing credibility, brand authority, and customer inquiries.",
  },
  {
    name: "Professional Business Website",
    price: "₹30,000",
    numericPrice: 30000,
    highlight: true,
    description: "Tailored brand system with dedicated service offerings, lead capture flows, and performance SEO.",
  },
  {
    name: "E-commerce Store",
    price: "₹45,000",
    numericPrice: 45000,
    description: "Complete product catalogue, integrated payment gateway, cart, and automated checkout pipeline.",
  },
  {
    name: "Custom Web Application",
    price: "₹1,20,000",
    numericPrice: 120000,
    description: "Tailored database architecture, authenticated client portals, and role-based operational workflows.",
  },
];

export const WEBSITE_TYPES: WebsiteTypeItem[] = [
  {
    id: "landing-page",
    name: "Single-page landing page",
    category: "Landing & Portfolio",
    priceRange: "₹8,000–₹18,000",
    scope: "One conversion-focused page, responsive layout, CTA buttons, contact form or WhatsApp link, basic metadata",
    deliverables: ["Conversion-focused layout", "Responsive mobile-first design", "Contact form or WhatsApp CTA", "Basic metadata & OpenGraph"],
  },
  {
    id: "portfolio-creator",
    name: "Personal portfolio / creator",
    category: "Landing & Portfolio",
    priceRange: "₹12,000–₹25,000",
    scope: "3–5 pages or sections, bio, projects, testimonials, contact details, social links",
    deliverables: ["3–5 pages or sections", "Creator bio & project showcase", "Client testimonials", "Contact & social media links"],
  },
  {
    id: "starter-business",
    name: "Starter business / brochure",
    category: "Business & Corporate",
    priceRange: "₹18,000–₹30,000",
    scope: "Up to 5 pages, responsive design, contact form, WhatsApp, map/social links, basic on-page SEO",
    deliverables: ["Up to 5 pages", "Responsive design", "Contact form & WhatsApp link", "Location map & social links", "Basic on-page SEO"],
  },
  {
    id: "professional-business",
    name: "Professional business website",
    category: "Business & Corporate",
    priceRange: "₹30,000–₹60,000",
    scope: "Up to 8–10 pages, tailored visual system, service pages, lead capture, analytics setup, basic SEO",
    deliverables: ["Up to 8–10 pages", "Tailored visual identity", "Dedicated service pages", "Structured lead capture", "Analytics setup & basic SEO"],
  },
  {
    id: "corporate-brand",
    name: "Corporate / brand website",
    category: "Business & Corporate",
    priceRange: "₹50,000–₹1,20,000",
    scope: "Custom UI, 10–15 pages, case studies, team/careers, optional CMS, analytics and conversion tracking",
    deliverables: ["Custom bespoke UI", "10–15 pages", "Case studies & portfolio", "Team & careers directories", "Optional CMS & conversion tracking"],
  },
  {
    id: "school-education",
    name: "School / education website",
    category: "Specialist & Content",
    priceRange: "₹25,000–₹65,000",
    scope: "Admissions information, programmes, faculty, gallery, announcements, enquiry forms; parent portal priced separately",
    deliverables: ["Admissions & programme details", "Faculty profiles & campus gallery", "Notices & announcement boards", "Direct enquiry forms", "Parent portal priced separately"],
  },
  {
    id: "blog-content",
    name: "Blog / content website",
    category: "Specialist & Content",
    priceRange: "₹25,000–₹55,000",
    scope: "CMS, categories, search, article templates, author pages, basic SEO and share links",
    deliverables: ["CMS content management", "Taxonomies, categories & search", "Structured article templates", "Author bio pages", "Social sharing & on-page SEO"],
  },
  {
    id: "restaurant-booking",
    name: "Restaurant / service booking",
    category: "Specialist & Content",
    priceRange: "₹30,000–₹75,000",
    scope: "Services or menu, booking/enquiry flow, WhatsApp, location and opening hours; third-party booking fees extra",
    deliverables: ["Digital menu / services display", "Reservation / booking inquiry flow", "WhatsApp quick connect", "Location & operating hours", "Third-party booking fees extra"],
  },
  {
    id: "starter-ecommerce",
    name: "Starter e-commerce store",
    category: "E-Commerce",
    priceRange: "₹45,000–₹90,000",
    scope: "Product catalogue, cart, checkout, one payment gateway, basic shipping settings, order emails",
    deliverables: ["Curated product catalogue", "Shopping cart & checkout", "One payment gateway integration", "Basic shipping rate rules", "Automated transactional emails"],
  },
  {
    id: "growth-ecommerce",
    name: "Growth e-commerce store",
    category: "E-Commerce",
    priceRange: "₹90,000–₹2,00,000",
    scope: "Larger catalogue, filters, offers, merchandising, shipping/payment rules, reporting and integrations",
    deliverables: ["Expanded product catalogue", "Faceted filters & search", "Discount coupons & offers", "Advanced shipping/payment rules", "Analytics & inventory reporting"],
  },
  {
    id: "marketplace-directory",
    name: "Directory / multi-vendor marketplace",
    category: "Web Apps & Platforms",
    priceRange: "₹1,50,000–₹5,00,000+",
    scope: "Vendor accounts, listings, search/filter, commissions or booking flows; discovery required",
    deliverables: ["Vendor management accounts", "Public listings & geolocation filter", "Search & taxonomy filtering", "Booking or commission logic", "Discovery phase required"],
  },
  {
    id: "custom-web-app",
    name: "Custom web app / client portal",
    category: "Web Apps & Platforms",
    priceRange: "₹1,20,000–₹4,00,000+",
    scope: "Authentication, dashboards, role-based access, database and business workflows",
    deliverables: ["User authentication & security", "Custom client / admin dashboards", "Role-based access permissions", "Relational database schema", "Automated business workflows"],
  },
  {
    id: "saas-mvp",
    name: "SaaS MVP / subscription platform",
    category: "Web Apps & Platforms",
    priceRange: "₹2,50,000–₹8,00,000",
    scope: "Core product flow, accounts, dashboard, database, admin tools; billing and integrations scoped separately",
    deliverables: ["End-to-end core product flow", "User accounts & profile settings", "Interactive product dashboard", "Secure cloud database", "Admin control management"],
  },
];

export const RECOMMENDED_PACKAGES: PricingPackageItem[] = [
  {
    id: "launch",
    name: "Launch",
    price: "₹18,000",
    numericPrice: 18000,
    summary: "Essential, conversion-focused online launch for startups, consultants, and local businesses.",
    features: [
      "Up to 5 pages",
      "Responsive layout",
      "Contact form or WhatsApp CTA",
      "Basic SEO metadata",
    ],
    revisions: "2 revision rounds",
    support: "Launch support included",
    ctaText: "Select Launch Package",
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹35,000",
    numericPrice: 35000,
    badge: "MOST POPULAR",
    popular: true,
    summary: "Tailored design system and lead generation foundation built for expanding brands and businesses.",
    features: [
      "Up to 8 pages",
      "More tailored design",
      "Service and lead-generation pages",
      "Analytics setup",
      "Basic performance checks",
    ],
    revisions: "3 revision rounds",
    support: "14-day post-launch support",
    ctaText: "Select Growth Package",
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹65,000",
    numericPrice: 65000,
    badge: "MAXIMUM IMPACT",
    summary: "Bespoke digital architecture with CMS management, rich interactivity, and technical optimization.",
    features: [
      "Up to 12 pages",
      "Custom UI direction",
      "CMS for selected content",
      "Conversion-focused sections",
      "Analytics & tracking",
      "Basic technical SEO",
    ],
    revisions: "3 revision rounds",
    support: "14-day priority bug-fix support",
    ctaText: "Select Premium Package",
  },
  {
    id: "online-store",
    name: "Online Store",
    price: "₹55,000",
    numericPrice: 55000,
    badge: "E-COMMERCE READY",
    summary: "Turnkey digital storefront enabling direct-to-consumer sales, payment processing, and order emails.",
    features: [
      "Starter e-commerce setup",
      "Up to 25 products, loaded by the client",
      "Cart and checkout",
      "One payment gateway integration",
      "Basic shipping configuration",
    ],
    revisions: "3 revision rounds",
    support: "Store handover & 14-day support",
    ctaText: "Select Online Store",
  },
];

export const ADD_ON_SERVICES: AddOnServiceItem[] = [
  { name: "Extra standard page", priceRange: "₹2,000–₹4,000 per page", category: "Content & Design" },
  { name: "UI/UX design in Figma", priceRange: "₹8,000–₹35,000+", category: "Content & Design" },
  { name: "Copywriting", priceRange: "₹1,000–₹2,500 per page", category: "Content & Design" },
  { name: "Product entry", priceRange: "₹40–₹150 per product", category: "Content & Design" },
  { name: "Payment gateway integration", priceRange: "₹4,000–₹12,000", category: "Features & Integrations" },
  { name: "Booking or appointment flow", priceRange: "₹8,000–₹25,000", category: "Features & Integrations" },
  { name: "Login and user accounts", priceRange: "₹8,000–₹30,000", category: "Features & Integrations" },
  { name: "CMS setup", priceRange: "₹8,000–₹20,000", category: "Features & Integrations" },
  { name: "Basic on-page SEO", priceRange: "₹6,000–₹18,000", category: "SEO & Growth" },
  { name: "Analytics and conversion tracking", priceRange: "₹3,000–₹10,000", category: "SEO & Growth" },
  { name: "WhatsApp or CRM integration", priceRange: "₹5,000–₹20,000", category: "Features & Integrations" },
  { name: "AI chatbot or workflow automation", priceRange: "₹15,000–₹60,000+", category: "Advanced" },
  { name: "Website redesign", priceRange: "₹15,000–₹80,000+", category: "Advanced" },
  { name: "Additional language", priceRange: "₹8,000–₹25,000+", category: "Advanced" },
];

export const RECURRING_COSTS: RecurringCostItem[] = [
  { item: "Domain (.in / .com)", cost: "₹800–₹1,800 per year", period: "year", type: "Infrastructure" },
  { item: "Basic hosting", cost: "₹2,500–₹10,000 per year", period: "year", type: "Infrastructure" },
  { item: "Managed / high-performance hosting", cost: "₹10,000–₹40,000+ per year", period: "year", type: "Infrastructure" },
  { item: "Business email", cost: "₹1,500–₹8,000 per user per year", period: "year", type: "Infrastructure" },
  { item: "Basic maintenance", cost: "₹2,000–₹5,000 per month", period: "month", type: "Maintenance & Retainers" },
  { item: "Growth maintenance", cost: "₹6,000–₹15,000 per month", period: "month", type: "Maintenance & Retainers" },
  { item: "SEO retainer", cost: "₹8,000–₹25,000+ per month", period: "month", type: "Maintenance & Retainers" },
  { item: "Digital marketing management", cost: "₹8,000–₹30,000+ per month", period: "month", type: "Maintenance & Retainers" },
  { item: "Paid plugins, SaaS, and API usage", cost: "Charged at provider cost", period: "at cost", type: "Third-Party" },
];

export const PROJECT_TIMELINES: ProjectTimelineItem[] = [
  {
    projectType: "Landing page",
    duration: "1–2 weeks",
    notes: "Focused sprint for copy, responsive UI design, CTA integration, and deployment.",
  },
  {
    projectType: "Multi-page business website",
    duration: "2–5 weeks",
    notes: "Complete architecture spanning service pages, company story, lead capture, and performance testing.",
  },
  {
    projectType: "E-commerce website",
    duration: "3–8 weeks",
    notes: "Catalogue modeling, gateway integrations, shipping rules, order workflows, and checkout security validation.",
  },
  {
    projectType: "Custom platforms & web apps",
    duration: "Several weeks to months",
    notes: "Iterative milestone delivery for database schemas, role permissions, custom UI flows, and system integration.",
  },
];

export const COMMERCIAL_TERMS: CommercialTermSection[] = [
  {
    title: "Payment Schedule",
    points: [
      "50% advance to initiate project discovery and wireframing.",
      "30% after design approval or a working prototype milestone.",
      "20% before final production handover, domain linkage, or launch.",
    ],
  },
  {
    title: "Taxes & Billing",
    points: [
      "Displayed prices exclude GST.",
      "GST will be added to official tax invoices where legally applicable.",
    ],
  },
  {
    title: "Client Responsibilities",
    points: [
      "The client supplies approved text, high-resolution logos, brand imagery, product data, legal policies, and required account access unless those services are formally included in the agreed scope.",
    ],
  },
  {
    title: "Exclusions",
    points: [
      "Domain and hosting renewals, paid third-party themes and plugins, business email subscriptions, payment gateway transaction fees, advertising spend, professional photography, copywriting, bulk data entry, translations, and external API charges.",
      "Some exclusions may be scoped and included through a separately agreed quotation.",
    ],
  },
  {
    title: "Revision Policy",
    points: [
      "Each package includes the explicitly designated number of revision rounds.",
      "Additional features, major structural redesigns, or changes requested after milestone sign-off are billed separately.",
    ],
  },
  {
    title: "Post-Launch Support",
    points: [
      "Includes 14 days of dedicated bug-fix support for the delivered scope post-launch.",
      "Ongoing updates, continuous feature additions, and platform maintenance are handled under separate monthly retainers.",
    ],
  },
  {
    title: "Code & Deliverable Ownership",
    points: [
      "Final deliverables, access credentials, and code repositories are handed over upon full payment clearance, subject to third-party software licences and agreed contract terms.",
    ],
  },
  {
    title: "Quotation Validity",
    points: [
      "Suggested benchmark prices remain valid for 30 days from presentation, subject to technical discovery and changes in project scope.",
    ],
  },
];
