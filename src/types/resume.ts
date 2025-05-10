
export interface Contact {
  email: string;
  linkedin: string;
  github: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  years: string;
  details?: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  years: string;
  description: string[]; // Changed from string to string[]
}

export interface ProjectEntry {
  name: string;
  description: string[]; // Changed from string to string[]
  technologies?: string[];
  link: string;
}

export interface ResumeData {
  name: string;
  title: string;
  bio: string;
  headshotUrl: string;
  contact: Contact;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: Record<string, string[]>; // Changed from string[] to Record<string, string[]>
  projects: ProjectEntry[];
}
