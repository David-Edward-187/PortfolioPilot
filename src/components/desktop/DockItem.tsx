import * as React from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type DockItemProps = {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: (id: string) => void;
  isActive?: boolean;
  className?: string;
};

export function DockItem({ id, label, icon, onClick, isActive, className }: DockItemProps) {
  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleClick}
            aria-label={label}
            className={cn(
              'relative p-2.5 rounded-lg transition-all duration-200 ease-out',
              'hover:bg-foreground/10 hover:scale-110 active:scale-95',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-primary',
              isActive ? 'bg-primary/10 ring-2 ring-primary/70 scale-105' : '',
              className
            )}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-foreground opacity-80 group-hover:opacity-100 transition-opacity">
              {icon}
            </div>
            {isActive && (
              <span className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-popover text-popover-foreground border-border shadow-md text-xs px-2 py-1 rounded-md">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
