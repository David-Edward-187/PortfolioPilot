
"use client";

import React, { useState, useEffect } from 'react';
import { Code } from '@phosphor-icons/react';

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(oldProgress + 1, 100);
      });
    }, 20); // Simulates loading progress

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setLoading(false), 1000); // Wait for fade-out animation
      }, 500); // Pause at 100% for a moment
    }
  }, [progress]);
  
  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="relative flex items-center justify-center w-32 h-32">
        <Code weight="bold" className="text-accent h-16 w-16 z-10 animate-pulse" />
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-ping-slow"></div>
      </div>
      
      <div className="w-48 h-1 mt-8 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-300 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-4 text-sm font-mono text-accent">{progress}%</p>
    </div>
  );
}
