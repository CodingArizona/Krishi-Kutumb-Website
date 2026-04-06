import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageLoader = ({ onDone }) => {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem('kk_loaded'));

  useEffect(() => {
    if (!visible) { onDone?.(); return; }
    const t = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('kk_loaded', '1');
      onDone?.();
    }, 2000);
    return () => clearTimeout(t);
  }, [visible, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#1a2e1a' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
        >
          <motion.h1
            className="text-4xl sm:text-6xl font-bold tracking-[0.2em]"
            style={{ color: '#c8a84b', fontFamily: "'Times New Roman', serif" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Krishi Kutumb
          </motion.h1>
          <motion.div
            className="mt-5 h-[2px] rounded-full"
            style={{ backgroundColor: '#c8a84b' }}
            initial={{ width: 0 }}
            animate={{ width: 220 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
          <motion.p
            className="mt-4 text-sm tracking-widest uppercase"
            style={{ color: 'rgba(200,168,75,0.6)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Rooted in Tradition
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
