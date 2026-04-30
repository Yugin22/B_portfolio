'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TECH_STACK_1 = ['NEXT.JS 15', 'TYPESCRIPT', 'TAILWIND 4', 'SUPABASE', 'POSTGRESQL'];
const TECH_STACK_2 = ['FRAMER MOTION', 'VERCEL', 'REACT 19', 'NODE.JS', 'PRISMA'];
const TECH_STACK_3 = ['STRIPE', 'REDIS', 'DOCKER', 'AWS', 'GIT'];

export default function TechMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const x3 = useTransform(scrollYProgress, [0, 1], [-200, -800]);

  return (
    <section ref={containerRef} className="py-20 md:py-40 bg-[#010101] overflow-hidden">
      <div className="flex flex-col gap-8 md:gap-20">
        
        {/* Row 1 */}
        <motion.div style={{ x: x1 }} className="flex gap-8 md:gap-12 whitespace-nowrap">
          {[...TECH_STACK_1, ...TECH_STACK_1].map((tech, i) => (
            <span key={i} className="text-5xl sm:text-7xl md:text-[12rem] font-black text-zinc-900 uppercase tracking-tighter hover:text-white transition-colors duration-500">
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Row 2 */}
        <motion.div style={{ x: x2 }} className="flex gap-8 md:gap-12 whitespace-nowrap">
          {[...TECH_STACK_2, ...TECH_STACK_2].map((tech, i) => (
            <span key={i} className="text-5xl sm:text-7xl md:text-[12rem] font-black text-white uppercase tracking-tighter opacity-10 hover:opacity-100 transition-opacity duration-500">
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Row 3 */}
        <motion.div style={{ x: x3 }} className="flex gap-8 md:gap-12 whitespace-nowrap">
          {[...TECH_STACK_3, ...TECH_STACK_3].map((tech, i) => (
            <span key={i} className="text-5xl sm:text-7xl md:text-[12rem] font-black text-zinc-900 uppercase tracking-tighter hover:text-neon-cyan transition-colors duration-500">
              {tech}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
