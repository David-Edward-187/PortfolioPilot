
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
  githubUrl?: string;
}

export interface CertificateEntry {
  name: string;
  issuingOrganization: string;
  issueDate: string; // e.g., "Jan 2023" or "2023"
  credentialUrl?: string; // Link to the certificate
  imageUrl?: string; // URL for an image/logo of the certificate or organization
  description?: string; // Optional short description or key learnings
}

export interface ResumeData {
  name: string;
  title: string;
  bio: string;
  headshotUrl: string;
  contact: Contact;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: Record<string, string[]>;
  projects: ProjectEntry[];
  certificates?: CertificateEntry[]; 
}
