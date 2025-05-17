
import { resumeData } from '@/data/resume';
import { ProfileSection } from '@/components/profile-section';
import { ResumeDisplayPage } from '@/components/resume-display-page';
import { CaseStudyOverviewPage } from '@/components/case-study-overview-page';
import { CertificatesDisplayPage } from '@/components/certificates-display-page'; 
import { ContactConnectPage } from '@/components/contact-connect-page'; 
import { IconExportSection } from '@/components/icon-export-section'; // New import

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ProfileSection is full height, other sections scroll "underneath" */}
      <ProfileSection /> 
      
      <div className="container mx-auto">
        <section id="resume">
          <ResumeDisplayPage />
        </section>

        <section id="projects">
          <CaseStudyOverviewPage />
        </section>
        
        <section id="certificates">
          <CertificatesDisplayPage />
        </section>

        {/* New Section for Icon Export Utility */}
        <section id="icon-utility" className="bg-background">
          <IconExportSection />
        </section>
        
        <section id="contact">
          <ContactConnectPage />
        </section>
      </div>
    </div>
  );
}
