
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
        <path
            d="M65 15C80 15 90 25 90 40V60C90 75 80 85 65 85H35C20 85 10 75 10 60V40C10 25 20 15 35 15H65Z"
            stroke="currentColor"
            strokeWidth="10"
        />
        <path
            d="M60 50C60 63.8071 48.8071 75 35 75"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
        />
        <path
            d="M40 50C40 36.1929 51.1929 25 65 25"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
        />
    </svg>
);
