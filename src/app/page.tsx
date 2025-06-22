
import { ProfileSection } from '@/components/profile-section';
import { AboutSection } from '@/components/about-section';
import { CaseStudyOverviewPage } from '@/components/case-study-overview-page';
import { ExperienceSection } from '@/components/experience-section';
import { SkillsSection } from '@/components/skills-section';
import { ContactConnectPage } from '@/components/contact-connect-page'; 

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ProfileSection is the Hero/Home section and has its own <section> tag with id="profile" */}
      <ProfileSection /> 
      
      <div className="container mx-auto">
        <section id="about">
          <AboutSection />
        </section>

        <section id="projects">
          <CaseStudyOverviewPage />
        </section>

        <section id="experience">
          <ExperienceSection />
        </section>
        
        <section id="skills">
          <SkillsSection />
        </section>
        
        <section id="contact">
          <ContactConnectPage />
        </section>
      </div>
    </div>
  );
}
