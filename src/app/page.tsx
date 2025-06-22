
import { ProfileSection } from '@/components/profile-section';
import { AboutSection } from '@/components/deep-dive-case-study-page';
import { SkillsSection } from '@/components/certificates-display-page';
import { ExperienceSection } from '@/components/resume-display-page';
import { ProjectsSection } from '@/components/case-study-overview-page';
import { ContactSection } from '@/components/contact-connect-page';

export default function HomePage() {
  return (
    <>
      <ProfileSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
