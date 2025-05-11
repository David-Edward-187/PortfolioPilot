import * as React from 'react';
import { cn } from '@/lib/utils';
import { TrafficLights } from './TrafficLights';
import { ScrollArea } from '@/components/ui/scroll-area';

type WindowProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  isOpen?: boolean;
  onClose?: () => void;
  defaultSize?: { width: string; height: string };
  icon?: React.ReactNode;
};

export function Window({
  title,
  children,
  className,
  contentClassName,
  isOpen = true,
  onClose,
  defaultSize = { width: 'w-[80vw] md:w-[700px]', height: 'h-[70vh] md:h-[500px]' },
  icon,
}: WindowProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={cn(
        'bg-card text-card-foreground rounded-[var(--window-radius)] shadow-[var(--window-shadow)] flex flex-col overflow-hidden animate-fadeIn',
        defaultSize.width,
        defaultSize.height,
        className
      )}
      role="dialog"
      aria-labelledby="window-title"
      aria-modal="true" // Assuming modal behavior for simplicity
    >
      {/* Title Bar */}
      <div className="h-9 bg-[hsl(var(--muted)/0.5)] backdrop-blur-sm border-b border-border flex items-center justify-between pl-1 pr-2 select-none flex-shrink-0">
        <div className="flex items-center">
          <TrafficLights onClose={onClose} />
          {icon && <div className="ml-2 mr-1.5 scale-75 opacity-80">{icon}</div>}
          <h2 id="window-title" className="text-xs font-medium text-foreground truncate">
            {title}
          </h2>
        </div>
        {/* Optionally add more controls here */}
      </div>

      {/* Content Area */}
      <ScrollArea className="flex-grow overflow-y-auto">
        <div className={cn('p-4 md:p-6', contentClassName)}>
          {children}
        </div>
      </ScrollArea>
    </div>
  );
}
