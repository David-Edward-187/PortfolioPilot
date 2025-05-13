
import * as React from 'react';
import { cn } from '@/lib/utils';
import { DockItem } from './DockItem';
import type { AppDefinition } from './DesktopView'; 

type DockProps = {
  apps: AppDefinition[];
  activeAppId: string | null;
  onAppSelect: (appId: string) => void;
  className?: string;
};

export function Dock({ apps, activeAppId, onAppSelect, className }: DockProps) {
  return (
    <nav
      className={cn(
        'fixed bottom-4 left-1/2 -translate-x-1/2 z-[60]', // Changed z-50 to z-[60]
        'bg-[hsl(var(--toolbar-background))] backdrop-blur-lg border border-border/70 shadow-[var(--dock-shadow)]',
        'p-1.5 rounded-2xl flex space-x-1.5 items-end',
        className
      )}
      role="menubar"
      aria-label="Application Dock"
    >
      {apps.map((app) => (
        <DockItem
          key={app.id}
          id={app.id}
          label={app.name}
          icon={app.icon}
          onClick={onAppSelect}
          isActive={activeAppId === app.id}
        />
      ))}
    </nav>
  );
}
