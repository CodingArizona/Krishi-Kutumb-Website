import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const ReadingProgress = () => {
  const scaleX = useSpring(0, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      scaleX.set(docH > 0 ? scrollTop / docH : 0);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [scaleX]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[200] origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg, #16a34a, #c8a84b)' }}
    />
  );
};

export default ReadingProgress;
