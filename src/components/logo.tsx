
import * as React from 'react';
import { cn } from '@/lib/utils';

export const Logo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-8 h-8", className)}
        {...props}
    >
        <g stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 25, 15 V 85 C 75, 85, 75, 15, 25, 15" />
            <path d="M 25, 35 H 55" />
            <path d="M 25, 50 H 60" />
            <path d="M 25, 65 H 55" />
        </g>
    </svg>
);
