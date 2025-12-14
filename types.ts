export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  year: string;
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
