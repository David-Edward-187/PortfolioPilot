
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
  description: string;
}

export interface ProjectEntry {
  name: string;
  description: string;
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
  skills: string[];
  projects: ProjectEntry[];
}
