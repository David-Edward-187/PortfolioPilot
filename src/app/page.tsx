
import { LandingPage } from '@/components/landing-page';
import { CaseStudyOverviewPage } from '@/components/case-study-overview-page';
import { DeepDiveCaseStudyPage } from '@/components/deep-dive-case-study-page';
import { ContactConnectPage } from '@/components/contact-connect-page';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <LandingPage />
      <CaseStudyOverviewPage />
      <DeepDiveCaseStudyPage />
      <ContactConnectPage />
    </div>
  );
}
