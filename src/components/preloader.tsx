'use client';

import { motion } from 'framer-motion';
import { resumeData } from '@/data/resume';
import { Vortex } from '@/components/ui/vortex';

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
    return (
        <motion.div
            variants={slideUp}
            initial="initial"
            exit="exit"
            className="fixed inset-0 z-[999] overflow-hidden"
        >
            <Vortex
                backgroundColor="hsl(224 80% 5%)"
                rangeY={800}
                particleCount={500}
                baseHue={255} // a purple hue
                className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        ease: 'easeInOut',
                        delay: 1, // Delay text animation to let vortex build up
                    }}
                    className="text-center"
                >
                    <h2 className="text-white text-3xl md:text-5xl font-bold">
                        {resumeData.name}
                    </h2>
                    <p className="text-white text-base md:text-xl max-w-xl mt-4">
                        Welcome to my portfolio.
                    </p>
                </motion.div>
            </Vortex>
        </motion.div>
    );
}
