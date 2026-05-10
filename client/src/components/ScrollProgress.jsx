import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        background: 'rgba(255, 255, 255, 0.05)',
        zIndex: 10000,
      }}
    >
      <motion.div
        style={{
          height: '100%',
          background: '#F4B400',
          scaleX,
          transformOrigin: '0%',
        }}
      />
    </div>
  );
};

export default ScrollProgress;
