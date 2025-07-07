
'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';

const slideUp = {
    initial: {
        y: "0",
    },
    exit: {
        y: "-100vh",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
    }
}

export function Preloader() {
    // Creating words for the typewriter effect from the resume data name
    const words = resumeData.name.split(' ').map(word => ({ text: word }));

    return (
        <motion.div
            variants={slideUp}
            initial="initial"
            exit="exit"
            className="fixed inset-0 z-[999] bg-background flex items-center justify-center"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <TypewriterEffect words={words} />
            </motion.div>
        </motion.div>
    );
}
