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
    role: "Senior Product Designer",
    company: "Studio Warp",
    period: "2023 - Present",
    desc: "Leading design systems and interaction patterns for global fintech clients."
  },
  {
    role: "UI/UX Designer",
    company: "Neo Agency",
    period: "2021 - 2023",
    desc: "Crafted award-winning marketing sites and mobile applications."
  }
];

export const SKILLS: string[] = [
  "Figma", "Prototyping", "Design Systems", "Webflow", "React/Next.js", "Motion (GSAP)"
];