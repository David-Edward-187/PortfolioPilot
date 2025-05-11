import * as React from 'react';
import { cn } from '@/lib/utils';
import { DockItem } from './DockItem';
import type { AppDefinition } from './DesktopView'; // Assuming AppDefinition is defined here or passed

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
        'fixed bottom-4 left-1/2 -translate-x-1/2 z-50',
        'bg-black/20 backdrop-blur-md border border-white/20 shadow-[var(--dock-shadow)]',
        'p-2 rounded-xl flex space-x-2 items-end',
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
