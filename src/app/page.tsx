
import { AboutSection } from '@/components/about-section';
import { CertificatesSection } from '@/components/certificates-section';
import { ContactSection } from '@/components/contact-section';
import { EducationSection } from '@/components/education-section';
import { ExperienceSection } from '@/components/experience-section';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { SkillsSection } from '@/components/skills-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificatesSection />
      <ContactSection />
    </>
  );
}
