import * as React from 'react';
import { cn } from '@/lib/utils';

type TrafficLightProps = {
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  className?: string;
};

export function TrafficLights({
  onClose,
  onMinimize,
  onMaximize,
  className,
}: TrafficLightProps) {
  const commonButtonClass = 'w-3 h-3 rounded-full flex items-center justify-center';
  const iconClass = 'w-1.5 h-1.5 opacity-0 group-hover:opacity-70 transition-opacity duration-100';

  // For this portfolio, these buttons are mostly decorative.
  // onClose might be used to "close" a modal-like window.
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose?.();
  };
  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMinimize?.();
  };
  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMaximize?.();
  };

  return (
    <div className={cn('flex space-x-2 p-2 items-center', className)}>
      <button
        aria-label="Close window"
        className={cn(commonButtonClass, 'bg-red-500 group')}
        onClick={handleClose}
      >
        <svg viewBox="0 0 6 6" aria-hidden="true" className={iconClass}>
          <path d="M0 0L6 6M6 0L0 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
        </svg>
      </button>
      <button
        aria-label="Minimize window"
        className={cn(commonButtonClass, 'bg-yellow-400 group')}
        onClick={handleMinimize}
      >
         <svg viewBox="0 0 6 2" aria-hidden="true" className={iconClass}>
          <path d="M0 1L6 1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
        </svg>
      </button>
      <button
        aria-label="Maximize window"
        className={cn(commonButtonClass, 'bg-green-500 group')}
        onClick={handleMaximize}
      >
        {/* Plus icon for maximize */}
        <svg viewBox="0 0 6 6" aria-hidden="true" className={iconClass}>
          <path d="M3 0V6M0 3H6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
        </svg>
      </button>
    </div>
  );
}
