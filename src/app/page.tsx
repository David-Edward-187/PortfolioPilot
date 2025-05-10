import { promises as fs } from 'fs';
import path from 'path';
import { ProfileSection } from '@/components/profile-section';
import { ResumeSection } from '@/components/resume-section';
import { ContactForm } from '@/components/contact-form';
import type { ResumeData } from '@/types/resume';

async function getResumeData(): Promise<ResumeData> {
  const filePath = path.join(process.cwd(), 'src', 'data', 'resume.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function PortfolioPage() {
  const resumeData = await getResumeData();

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <ProfileSection profile={{ 
            name: resumeData.name, 
            title: resumeData.title, 
            bio: resumeData.bio, 
            headshotUrl: resumeData.headshotUrl, 
            contact: resumeData.contact 
          }} 
        />
        
        <ResumeSection resume={{
            education: resumeData.education,
            experience: resumeData.experience,
            skills: resumeData.skills,
            projects: resumeData.projects
          }}
        />
        
        <ContactForm />
      </div>
    </div>
  );
}
