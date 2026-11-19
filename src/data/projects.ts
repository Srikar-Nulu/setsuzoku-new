export interface ProjectItem {
  slug: string;
  name: string;
  client?: string;
  category: "Websites" | "Applications" | "UI/UX" | "Branding" | "Design" | "Digital Solutions";
  categoryLabel: string;
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  capabilities: string[];
  technologies: string[];
  websiteUrl: string;
  featured: boolean;
  image?: string;
  logoPlaceholder?: string;
}

export const projectsData: ProjectItem[] = [
  {
    slug: "joyschool",
    name: "JoySchool",
    client: "JoySchool",
    category: "Websites",
    categoryLabel: "Websites",
    description:
      "A digital platform for JoySchool, presented through its dedicated website.",
    longDescription:
      "A digital platform for JoySchool, presenting its educational identity, academic curriculum from Nursery to Class 10 under the State Board, holistic development programs, campus events, and admissions enquiries.",
    challenge:
      "The institution required an accessible, structured digital platform to showcase its academic programs and campus life while enabling prospective parents to submit admissions enquiries seamlessly.",
    solution:
      "Developed a fast, mobile-friendly web platform featuring structured academic program overviews, campus activities, leadership insights, and direct parent enquiry workflows.",
    capabilities: [
      "Academic Programs Presentation (Nursery to Class 10)",
      "Admissions & Online Enquiry Workflow",
      "Campus Activities & Holistic Learning Showcase",
      "Responsive Cross-Device Architecture",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    websiteUrl: "https://www.joyschool.online/",
    featured: true,
    logoPlaceholder: "JS",
  },
  {
    slug: "genesis-education-website",
    name: "Genesis Education Website",
    client: "Genesis International Montessori and STEM School",
    category: "Websites",
    categoryLabel: "Websites",
    description:
      "A dedicated website for Genesis International Montessori and STEM School, presenting the school's educational identity and online presence.",
    longDescription:
      "A dedicated website for Genesis International Montessori and STEM School, establishing the school's educational identity, nurturing early-childhood learning environment for ages 1.0–6.0, and admissions information.",
    challenge:
      "Communicating the school's Montessori and STEM educational philosophy through an engaging, approachable online presence tailored for prospective families.",
    solution:
      "Built a modern, responsive website highlighting the school's educational approach, early learning programs, campus environment, and admissions guidance.",
    capabilities: [
      "Montessori & STEM Educational Identity",
      "Early Childhood Programs Overview (Ages 1.0–6.0)",
      "Admissions Information & Parent Enquiries",
      "Clean Responsive Web Interface",
    ],
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    websiteUrl: "https://www.genesisedu.in/",
    featured: true,
    logoPlaceholder: "GE",
  },
  {
    slug: "genesis-lms",
    name: "Genesis LMS",
    client: "Genesis",
    category: "Applications",
    categoryLabel: "Applications",
    description:
      "An education-focused application branded Genesis, with the tagline \"Learn • Lead • Achieve.\"",
    longDescription:
      "An education-focused web application branded Genesis with the tagline \"Learn • Lead • Achieve,\" engineered as an interactive digital application interface for learning and educational workflows.",
    challenge:
      "Providing a clean, accessible web application interface designed for digital learning workflows, structured onboarding, and responsive usability.",
    solution:
      "Engineered a responsive web application providing branded onboarding, structured navigation, and high-performance cross-device application usability.",
    capabilities: [
      "Web-Based Educational Application Architecture",
      "Branded Onboarding & Interface Experience",
      "Interactive Learning Application Workflows",
      "Responsive Cross-Device Usability",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    websiteUrl: "https://genesis-frontend-teal.vercel.app/",
    featured: true,
    logoPlaceholder: "GL",
  },
  {
    slug: "mamasparsh-preschool-website",
    name: "MamaSparsh Preschool Website",
    client: "MamaSparsh Preschool",
    category: "Websites",
    categoryLabel: "Websites",
    description:
      "A preschool and early-learning website showcasing programs, curriculum, activity-based learning, school experiences, admissions information, and parent enquiries.",
    longDescription:
      "A preschool and early-learning website showcasing age-appropriate programs (Play Group to UKG), nature-inspired curriculum, activity-based learning, school experiences, admissions information, and parent tour bookings.",
    challenge:
      "Communicating the preschool's nature-inspired learning philosophy, daily routines, and curriculum while providing parents with easy tour booking and enquiry options.",
    solution:
      "Crafted an interactive, child-centric website featuring Early Years program details, activity highlights, campus adventures, tour scheduling, and enquiry workflows.",
    capabilities: [
      "Early Years Programs Showcase (Play Group to UKG)",
      "School Tour Booking & Admissions Enquiries",
      "Activity-Based Learning & Campus Adventures",
      "Nature-Inspired Visual Identity & Responsive UI",
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    websiteUrl: "https://www.mamasparshschool.in/",
    featured: true,
    logoPlaceholder: "MS",
  },
  {
    slug: "edualttech",
    name: "EduAltTech — Alternative Education & Mentor-Guided Learning Platform",
    client: "Edu-Alt-Tech",
    category: "Digital Solutions",
    categoryLabel: "Digital Solutions",
    description:
      "An alternative education and mentor-guided learning platform designed around peer-to-peer teaching, mentor-guided accountability, and assistive AI.",
    longDescription:
      "An alternative education and mentor-guided learning platform designed around peer-to-peer teaching, mentor-guided accountability, and assistive AI to bridge the execution gap in skill development.",
    challenge:
      "Bridging the execution gap in digital education by replacing passive video-watching with mentor-guided accountability and peer-to-peer collaborative learning models.",
    solution:
      "Architected a comprehensive digital learning solution combining interactive peer-to-peer teaching structures, mentor accountability mechanisms, and assistive AI tools.",
    capabilities: [
      "Alternative Education Platform Architecture",
      "Mentor-Guided Accountability Framework",
      "Peer-to-Peer Teaching Structures",
      "Assistive AI Integration",
    ],
    technologies: ["React", "JavaScript", "Supabase", "Tailwind CSS"],
    websiteUrl: "https://edu-alt-redev.vercel.app/",
    featured: true,
    logoPlaceholder: "EA",
  },
];
