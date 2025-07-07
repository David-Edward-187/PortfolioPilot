
'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { Vortex } from '@/components/ui/vortex';
import { useTheme } from 'next-themes';
import React from 'react';

const slideUp = {
    initial: {
        y: "0",
    },
    exit: {
        y: "-100vh",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
    }
};

export function Preloader() {
    const { resolvedTheme } = useTheme();
    const [bgColor, setBgColor] = React.useState('hsl(224 80% 5%)');
    const [particleColors, setParticleColors] = React.useState<string[]>([]);
    const [isThemeResolved, setIsThemeResolved] = React.useState(false);

    React.useEffect(() => {
        if (resolvedTheme) {
            if (resolvedTheme === 'dark') {
                setBgColor('hsl(224 80% 5%)');
                setParticleColors(['hsl(255 85% 65%)', 'hsl(185 100% 50%)']);
            } else {
                setBgColor('hsl(220 30% 98%)');
                setParticleColors(['hsl(255 80% 60%)', 'hsl(185 85% 40%)']);
            }
            setIsThemeResolved(true);
        }
    }, [resolvedTheme]);

    if (!isThemeResolved) {
        return <div className="fixed inset-0 z-[999] bg-background"></div>;
    }

    return (
        <motion.div
            variants={slideUp}
            initial="initial"
            exit="exit"
            className="fixed inset-0 z-[999]"
        >
            <Vortex
                backgroundColor={bgColor}
                particleColors={particleColors}
                className="flex items-center justify-center w-full h-full"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-4xl md:text-6xl font-bold text-center text-foreground"
                >
                    {resumeData.name}
                </motion.div>
            </Vortex>
        </motion.div>
    );
}
