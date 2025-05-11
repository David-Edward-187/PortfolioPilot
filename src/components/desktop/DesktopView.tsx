"use client";

import * as React from 'react';
import { Dock } from './Dock';
import { Window } from './Window';
import { LandingPage } from '@/components/landing-page';
import { CaseStudyOverviewPage } from '@/components/case-study-overview-page';
import { DeepDiveCaseStudyPage } from '@/components/deep-dive-case-study-page';
import { ContactConnectPage } from '@/components/contact-connect-page';
import { Home, Briefcase, FileText, MessageSquare, Settings, CodeXml } from 'lucide-react';
import { DesktopTopMenu } from './DesktopTopMenu';

export type AppDefinition = {
  id: string;
  name: string;
  icon: React.ReactNode;
  component: React.ComponentType<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  defaultSize?: { width: string; height: string };
};

const defaultApps: AppDefinition[] = [
  {
    id: 'landing',
    name: 'Welcome',
    icon: <Home className="w-full h-full" />,
    component: LandingPage,
    defaultSize: { width: 'w-[90vw] md:w-[800px]', height: 'h-[80vh] md:h-[600px]' },
  },
  {
    id: 'caseStudies',
    name: 'Case Studies',
    icon: <Briefcase className="w-full h-full" />,
    component: CaseStudyOverviewPage,
    defaultSize: { width: 'w-[95vw] md:w-[900px]', height: 'h-[85vh] md:h-[700px]' },
  },
  {
    id: 'deepDive',
    name: 'Project Deep Dive',
    icon: <FileText className="w-full h-full" />,
    component: DeepDiveCaseStudyPage,
     defaultSize: { width: 'w-[95vw] md:w-[1000px]', height: 'h-[90vh] md:h-[750px]' },
  },
  {
    id: 'contact',
    name: 'Contact Me',
    icon: <MessageSquare className="w-full h-full" />,
    component: ContactConnectPage,
    defaultSize: { width: 'w-[90vw] md:w-[850px]', height: 'h-[80vh] md:h-[650px]' },
  },
  // Placeholder for settings
  {
    id: 'settings',
    name: 'Settings',
    icon: <Settings className="w-full h-full" />,
    component: () => <div className="p-4">Settings App Content (Placeholder)</div>,
  },
];


export function DesktopView() {
  const [openApps, setOpenApps] = React.useState<{ [key: string]: boolean }>({ landing: true });
  const [activeAppId, setActiveAppId] = React.useState<string | null>('landing');
  const [appZIndexes, setAppZIndexes] = React.useState<{ [key: string]: number }>({ landing: 1 });
  const nextZIndex = React.useRef(2);

  const handleAppSelect = (appId: string) => {
    setOpenApps((prev) => ({ ...prev, [appId]: true }));
    setActiveAppId(appId);
    setAppZIndexes((prev) => ({
      ...prev,
      [appId]: nextZIndex.current++,
    }));
  };

  const handleCloseApp = (appId: string) => {
    setOpenApps((prev) => ({ ...prev, [appId]: false }));
    if (activeAppId === appId) {
      // Find another open app to activate, or set to null
      const remainingOpenApps = defaultApps.filter(app => app.id !== appId && openApps[app.id]);
      if (remainingOpenApps.length > 0) {
         // Activate the one with the highest z-index among remaining open apps
        let highestZ = 0;
        let nextActiveApp: string | null = null;
        remainingOpenApps.forEach(app => {
          if (appZIndexes[app.id] > highestZ) {
            highestZ = appZIndexes[app.id];
            nextActiveApp = app.id;
          }
        });
        setActiveAppId(nextActiveApp);
      } else {
        setActiveAppId(null);
      }
    }
  };
  
  const handleWindowFocus = (appId: string) => {
    if (appId !== activeAppId || appZIndexes[appId] !== nextZIndex.current -1) {
      setActiveAppId(appId);
      setAppZIndexes((prev) => ({
        ...prev,
        [appId]: nextZIndex.current++,
      }));
    }
  };


  return (
    <div className="h-full w-full bg-[var(--desktop-bg-image)] bg-cover bg-center flex flex-col items-center justify-center relative overflow-hidden">
      <DesktopTopMenu />
      
      {/* Desktop area for windows */}
      <div className="flex-grow w-full flex items-center justify-center p-8 pt-12 relative">
        {defaultApps.map((app) =>
          openApps[app.id] ? (
            <div
              key={app.id}
              style={{ zIndex: appZIndexes[app.id] || 0 }}
              onClick={() => handleWindowFocus(app.id)} // Bring to front on click
              className="absolute" // Position windows absolutely to allow overlap
            >
              <Window
                title={app.name}
                isOpen={openApps[app.id]}
                onClose={() => handleCloseApp(app.id)}
                defaultSize={app.defaultSize}
                icon={React.cloneElement(app.icon as React.ReactElement, { className: 'w-4 h-4' })}
              >
                <app.component />
              </Window>
            </div>
          ) : null
        )}
      </div>

      <Dock apps={defaultApps} activeAppId={activeAppId} onAppSelect={handleAppSelect} />
    </div>
  );
}
