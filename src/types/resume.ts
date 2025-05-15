
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
  description: string[];
}

export interface ProjectEntry {
  name: string;
  description: string[];
  technologies?: string[];
  link: string;
  imageUrl?: string; 
  dataAiHint?: string; 
}

export interface CertificateEntry {
  name: string;
  issuingOrganization: string;
  issueDate: string; 
  credentialUrl?: string; 
  imageUrl?: string; 
  description?: string;
  dataAiHint?: string; 
}

export interface ResumeData {
  name: string;
  title: string;
  bio: string;
  headshotUrl: string;
  dataAiHint?: string; // Added for profile headshot
  contact: Contact;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: Record<string, string[]>;
  projects: ProjectEntry[];
  certificates?: CertificateEntry[];
}
