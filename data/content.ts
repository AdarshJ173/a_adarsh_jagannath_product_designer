import { Project, Experience, Skill } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Oryan",
    category: "AI / Productivity",
    description: "Every Sunday, AI reads your week. Monday, you know exactly what to fix. Oryan is your personal execution OS, reading your thoughts, journals, and notes to tell you the truth about your week.",
    year: "2025",
    image: "/assets/oryan.png",
    link: "https://oryan.in",
  },
  {
    id: 2,
    title: "Kami",
    category: "AI / WebGPU",
    description: "A local-first, privacy-focused personal AI companion that runs entirely on-device using WebGPU. Built with a 7-layer memory architecture to capture, consolidate, and retrieve your memories over time.",
    year: "2025",
    image: "/assets/mykami.png",
    link: "https://mykami.in",
  },
  {
    id: 3,
    title: "EmpathAI",
    category: "Mental Health / UI/UX",
    description: "A mental health web application where you can express yourself freely. It truly listens, understands you deeply, and remembers every conversation—even the smallest details—across sessions. Supporting OCD and emotional wellbeing.",
    year: "2025",
    image: "/assets/empathAi.png",
    video: "/assets/empathAIVideo.mp4",
    link: "https://empath-ai-omega.vercel.app",
  },
  {
    id: 4,
    title: "Evolve",
    category: "AI / EdTech",
    description: "A personalized AI learning platform that helps students truly understand instead of just copy-pasting. Using Socratic questioning methods, Evolve makes you think and learn rather than overwhelming you with information dumps.",
    year: "2025",
    image: "/assets/evolve.png",
    link: "https://evolve-xi.vercel.app/",
  },
  {
    id: 5,
    title: "Infinity Canvas",
    category: "AI Agent / EdTech",
    description: "An infinite canvas AI agent inspired by the human brain. Every thought connects like neurons—learn from videos, websites, documents, and images, then retrieve and apply that knowledge anytime, anywhere. Context-aware, personalized, and deeply interconnected.",
    year: "2025",
    image: "/assets/infinityCanvas.png",
    status: "Under Development",
  },
  {
    id: 6,
    title: "Most Valuable Co",
    category: "E-Commerce / Freelance",
    description: "A premium e-commerce website built for an Australian client via Fiverr. Crafted with meticulous attention to UI/UX, delivering an elevated shopping experience with a luxurious, modern aesthetic.",
    year: "2024",
    image: "/assets/mostvaluable.png",
    link: "https://www.mostvaluableco.com/",
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