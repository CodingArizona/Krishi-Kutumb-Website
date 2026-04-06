import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BackToBlogsButton = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 200);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={() => navigate('/blog')}
          className="fixed bottom-8 left-6 z-50 flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-full shadow-xl text-sm font-semibold hover:bg-green-800 transition-colors"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'transform, opacity' }}
        >
          ← Back to Blogs
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToBlogsButton;
