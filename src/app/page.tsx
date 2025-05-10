
import { ProfileSection } from '@/components/profile-section';
import { ResumeSection } from '@/components/resume-section';
import { ContactForm } from '@/components/contact-form';
import { resumeData } from '@/data/resume'; // Import directly from resume.ts
// No need for fs or path imports anymore

export default async function PortfolioPage() {
  // resumeData is now directly imported

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
