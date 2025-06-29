
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code } from '@phosphor-icons/react';

const containerVariants = {
  initial: { opacity: 1 },
  exit: { 
    opacity: 0,
    transition: { duration: 0.8, ease: "easeInOut" }
  },
};

const iconVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut'
        }
    }
}

const progressVariants = {
    initial: { width: '0%' },
    animate: {
        width: '100%',
        transition: {
            duration: 2,
            ease: 'easeOut'
        }
    }
}

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500); // Preloader duration
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          variants={containerVariants}
          initial="initial"
          exit="exit"
        >
          <motion.div 
            className="relative flex items-center justify-center w-32 h-32"
            variants={iconVariants}
            initial="initial"
            animate="animate"
          >
            <Code weight="bold" className="text-accent h-16 w-16 z-10 animate-pulse" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-ping-slow"></div>
          </motion.div>
          
          <div className="w-48 h-1 mt-8 bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              variants={progressVariants}
              initial="initial"
              animate="animate"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
