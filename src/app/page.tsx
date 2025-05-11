

import { ProfileSection } from '@/components/profile-section';
import { ResumeSection } from '@/components/resume-section';
import { ProjectsSection } from '@/components/projects-section';
import { CertificatesSection } from '@/components/certificates-section';
import { ContactForm } from '@/components/contact-form';
import { resumeData } from '@/data/resume'; 

export default async function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8"> {/* Increased py */}
      <div className="max-w-5xl mx-auto space-y-24"> {/* Increased max-w and space-y */}
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
            skills: resumeData.skills
          }}
        />

        <ProjectsSection projects={resumeData.projects} />

        <CertificatesSection certificates={resumeData.certificates} />
        
        <ContactForm />
      </div>
    </div>
  );
}
