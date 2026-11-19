export interface ServiceItem {
  slug: string;
  title: string;
  shortDescription: string;
  heroHeadline: string;
  iconName: string;
  overview: string;
  whatWeBuild: string[];
  problemsWeSolve: string[];
  developmentApproach: string[];
  capabilities: { title: string; description: string }[];
}

export const servicesData: ServiceItem[] = [
  {
    slug: "websites",
    title: "Websites",
    shortDescription: "Modern, responsive websites designed to establish a strong digital presence.",
    heroHeadline: "Modern websites designed for impact and performance.",
    iconName: "Websites",
    overview:
      "We design and engineer bespoke, high-performance websites that establish your brand presence, communicate value clearly, and drive engagement. From corporate web platforms to interactive product landing pages.",
    whatWeBuild: [
      "Corporate & Enterprise Websites",
      "Interactive Product Landing Pages",
      "Responsive Web Experiences",
      "SEO-Optimized Web Architecture",
      "Content Management System (CMS) Integration",
      "High-Performance Web Applications",
    ],
    problemsWeSolve: [
      "Replacing outdated, slow, or non-responsive websites",
      "Improving brand credibility and digital conversion rates",
      "Optimizing load speeds and search engine rankings (SEO)",
      "Unifying brand storytelling across web touchpoints",
    ],
    developmentApproach: [
      "Component-Driven Frontend Architecture",
      "Mobile-First & Responsive Layouts",
      "Performance & Core Web Vitals Optimization",
      "Accessibility & SEO Best Practices",
    ],
    capabilities: [
      {
        title: "Enterprise Websites",
        description: "Custom digital platforms designed to reflect brand authority and engage global audiences.",
      },
      {
        title: "High-Converting Landing Pages",
        description: "Purpose-built, fast-loading web pages engineered for product launches and lead generation.",
      },
      {
        title: "Performance Optimization",
        description: "Ultra-fast page loads, optimized assets, and modern web vitals engineering.",
      },
      {
        title: "Content & CMS Architecture",
        description: "Empowering teams with flexible, structured content management setups.",
      },
    ],
  },
  {
    slug: "applications",
    title: "Applications",
    shortDescription: "Purpose-built applications designed around real business and user needs.",
    heroHeadline: "Purpose-built applications engineered for scale.",
    iconName: "Applications",
    overview:
      "We engineer custom web and mobile applications tailored to unique operational rules and user requirements. Delivering fluid 60fps performance, offline resilience, and cloud synchronization.",
    whatWeBuild: [
      "Cross-Platform iOS & Android Applications",
      "Web Applications & SaaS Platforms",
      "Operational & Field Management Apps",
      "Enterprise Mobility Solutions",
      "Cloud-Connected Application Architectures",
      "Secure Customer & Vendor Portals",
    ],
    problemsWeSolve: [
      "Eliminating fragmented legacy tools with purpose-built applications",
      "Building seamless cross-platform experiences across web and mobile",
      "Handling offline states and background data sync reliably",
      "Scaling architecture to handle high concurrent usage",
    ],
    developmentApproach: [
      "Domain-Driven Architecture & Clean Code",
      "Cross-Platform & Native Technologies",
      "Offline-First Data Caching & Sync",
      "Automated Testing & Continuous Delivery",
    ],
    capabilities: [
      {
        title: "Product Experience",
        description: "Intuitive touch interactions, fluid animations, and gesture-driven native application interfaces.",
      },
      {
        title: "Performance & Resilience",
        description: "Instant responsiveness, local caching, and background synchronization under spotty connectivity.",
      },
      {
        title: "Integrations & APIs",
        description: "Seamless connections to payment gateways, push notification networks, and cloud backend microservices.",
      },
      {
        title: "Deployment & Support",
        description: "End-to-end management of app deployments, store compliance, and continuous monitoring.",
      },
    ],
  },
  {
    slug: "ui-ux",
    title: "UI/UX",
    shortDescription: "Intuitive interfaces and thoughtful user experiences that make products easier to use.",
    heroHeadline: "Intuitive interfaces designed for seamless user experiences.",
    iconName: "UI/UX",
    overview:
      "Great software starts with thoughtful design. We craft human-centered user interfaces and seamless experience journeys that simplify complex workflows and delight users.",
    whatWeBuild: [
      "User Interface (UI) Design Systems",
      "User Experience (UX) Architecture & Wireframes",
      "Interactive Prototypes & Micro-Interactions",
      "Customer Journey Mapping & User Flows",
      "Design System Component Libraries",
      "Usability Audits & Interface Redesigns",
    ],
    problemsWeSolve: [
      "Simplifying complex business logic into clear, usable interface designs",
      "Reducing user drop-off and friction across digital workflows",
      "Establishing visual consistency across web and mobile platforms",
      "Accelerating engineering handoffs with reusable design tokens",
    ],
    developmentApproach: [
      "Human-Centered Design Methodology",
      "Iterative Wireframing & Interactive Prototyping",
      "Comprehensive Design Tokens & Component Libraries",
      "Accessibility & Contrast Standards (WCAG)",
    ],
    capabilities: [
      {
        title: "Interface Architecture",
        description: "Clean layout visual hierarchies, typography systems, and modern component design.",
      },
      {
        title: "Experience Research",
        description: "Mapping user intent, behavioral patterns, and friction points to craft effortless interaction flows.",
      },
      {
        title: "Interactive Micro-Interactions",
        description: "Adding refined hover states, motion feedback, and tactile micro-animations.",
      },
      {
        title: "Design Systems",
        description: "Scalable design token libraries that harmonize product development across teams.",
      },
    ],
  },
  {
    slug: "branding",
    title: "Branding",
    shortDescription: "Distinctive visual identities that help businesses build recognition and trust.",
    heroHeadline: "Distinctive visual identities that build recognition and trust.",
    iconName: "Branding",
    overview:
      "We define and shape compelling visual identities that position your company for market leadership. Creating memorable brand assets, logos, typography, and visual guidelines.",
    whatWeBuild: [
      "Brand Identity Systems & Guidelines",
      "Logo Mark Design & Visual Assets",
      "Brand Typography & Color Palettes",
      "Corporate Stationery & Collateral",
      "Digital Brand Experience Assets",
      "Brand Positioning & Messaging Systems",
    ],
    problemsWeSolve: [
      "Differentiating your brand in competitive technology markets",
      "Eliminating fragmented brand visuals across marketing and product",
      "Establishing immediate trust and credibility with clients",
      "Creating scalable visual guidelines for expanding teams",
    ],
    developmentApproach: [
      "Research-Driven Brand Positioning",
      "Vector Precision & Geometric Typography",
      "Harmonious Color Systems & Accessible Contrast",
      "Comprehensive Brand Style Documentation",
    ],
    capabilities: [
      {
        title: "Visual Identity Systems",
        description: "Complete visual frameworks that articulate your business values and market presence.",
      },
      {
        title: "Logo Design & Geometry",
        description: "Iconic, timeless logo marks crafted with mathematical balance and clarity.",
      },
      {
        title: "Brand Guidelines",
        description: "Detailed documentation for logo usage, color palettes, typography, and media layouts.",
      },
      {
        title: "Digital Brand Assets",
        description: "Optimized brand graphics for web platforms, presentation decks, and social presence.",
      },
    ],
  },
  {
    slug: "design",
    title: "Design",
    shortDescription: "Purposeful digital and visual design that turns ideas into polished experiences.",
    heroHeadline: "Purposeful digital design turned into polished experiences.",
    iconName: "Design",
    overview:
      "We deliver versatile digital and graphic design services that bridge creative vision and technical precision. From custom illustrations to marketing graphics and digital product design.",
    whatWeBuild: [
      "Digital Product Graphic Design",
      "Marketing & Communication Graphics",
      "Vector Illustrations & Custom Icons",
      "Presentation Decks & Pitch Materials",
      "Digital Campaign Visuals",
      "Interactive UI Component Assets",
    ],
    problemsWeSolve: [
      "Translating abstract technology concepts into visual graphics",
      "Elevating digital collateral to match premium software quality",
      "Delivering versatile vector graphics optimized for all screens",
      "Maintaining design consistency across product marketing",
    ],
    developmentApproach: [
      "Purposeful Vector & Raster Composition",
      "Modern Grid Systems & Alignment Rules",
      "Optimized Asset Exports (SVG, WebP)",
      "High-Fidelity Visual Craftsmanship",
    ],
    capabilities: [
      {
        title: "Product Design",
        description: "Polished visual elements that integrate directly into modern web and mobile applications.",
      },
      {
        title: "Vector Illustration",
        description: "Bespoke icons, diagrams, and technical illustrations tailored to your brand identity.",
      },
      {
        title: "Pitch & Presentation Design",
        description: "Compelling visual decks engineered for investor presentations and executive briefings.",
      },
      {
        title: "Digital Assets",
        description: "Clean, high-resolution media tailored for modern digital distribution.",
      },
    ],
  },
  {
    slug: "digital-solutions",
    title: "Digital Solutions",
    shortDescription: "Custom technology solutions that help businesses streamline, improve, and grow.",
    heroHeadline: "Custom technology solutions to streamline and grow your business.",
    iconName: "Digital Solutions",
    overview:
      "As an Edu Alt Tech Company, we engineer tailored technology solutions, business process automations, AI workflows, and digital infrastructure to streamline operations and unlock sustainable growth.",
    whatWeBuild: [
      "Edu & Alt Tech Learning Platforms",
      "Custom Workflow Automation Pipelines",
      "Enterprise System Integrations & APIs",
      "AI-Powered Knowledge & Automation Engines",
      "Digital Infrastructure & Cloud Migrations",
      "Custom Business Management Architectures",
    ],
    problemsWeSolve: [
      "Eliminating manual data entry and disconnected software tools",
      "Modernizing legacy operations into cloud-native digital workflows",
      "Integrating practical AI & automation directly into existing systems",
      "Scaling business infrastructure smoothly to support organizational growth",
    ],
    developmentApproach: [
      "Domain-Driven Architecture & Cloud Engineering",
      "Resilient Middleware & Event-Driven Automations",
      "Security-First & Compliance Standards",
      "Phased Modernization & Zero-Downtime Deployment",
    ],
    capabilities: [
      {
        title: "Edu Alt Tech Platforms",
        description: "Specialized technology architectures for education, alternative learning, and skill platforms.",
      },
      {
        title: "Business Automation",
        description: "Automating repetitive workflows and bridging disconnected business software into fluid pipelines.",
      },
      {
        title: "System Integration",
        description: "Unifying databases, APIs, payment systems, and operations into a single cohesive platform.",
      },
      {
        title: "Cloud & AI Solutions",
        description: "Practical artificial intelligence workflows and cloud infrastructure designed for reliability.",
      },
    ],
  },
];
