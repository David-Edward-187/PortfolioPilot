import * as React from 'react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { CodeXml } from 'lucide-react'; // Using an existing icon

export function DesktopTopMenu() {
  const [currentTime, setCurrentTime] = React.useState('');

  React.useEffect(() => {
    const updateClock = () => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateClock();
    const timerId = setInterval(updateClock, 60000); // Update every minute
    return () => clearInterval(timerId);
  }, []);

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 h-7 bg-[hsl(var(--toolbar-background))] backdrop-blur-md z-50',
        'border-b border-border/70 flex items-center justify-between px-4 text-xs text-foreground select-none shadow-sm'
      )}
      role="menubar"
    >
      <div className="flex items-center space-x-4">
        <CodeXml className="w-4 h-4 text-primary" />
        <span className="font-semibold">PortfolioPilot OS</span>
        {/* Mock menu items - non-functional for now */}
        <span className="hover:bg-foreground/10 px-2 py-0.5 rounded-sm cursor-default">File</span>
        <span className="hover:bg-foreground/10 px-2 py-0.5 rounded-sm cursor-default">Edit</span>
        <span className="hover:bg-foreground/10 px-2 py-0.5 rounded-sm cursor-default">View</span>
        <span className="hover:bg-foreground/10 px-2 py-0.5 rounded-sm cursor-default">Help</span>
      </div>
      <div className="flex items-center space-x-3">
        <ThemeToggle />
        <span>{currentTime}</span>
      </div>
    </div>
  );
}
