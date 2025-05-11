

import { resumeData } from '@/data/resume';
import { ProfileSection } from '@/components/profile-section';
import { ResumeSection } from '@/components/resume-section';
import { ProjectsSection } from '@/components/projects-section';
import { CertificatesDisplayPage } from '@/components/certificates-display-page'; 
import { ContactConnectPage } from '@/components/contact-connect-page'; 

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
        {/* Profile Section */}
        <ProfileSection
          profile={{
            name: resumeData.name,
            title: resumeData.title,
            bio: resumeData.bio,
            headshotUrl: resumeData.headshotUrl,
            contact: resumeData.contact,
          }}
        />

        {/* Resume Section */}
        <ResumeSection
          resume={{
            experience: resumeData.experience,
            education: resumeData.education,
            skills: resumeData.skills,
          }}
        />
        
        {/* Projects Section */}
        <ProjectsSection projects={resumeData.projects} />

        {/* Certificates Section - Conditionally render if certificates exist */}
        {resumeData.certificates && resumeData.certificates.length > 0 && (
          <CertificatesDisplayPage />
        )}

        {/* Contact Section */}
        <ContactConnectPage />
      </div>
    </div>
  );
}
