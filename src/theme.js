export const colors = {
  primary: '#1a2e1a',    // deep forest green
  secondary: '#c8a84b',  // golden wheat
  accent: '#4a7c59',     // medium green
  bg: '#0d1a0d',         // dark soil
  light: '#f5f0e8',      // cream
  text: '#e8e0d0',       // warm white
};

export const easings = {
  smooth: [0.22, 1, 0.36, 1],
  bouncy: [0.34, 1.56, 0.64, 1],
  inOut: [0.65, 0, 0.35, 1],
};

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
