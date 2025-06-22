
import { ProfileSection } from '@/components/profile-section';
import { ResumeDisplayPage } from '@/components/resume-display-page';
import { CaseStudyOverviewPage } from '@/components/case-study-overview-page';
import { CertificatesDisplayPage } from '@/components/certificates-display-page';
import { ContactConnectPage } from '@/components/contact-connect-page'; 

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <section id="profile">
        <ProfileSection />
      </section>

      <section id="resume">
        <ResumeDisplayPage />
      </section>
      
      <section id="projects">
        <CaseStudyOverviewPage />
      </section>
      
      <section id="certificates">
        <CertificatesDisplayPage />
      </section>
      
      <section id="contact">
        <ContactConnectPage />
      </section>
    </div>
  );
}
