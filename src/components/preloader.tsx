'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData } from '@/data/resume';

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
    const [index, setIndex] = useState(0);
    // Add the final name to the list of words
    const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag", resumeData.name];

    useEffect(() => {
        // Stop cycling when it reaches the last word (the name)
        if (index >= words.length - 1) return;

        const timeoutId = setTimeout(() => {
            setIndex(index + 1)
        }, index === 0 ? 900 : 150) // Longer delay for the first word "Hello"

        return () => clearTimeout(timeoutId);
    }, [index, words.length]);

    return (
        <motion.div
            variants={slideUp}
            initial="initial"
            exit="exit"
            className="fixed inset-0 z-[999] flex items-center justify-center bg-primary text-primary-foreground"
        >
            <AnimatePresence mode="wait">
                <motion.p
                    key={words[index]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="text-4xl md:text-6xl font-bold"
                >
                    {words[index]}
                </motion.p>
            </AnimatePresence>
        </motion.div>
    );
}
