
"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Code2, Download, Copy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

// SVG code for the teal "</>" icon. Width/Height increased for better preview.
// Stroke is hardcoded to the PRD teal for portability of the SVG code.
const iconSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#339999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="m18 16 4-4-4-4"/>
  <path d="m6 8-4 4 4 4"/>
  <path d="m14.5 4-5 16"/>
</svg>`;

export function IconExportSection() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { toast } = useToast();

  const handleDownloadSvg = () => {
    const blob = new Blob([iconSvgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code-icon.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "SVG Downloaded",
      description: "code-icon.svg has been downloaded.",
    });
  };

  const handleCopySvgCode = () => {
    navigator.clipboard.writeText(iconSvgCode)
      .then(() => {
        toast({
          title: "SVG Code Copied",
          description: "The SVG code has been copied to your clipboard.",
        });
      })
      .catch(err => {
        console.error('Failed to copy SVG code: ', err);
        toast({
          title: "Copy Failed",
          description: "Could not copy SVG code. Please try again or copy manually.",
          variant: "destructive",
        });
      });
  };

  return (
    <section id="icon-export" className="py-16 md:py-20">
      <div className="flex items-center justify-center mb-12 md:mb-16 animate-fadeIn">
        <Code2 className="section-icon" />
        <h2 className="section-title">Icon Export Utility</h2>
      </div>
      <div className="max-w-xl mx-auto text-center bg-card p-8 md:p-10 rounded-xl shadow-xl border animate-fadeIn" style={{animationDelay: '0.1s'}}>
        <p className="mb-6 text-muted-foreground">
          Need the teal "&lt;/&gt;" icon as a PNG with a transparent background?
          This tool provides the SVG source code. You can use this SVG with any converter tool.
        </p>
        <Button onClick={() => setIsModalOpen(true)} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/80 shadow-lg hover:shadow-accent/50">
          Get Icon SVG
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl p-6 md:p-8 bg-card border-border shadow-xl rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-semibold text-primary">Teal "&lt;/&gt;" Icon SVG</DialogTitle>
            <DialogDescription className="mt-2 text-sm text-muted-foreground">
              Direct PNG generation isn't supported here. Instead, you can download or copy the SVG code below.
              Save this as an <code>.svg</code> file and use an online converter or image editor (like Figma, Inkscape, or Illustrator)
              to export it as a PNG with a transparent background. The icon's teal color is defined by <code>stroke="#339999"</code>.
            </DialogDescription>
          </DialogHeader>
          
          <div className="my-6 flex flex-col sm:flex-row items-center gap-6">
            <div className="p-4 bg-muted rounded-lg border border-border flex-shrink-0">
              {/* SVG Preview using dangerouslySetInnerHTML */}
              <div dangerouslySetInnerHTML={{ __html: iconSvgCode.replace('width="100"', 'width="64"').replace('height="100"', 'height="64"') }} />
            </div>
            <div className="flex-grow p-4 bg-muted/50 dark:bg-muted/20 border border-border rounded-lg overflow-x-auto w-full">
              <pre className="text-xs text-foreground whitespace-pre-wrap break-all">
                <code>
                  {iconSvgCode}
                </code>
              </pre>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-4">
            <Button variant="outline" onClick={handleCopySvgCode} className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10">
              <Copy className="mr-2 h-4 w-4" />
              Copy SVG Code
            </Button>
            <Button variant="default" onClick={handleDownloadSvg} className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className="mr-2 h-4 w-4" />
              Download .SVG File
            </Button>
             <DialogClose asChild>
              <Button type="button" variant="secondary" className="w-full sm:w-auto">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
