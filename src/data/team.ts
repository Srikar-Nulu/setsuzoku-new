export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  hierarchyLevel: "founder" | "coordination" | "development" | "marketing-design";
  section: string;
  secondaryRole?: string;
  bio: string;
  longBio: string;
  email?: string;
  linkedin?: string;
  github?: string;
  expertise?: string[];
  initials: string;
  avatarColor: string;
  avatar?: string;
  featuredProjects?: string[];
}

export const teamData: TeamMember[] = [
  // LEVEL 1 — FOUNDER
  {
    slug: "uma-krishna-kanth-chokkapu",
    name: "Uma Krishna Kanth Chokkapu",
    role: "Founder",
    hierarchyLevel: "founder",
    section: "Founder",
    bio: "Founder of Setsuzoku LLP. Leading technical vision, digital solution strategy, and innovation for an Edu Alt Tech company.",
    longBio:
      "Uma Krishna Kanth Chokkapu is the Founder of Setsuzoku LLP. He guides the company's vision in bridging education, alternate technologies, and digital solutions. Under his leadership, Setsuzoku LLP delivers high-impact Websites, Applications, and Digital Solutions.",
    email: "info@setsuzoku.in",
    linkedin: "https://linkedin.com/company/setsuzoku",
    expertise: ["Company Leadership", "Edu Alt Tech Strategy", "Software Architecture", "Digital Solutions"],
    initials: "UK",
    avatarColor: "bg-blue-600",
    avatar: "/team/uma-krishna-kanth-chokkapu.jpg",
  },

  // LEVEL 2 — PROJECT COORDINATION & LEADERSHIP
  {
    slug: "t-srinivas",
    name: "T. Srinivas",
    role: "Project Coordinator",
    hierarchyLevel: "coordination",
    section: "Project Coordination & Leadership",
    bio: "Project Coordinator facilitating cross-functional workflows, milestone execution, and project synchronization.",
    longBio:
      "T. Srinivas serves as Project Coordinator at Setsuzoku, managing project workflows, milestone execution, and cross-functional synchronization across engineering teams.",
    email: "thaladasrinivas2006@gmail.com",
    linkedin: "https://www.linkedin.com/in/srinivas-thalada-733193305",
    expertise: ["Project Coordination", "Milestone Tracking", "Agile Execution", "Workflow Synchronization"],
    initials: "TS",
    avatarColor: "bg-indigo-600",
    avatar: "/team/t-srinivas.jpg",
  },
  {
    slug: "v-ranadeep",
    name: "V. Ranadeep",
    role: "Project Coordinator and Client Relations",
    hierarchyLevel: "coordination",
    section: "Project Coordination & Leadership",
    bio: "Project Coordinator and Client Relations lead overseeing delivery timelines and client communications.",
    longBio:
      "V. Ranadeep coordinates project lifecycles and client relations at Setsuzoku, aligning client requirements with agile technical execution and delivery milestones.",
    email: "viranadeep@gmail.com",
    linkedin: "https://www.linkedin.com/in/ranadeepvinukonda/",
    expertise: ["Client Relations", "Project Coordination", "Requirement Scoping", "Timeline Management"],
    initials: "VR",
    avatarColor: "bg-cyan-600",
    avatar: "/team/v-ranadeep.jpg",
  },
  {
    slug: "mohammed-al-rihab-chandhini",
    name: "Mohammed Al Rihab Chandhini",
    role: "Project Coordinator",
    secondaryRole: "AI Development",
    hierarchyLevel: "coordination",
    section: "Project Coordination & Leadership",
    bio: "Project Coordinator managing delivery workflows and timelines, also contributing to AI development.",
    longBio:
      "Mohammed Al Rihab Chandhini serves as Project Coordinator at Setsuzoku, guiding delivery workflows and timeline execution while actively contributing to AI development initiatives.",
    email: "alrihabchandhinimohammed@gmail.com",
    linkedin: "https://www.linkedin.com/in/al-rihab-chandhini-mohammed-745160296",
    expertise: ["Project Coordination", "AI Development", "Workflow Automation", "Technical Planning"],
    initials: "MC",
    avatarColor: "bg-emerald-600",
    avatar: "/team/mohammed-al-rihab-chandhini.jpg",
  },

  // LEVEL 3 — DEVELOPMENT & ENGINEERING
  {
    slug: "akula-venkata-surya-satyanarayana",
    name: "Akula Venkata Surya Satyanarayana",
    role: "Full Stack Developer",
    hierarchyLevel: "development",
    section: "Development & Engineering",
    bio: "Full Stack Developer building end-to-end web applications, modern interfaces, and scalable backend services.",
    longBio:
      "Akula Venkata Surya Satyanarayana is a Full Stack Developer at Setsuzoku, engineering reliable web architectures, responsive frontend interfaces, and server-side components.",
    email: "akulasatyanarayanaa2@gmail.com",
    linkedin: "https://www.linkedin.com/in/satyanarayana-akula-785565304",
    expertise: ["Full Stack Development", "Web Architectures", "Modern UI", "Backend Services"],
    initials: "AS",
    avatarColor: "bg-blue-600",
    avatar: "/team/akula-venkata-surya-satyanarayana.jpg",
  },
  {
    slug: "sri-varun-tej-chavitina",
    name: "Sri Varun Tej Chavitina",
    role: "Full Stack Developer",
    hierarchyLevel: "development",
    section: "Development & Engineering",
    bio: "Full Stack Developer focused on high-performance web applications, API integrations, and modern frontend systems.",
    longBio:
      "Sri Varun Tej Chavitina is a Full Stack Developer at Setsuzoku, specializing in building performant digital applications, responsive web interfaces, and backend services.",
    email: "chavithinavaruntej@gmail.com",
    linkedin: "https://www.linkedin.com/in/sri-varun-tej/",
    expertise: ["Full Stack Systems", "API Integrations", "Frontend Architecture", "Web Applications"],
    initials: "ST",
    avatarColor: "bg-teal-600",
    avatar: "/team/sri-varun-tej-chavitina.jpg",
  },
  {
    slug: "bhimavarapu-hemanth",
    name: "Bhimavarapu Hemanth",
    role: "Full Stack Developer",
    hierarchyLevel: "development",
    section: "Development & Engineering",
    bio: "Full Stack Developer engineering clean software architectures, responsive user experiences, and web applications.",
    longBio:
      "Bhimavarapu Hemanth is a Full Stack Developer at Setsuzoku, responsible for implementing responsive web features, system components, and full-stack web solutions.",
    email: "hemanthphani3@gmail.com",
    linkedin: "https://www.linkedin.com/in/bhimavarapu-hemanth-a1255932a/",
    expertise: ["Full Stack Development", "Responsive UI", "Web Applications", "System Integration"],
    initials: "BH",
    avatarColor: "bg-violet-600",
    avatar: "/team/bhimavarapu-hemanth.jpg",
  },
  {
    slug: "t-harshitha",
    name: "T. Harshitha",
    role: "Frontend Developer",
    hierarchyLevel: "development",
    section: "Development & Engineering",
    bio: "Frontend Developer crafting clean, responsive user interfaces and accessible web experiences.",
    longBio:
      "T. Harshitha is a Frontend Developer at Setsuzoku, focused on building accessible client-side components, responsive web designs, and modern user experiences.",
    email: "harshithatumbali2007@gmail.com",
    linkedin: "https://www.linkedin.com/in/harshitha-tumbali-a9b0702a1",
    expertise: ["Frontend Engineering", "Responsive Design", "UI Components", "Accessibility"],
    initials: "TH",
    avatarColor: "bg-rose-600",
    avatar: "/team/t-harshitha.jpg",
  },
  {
    slug: "gnana-sri-lakshmi-bathina",
    name: "Gnana Sri Lakshmi Bathina",
    role: "Frontend Developer",
    hierarchyLevel: "development",
    section: "Development & Engineering",
    bio: "Frontend Developer developing responsive, intuitive web layouts and interactive digital interfaces.",
    longBio:
      "Gnana Sri Lakshmi Bathina is a Frontend Developer at Setsuzoku, dedicated to delivering clean, user-centered web interfaces and responsive layouts.",
    linkedin: "https://www.linkedin.com/in/gnana-sri-lakshmi-bathina-5598773a3/",
    expertise: ["Frontend Development", "Component Design", "Responsive Layouts", "Modern Web UI"],
    initials: "GB",
    avatarColor: "bg-amber-600",
    avatar: "/team/gnana-sri-lakshmi-bathina.jpg",
  },
  {
    slug: "v-radha-swamy-naidu",
    name: "V. Radha Swamy Naidu",
    role: "Edu Tech",
    hierarchyLevel: "development",
    section: "Development & Engineering",
    bio: "Edu Tech specialist focused on educational technology solutions, interactive digital learning systems, and tech integrations.",
    longBio:
      "V. Radha Swamy Naidu works on educational technology solutions at Setsuzoku, specializing in interactive digital learning systems, educational tools, and technical integrations.",
    email: "naiduvrs096@gmail.com",
    expertise: ["Edu Tech Solutions", "Digital Learning Systems", "Educational Tools", "Tech Integration"],
    initials: "RN",
    avatarColor: "bg-cyan-600",
    avatar: "/team/v-radha-swamy-naidu.jpg",
  },

  // LEVEL 4 — MARKETING, DESIGN & CLIENT RELATIONS
  {
    slug: "avinash",
    name: "Avinash",
    role: "Marketing & Graphic Designer",
    hierarchyLevel: "marketing-design",
    section: "Marketing, Design & Client Relations",
    bio: "Marketing and graphic designer crafting visual brand collateral and digital design assets.",
    longBio:
      "Avinash specializes in marketing and graphic design at Setsuzoku, developing brand collateral, creative visuals, and promotional design assets.",
    expertise: ["Marketing Design", "Brand Collateral", "Visual Graphics", "Digital Assets"],
    initials: "AV",
    avatarColor: "bg-purple-600",
    avatar: "/team/avinash.jpg",
  },
  {
    slug: "priya",
    name: "Priya",
    role: "Graphic Designer",
    hierarchyLevel: "marketing-design",
    section: "Marketing, Design & Client Relations",
    bio: "Graphic Designer designing visual identities, illustrations, and brand graphics.",
    longBio:
      "Priya is a Graphic Designer at Setsuzoku, creating digital illustrations, visual brand assets, and creative design materials for web products.",
    expertise: ["Graphic Design", "Visual Identity", "Illustrations", "Creative Layouts"],
    initials: "PR",
    avatarColor: "bg-pink-600",
    avatar: "/team/priya.jpg",
  },
  {
    slug: "gani",
    name: "Gani",
    role: "Digital Marketing",
    hierarchyLevel: "marketing-design",
    section: "Marketing, Design & Client Relations",
    bio: "Digital marketing specialist focused on online visibility, outreach strategies, and brand growth.",
    longBio:
      "Gani handles digital marketing at Setsuzoku, overseeing online campaign strategy, digital presence, and audience engagement.",
    expertise: ["Digital Marketing", "Online Outreach", "Brand Visibility", "Growth Strategy"],
    initials: "GA",
    avatarColor: "bg-emerald-600",
    avatar: "/team/gani.jpg",
  },
  {
    slug: "srujan-dasari",
    name: "Srujan Dasari",
    role: "Client Relations",
    hierarchyLevel: "marketing-design",
    section: "Marketing, Design & Client Relations",
    bio: "Client relations specialist managing partnerships, client communication channels, and relationship management.",
    longBio:
      "Srujan Dasari manages client relations at Setsuzoku, ensuring seamless client communication, relationship building, and stakeholder satisfaction.",
    linkedin: "https://www.linkedin.com/in/srujan-dasari-7a94263ab/",
    expertise: ["Client Relations", "Stakeholder Communication", "Relationship Management", "Partnerships"],
    initials: "SD",
    avatarColor: "bg-sky-600",
    avatar: "/team/srujan-dasari.jpg",
  },
];
