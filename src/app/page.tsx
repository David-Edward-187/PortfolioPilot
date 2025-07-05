
'use client';

import dynamic from 'next/dynamic';
import { AboutSection } from '@/components/about-section';
import { ProjectsSection } from '@/components/projects-section';
import { ContactSection } from '@/components/contact-section';
import { ExperienceSection } from '@/components/experience-section';
import { SkillsSection } from '@/components/skills-section';
import { EducationSection } from '@/components/education-section';
import { CertificatesSection } from '@/components/certificates-section';

const HeroSection = dynamic(() => import('@/components/hero-section').then(mod => mod.HeroSection), { 
  ssr: false,
  loading: () => <div className="relative h-screen min-h-[700px] w-full bg-background" />
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <ProjectsSection />
      <CertificatesSection />
      <ContactSection />
    </>
  );
}
