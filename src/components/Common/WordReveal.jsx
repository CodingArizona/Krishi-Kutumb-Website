import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animates text word-by-word.
 * Wrap inside a heading tag for semantic HTML:
 *   <h1 className="text-4xl ..."><WordReveal text="Hello World" /></h1>
 */
const WordReveal = ({ text, className = '', inView = false, delay = 0 }) => {
  const words = text.split(' ');

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
  };

  const word = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const viewProps = inView
    ? { initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-80px' } }
    : { initial: 'hidden', animate: 'visible' };

  return (
    <motion.span
      className={className}
      style={{ display: 'block' }}
      variants={container}
      {...viewProps}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={word}
          style={{ display: 'inline-block', marginRight: '0.3em', lineHeight: 'inherit' }}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default WordReveal;
