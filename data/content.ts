import { Project, Experience, Skill } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Sanora Wear",
    category: "E-Commerce / UI/UX",
    description: "Redefining the digital storefront for a premium sustainable fashion brand. Focused on textural depth and seamless checkout flow.",
    year: "2025",
    image: "https://picsum.photos/id/103/1600/1200",
  },
  {
    id: 2,
    title: "Factory Flow",
    category: "SaaS / Product Design",
    description: "A comprehensive dashboard for manufacturing logistics. Simplifying complex data into actionable bento-grid insights.",
    year: "2024",
    image: "https://picsum.photos/id/180/1600/1200",
  },
  {
    id: 3,
    title: "Travlo",
    category: "Mobile App",
    description: "AI-powered travel companion. Immersive localized discovery with zero-friction booking experience.",
    year: "2024",
    image: "https://picsum.photos/id/214/1600/1200",
  },
  {
    id: 4,
    title: "Balance",
    category: "Fintech",
    description: "Personal finance reimagined. Soft gradients and neomorphism to reduce anxiety around money management.",
    year: "2023",
    image: "https://picsum.photos/id/48/1600/1200",
  }
];

export const EXPERIENCE: Experience[] = [
  {
    role: "App Developer Intern",
    company: "Remote Startup",
    period: "2025 - Present",
    desc: "Building mobile experiences that matter. Shipping features at startup speed."
  },
  {
    role: "Freelance Developer",
    company: "Self-Employed",
    period: "2024 - Present",
    desc: "Web & mobile development for clients across productivity, healthcare, and education."
  }
];

export const SKILLS: string[] = [
  "React", "React Native", "TypeScript", "JavaScript", "Node.js", "Python",
  "DSA", "System Design", "Figma", "Firebase", "Git"
];