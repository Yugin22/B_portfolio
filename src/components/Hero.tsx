'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, Download } from 'lucide-react';
import ClayScene from './ClayScene';
import TextScramble from './TextScramble';
import Magnetic from './Magnetic';

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const rotate = useTransform(scrollY, [0, 500], [0, 10]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-20 overflow-hidden bg-[#010101]">
      <div className="grid-bg-3d" />
      <ClayScene />

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-neon-cyan/10 blur-[100px] rounded-full opacity-30 animate-float" 
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-neon-purple/10 blur-[100px] rounded-full opacity-30 animate-float" 
        />
      </div>

      <motion.div 
        style={{ y, rotate, opacity }}
        className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 12 }}
          className="flex items-center gap-3 px-8 py-3 rounded-full border border-white/[0.05] bg-white/[0.01] backdrop-blur-xl text-zinc-500 text-[10px] font-black tracking-[0.5em] mb-20 uppercase shadow-2xl"
        >
          <Sparkles className="w-4 h-4 text-neon-cyan animate-pulse" />
          Neural Design Active
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="text-7xl md:text-[10rem] font-black tracking-[-0.04em] mb-12 uppercase leading-[0.8] relative"
        >
          <span className="text-white block drop-shadow-2xl">
            <TextScramble text="EUGENE L." />
          </span>
          <span className="text-gradient-3d block italic mt-2">
            <TextScramble text="BULABOG" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-3xl mx-auto text-lg md:text-3xl text-zinc-500 font-medium tracking-tight mb-24 leading-tight"
        >
          Architecting <span className="text-white">Future-Proof</span> Ecosystems. <br />
          Experience the <span className="text-neon-cyan">Tactile</span> Dimension of the Web.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-12"
        >
          <Magnetic>
            <a href="#projects" className="clay-btn bg-white !text-black flex items-center gap-4">
              ENTER ARCHIVE
              <ArrowRight className="w-5 h-5" />
            </a>
          </Magnetic>
          
          <Magnetic>
            <a href="/resume.pdf" download className="clay-btn text-white flex items-center gap-4">
              <Download className="w-5 h-5 text-neon-purple" />
              RESUME_SYS
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
