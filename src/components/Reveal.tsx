'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
}

export const Reveal = ({ children, width = "100%" }: RevealProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scale = useTransform(scaleProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scaleProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(scaleProgress, [0, 0.5, 1], [10, 0, -10]);

  return (
    <div ref={ref} style={{ position: "relative", width, perspective: "1000px" }}>
      <motion.div
        style={{ scale, opacity, rotateX }}
        className="transition-all duration-1000 ease-out"
      >
        {children}
      </motion.div>
    </div>
  );
};
