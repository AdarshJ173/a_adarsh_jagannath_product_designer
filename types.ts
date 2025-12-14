export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  video?: string; // Optional video to display instead of image
  year: string;
  link?: string; // Optional external link for "Visit Site" action
  status?: string; // Optional status like "Under Development"
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  desc: string;
}

export interface Skill {
  name: string;
  icon: string; // Lucide icon name or image url
}

export type CursorType = 'default' | 'hover' | 'text';
