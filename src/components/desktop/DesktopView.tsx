"use client";

import React from 'react';
import { Dock } from './Dock';
import { Window } from './Window';
import { ProfileSection } from '@/components/profile-section'; // Changed from LandingPage
import { CaseStudyOverviewPage } from '@/components/case-study-overview-page'; 
import { ContactConnectPage } from '@/components/contact-connect-page'; 
import { ResumeDisplayPage } from '@/components/resume-display-page'; 
import { CertificatesDisplayPage } from '@/components/certificates-display-page'; 
import { User, FileText, Briefcase, Award, MessageSquare } from 'lucide-react';
import { DesktopTopMenu } from './DesktopTopMenu';
import { resumeData } from '@/data/resume'; // Import resumeData

export type AppDefinition = {
  id: string;
  name: string;
  icon: React.ReactNode;
  component: React.ComponentType<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  defaultSize?: { width: string; height: string };
  props?: Record<string, any>; // Added to pass props to components
};

const defaultApps: AppDefinition[] = [
  {
    id: 'profile',
    name: 'Profile',
    icon: <User className="w-full h-full" />,
    component: ProfileSection, // Changed from LandingPage
    props: { profile: resumeData }, // Pass resumeData to ProfileSection
    defaultSize: { 
      width: 'w-[95vw] md:w-[800px] lg:w-[900px] xl:w-[1000px]', 
      height: 'h-[80vh] md:h-[580px] lg:h-[640px] xl:h-[700px]' 
    },
  },
  {
    id: 'resume',
    name: 'Resume',
    icon: <FileText className="w-full h-full" />,
    component: ResumeDisplayPage,
    defaultSize: { 
      width: 'w-[95vw] md:w-[900px] lg:w-[1000px] xl:w-[1100px]', 
      height: 'h-[80vh] md:h-[600px] lg:h-[680px] xl:h-[760px]'
    },
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: <Briefcase className="w-full h-full" />,
    component: CaseStudyOverviewPage, 
    defaultSize: { 
      width: 'w-[95vw] md:w-[900px] lg:w-[1000px] xl:w-[1100px]', 
      height: 'h-[80vh] md:h-[580px] lg:h-[640px] xl:h-[700px]'
    },
  },
  {
    id: 'certificates',
    name: 'Certificates',
    icon: <Award className="w-full h-full" />,
    component: CertificatesDisplayPage,
    defaultSize: { 
      width: 'w-[95vw] md:w-[850px] lg:w-[950px] xl:w-[1050px]', 
      height: 'h-[80vh] md:h-[580px] lg:h-[640px] xl:h-[700px]' 
    },
  },
  {
    id: 'contact',
    name: 'Contact',
    icon: <MessageSquare className="w-full h-full" />,
    component: ContactConnectPage,
    defaultSize: { 
      width: 'w-[95vw] md:w-[850px] lg:w-[900px] xl:w-[950px]', 
      height: 'h-[80vh] md:h-[580px] lg:h-[640px] xl:h-[700px]'
    },
  },
];


export function DesktopView() {
  const [openApps, setOpenApps] = React.useState<{ [key: string]: boolean }>({ profile: true }); 
  const [activeAppId, setActiveAppId] = React.useState<string | null>('profile'); 
  const [appZIndexes, setAppZIndexes] = React.useState<{ [key: string]: number }>({ profile: 1 });
  const nextZIndex = React.useRef(2);

  const handleAppSelect = React.useCallback((appId: string) => {
    setOpenApps((prev) => ({ ...prev, [appId]: true }));
    setActiveAppId(appId);
    setAppZIndexes((prevZIndexes) => ({
      ...prevZIndexes,
      [appId]: nextZIndex.current++,
    }));
  }, []); // Empty dependency array as it only uses setters and refs

  const handleCloseApp = (appId: string) => {
    setOpenApps((prev) => ({ ...prev, [appId]: false }));
    if (activeAppId === appId) {
      const remainingOpenApps = defaultApps.filter(app => app.id !== appId && openApps[app.id] && app.id !== appId); 
      if (remainingOpenApps.length > 0) {
        let highestZ = 0;
        let nextActiveApp: string | null = null;
        remainingOpenApps.forEach(app => {
          if (openApps[app.id] && (appZIndexes[app.id] > highestZ)) { 
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

  React.useEffect(() => {
    const handleOpenAppEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ appId: string; context?: any }>;
      if (customEvent.detail && customEvent.detail.appId) {
        const appToOpen = defaultApps.find(app => app.id === customEvent.detail.appId);
        if (appToOpen) {
          handleAppSelect(customEvent.detail.appId);
        } else {
          console.warn(`App with ID "${customEvent.detail.appId}" not found.`);
        }
      }
    };
  
    window.addEventListener('openApp', handleOpenAppEvent);
  
    return () => {
      window.removeEventListener('openApp', handleOpenAppEvent);
    };
  }, [handleAppSelect]);


  return (
    <div className="h-full w-full bg-[var(--desktop-bg-image)] bg-cover bg-center flex flex-col items-center justify-center relative overflow-hidden">
      <DesktopTopMenu />
      
      <div className="flex-grow w-full flex items-center justify-center p-8 pt-12 relative">
        {defaultApps.map((app) =>
          openApps[app.id] ? (
            <div
              key={app.id}
              style={{ zIndex: appZIndexes[app.id] || 0 }}
              onClickCapture={() => handleWindowFocus(app.id)} 
              className="absolute" 
            >
              <Window
                title={app.name}
                isOpen={openApps[app.id]}
                onClose={() => handleCloseApp(app.id)}
                defaultSize={app.defaultSize}
                icon={React.cloneElement(app.icon as React.ReactElement, { className: 'w-4 h-4' })}
              >
                <app.component {...app.props} /> {/* Spread app.props here */}
              </Window>
            </div>
          ) : null
        )}
      </div>

      <Dock apps={defaultApps} activeAppId={activeAppId} onAppSelect={handleAppSelect} />
    </div>
  );
}
