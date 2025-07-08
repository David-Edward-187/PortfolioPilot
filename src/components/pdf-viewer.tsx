
'use client';

import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Skeleton } from './ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';

// Set up the worker to load the PDF. This is the recommended way for Next.js App Router.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url,
).toString();


export function PdfViewer({ fileUrl }: { fileUrl: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    const handleResize = () => {
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
        }
    };
    handleResize(); // Set initial width
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadingSkeleton = (
    <div className="w-full">
        <Skeleton className="h-[80vh] w-full rounded-lg" />
    </div>
  );

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto">
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={loadingSkeleton}
        error={<p className="text-destructive text-center">Failed to load PDF file.</p>}
        className="flex flex-col items-center"
      >
        <div className="w-full h-[85vh] overflow-y-auto rounded-lg border border-border/50 shadow-lg bg-card/50 p-2">
             {Array.from(new Array(numPages), (el, index) => (
                <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={containerWidth ? containerWidth * (isMobile ? 0.9 : 0.95) : undefined}
                    className="mb-4 shadow-md mx-auto"
                    renderAnnotationLayer={true}
                    renderTextLayer={true}
                />
            ))}
        </div>
      </Document>
    </div>
  );
}
