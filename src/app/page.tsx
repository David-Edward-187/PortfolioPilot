
import { resumeData } from '@/data/resume';
import { ProfileSection } from '@/components/profile-section';
import { ResumeDisplayPage } from '@/components/resume-display-page';
import { CaseStudyOverviewPage } from '@/components/case-study-overview-page';
import { CertificatesDisplayPage } from '@/components/certificates-display-page'; 
import { ContactConnectPage } from '@/components/contact-connect-page'; 

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <ProfileSection />
      
      <section id="resume" className="container mx-auto">
        <ResumeDisplayPage />
      </section>

      <section id="projects" className="container mx-auto">
        <CaseStudyOverviewPage />
      </section>
      
      <section id="certificates" className="container mx-auto">
        <CertificatesDisplayPage />
      </section>
      
      <section id="contact" className="container mx-auto">
        <ContactConnectPage />
      </section>
    </div>
  );
}
