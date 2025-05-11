

import { ProfileSection } from '@/components/profile-section';
import { ResumeSection } from '@/components/resume-section';
import { ProjectsSection } from '@/components/projects-section'; // Added import
import { CertificatesSection } from '@/components/certificates-section';
import { ContactForm } from '@/components/contact-form';
import { resumeData } from '@/data/resume'; 

export default async function PortfolioPage() {
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
            skills: resumeData.skills
            // Projects removed from here
          }}
        />

        <ProjectsSection projects={resumeData.projects} /> {/* Added ProjectsSection */}

        <CertificatesSection certificates={resumeData.certificates} />
        
        <ContactForm />
      </div>
    </div>
  );
}

