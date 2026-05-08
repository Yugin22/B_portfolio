'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface CircuitLineProps {
  points: string;
  label: string;
  detail: string;
  color: 'cyan' | 'purple';
  isHovered: boolean;
  labelPos: { x: number, y: number };
  align: 'left' | 'right';
  delay: number;
}

const CircuitLine = ({ points, label, detail, color, isHovered, labelPos, align, delay }: CircuitLineProps) => {
  const neonColor = color === 'cyan' ? '#00f3ff' : '#9d00ff';
  const textColor = color === 'cyan' ? 'text-neon-cyan' : 'text-neon-purple';
  const glowClass = color === 'cyan' ? 'shadow-[0_0_20px_rgba(0,243,255,0.6)]' : 'shadow-[0_0_20px_rgba(157,0,255,0.6)]';

  return (
    <>
      {/* Background Line (Ghost) */}
      <motion.path
        d={points}
        fill="none"
        stroke="white"
        strokeWidth="0.5"
        animate={{ opacity: isHovered ? 0.05 : 0 }}
      />

      {/* The Filling Line */}
      <motion.path
        d={points}
        fill="none"
        stroke={neonColor}
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0
        }}
        transition={{
          pathLength: { duration: 0.7, ease: "easeInOut" },
          opacity: { duration: 0.3 }
        }}
        className="transition-opacity duration-300"
      />

      {/* Trailing Glow Pulse (Bidirectional) */}
      <motion.path
        d={points}
        fill="none"
        stroke={neonColor}
        strokeWidth="4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isHovered ? {
          pathLength: [0, 1],
          opacity: [0, 1, 0]
        } : {
          pathLength: [1, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 0.7,
          ease: "easeInOut",
          delay: isHovered ? 0 : 0.2
        }}
        className="blur-[6px] pointer-events-none"
      />

      {/* The Detail Label */}
      <AnimatePresence>
        {isHovered && (
          <foreignObject
            x={align === 'left' ? labelPos.x : labelPos.x - 240}
            y={labelPos.y - 50}
            width="240"
            height="120"
            className="overflow-visible"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: align === 'left' ? -20 : 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: align === 'left' ? -10 : 10 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 150,
                delay: 0.7
              }}
              className={`flex flex-col ${align === 'left' ? 'items-start text-left' : 'items-end text-right'}`}
            >
              <div className={`px-5 py-3 rounded-xl bg-black/95 border border-white/10 backdrop-blur-2xl ${glowClass} inline-block shadow-2xl`}>
                <span className={`text-[13px] md:text-[16px] font-black tracking-[0.25em] uppercase ${textColor} block mb-1.5`}>
                  {label}
                </span>
                <span className="text-[9px] md:text-[11px] font-mono text-zinc-300 uppercase tracking-[0.15em] whitespace-nowrap opacity-80">
                  {detail}
                </span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                exit={{ width: 0 }}
                className={`h-px mt-3 ${color === 'cyan' ? 'bg-neon-cyan shadow-[0_0_10px_#00f3ff]' : 'bg-neon-purple shadow-[0_0_10px_#9d00ff]'}`}
              />
            </motion.div>
          </foreignObject>
        )}
      </AnimatePresence>
    </>
  );
};

export default function IdentitySection() {
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#010101]">
      <div className="absolute inset-0 grid-bg-3d opacity-20" />

      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 w-full flex flex-col items-center"
      >
        <div
          className="relative w-full max-w-[900px] aspect-square group flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* SVG Layer for Stepped Lines */}
          <svg
            viewBox="-450 -450 900 900"
            className="absolute inset-0 w-full h-full z-20 pointer-events-none overflow-visible"
          >
            {/* UL: Cyan */}
            <CircuitLine
              points="M -80 -80 L -160 -160 H -260 L -340 -240"
              label="VISION_DRIVE"
              detail="Innovation // Creativity"
              color="cyan"
              isHovered={isHovered}
              labelPos={{ x: -340, y: -240 }}
              align="right"
              delay={0}
            />
            {/* UR: Purple */}
            <CircuitLine
              points="M 80 -80 L 160 -160 H 260 L 340 -240"
              label="TASK_FLOW"
              detail="Time Management // Organized"
              color="purple"
              isHovered={isHovered}
              labelPos={{ x: 340, y: -240 }}
              align="left"
              delay={0.1}
            />
            {/* LL: Purple */}
            <CircuitLine
              points="M -80 80 L -160 160 H -260 L -340 240"
              label="TEAM_SYNC"
              detail="Communication // Leadership"
              color="purple"
              isHovered={isHovered}
              labelPos={{ x: -340, y: 240 }}
              align="right"
              delay={0.2}
            />
            {/* LR: Cyan */}
            <CircuitLine
              points="M 80 80 L 160 160 H 260 L 340 240"
              label="LEARN_LOOP"
              detail="Continuous Growth // Adaptability"
              color="cyan"
              isHovered={isHovered}
              labelPos={{ x: 340, y: 240 }}
              align="left"
              delay={0.3}
            />
          </svg>

          {/* Image Container */}
          <div className="relative z-30 w-72 h-72 md:w-[450px] md:h-[450px] rounded-full overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,243,255,0.1)] transition-all duration-1000 group-hover:shadow-[0_0_180px_rgba(0,243,255,0.4)] cursor-crosshair">
            <Image
              src="/yugin.jpg"
              alt="Eugene L. Bulabog"
              fill
              priority
              className="object-cover scale-110 transition-all duration-1000 contrast-[1.1] brightness-110"
              style={{
                objectPosition: 'center 10%', // Move subject down to show head
                maskImage: 'radial-gradient(circle, black 65%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(circle, black 65%, transparent 100%)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#010101]/60 via-transparent to-transparent opacity-40 group-hover:opacity-0 transition-opacity duration-1000" />
          </div>

          {/* Decorative Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-[85%] h-[85%] border border-dashed border-white/10 rounded-full pointer-events-none z-10"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-[95%] h-[95%] border border-dashed border-neon-cyan/10 rounded-full pointer-events-none z-10"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center relative z-40"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 flex items-center gap-4 justify-center">
            <span className="w-12 h-px bg-neon-cyan hidden md:block" />
            Front-End <span className="text-neon-cyan">Developer</span>
            <span className="w-12 h-px bg-neon-cyan hidden md:block" />
          </h2>
          <p className="text-zinc-500 font-mono text-xs md:text-sm tracking-[0.8em] uppercase opacity-60">
            System ID: EUGENE_L_BULABOG // Node: 22.0.1
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
