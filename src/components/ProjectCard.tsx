'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const Github = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

interface ProjectProps {
  project: {
    id: string;
    title: string;
    description: string;
    image_url: string;
    live_url: string;
    repo_url: string;
    tags: string[];
  };
}

export default function ProjectCard({ project }: ProjectProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="clay-card group relative p-2 pb-10 md:pb-16 overflow-hidden perspective-1000"
    >
      {/* Dynamic Glow that follows mouse */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: useTransform(
            [mouseXSpring, mouseYSpring],
            ([x, y]) => `radial-gradient(600px circle at ${((x as number) + 0.5) * 100}% ${((y as number) + 0.5) * 100}%, rgba(0, 243, 255, 0.05), transparent 40%)`
          ),
        }}
      />

      <div style={{ transform: "translateZ(80px)" }} className="relative z-10 transition-transform duration-500">
        <div className="relative h-60 md:h-80 w-full overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] mb-8 md:mb-12 shadow-2xl">
          <Image
            src={project.image_url || '/placeholder.jpg'}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-70 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010101]/90 via-transparent to-transparent" />
        </div>

        <div className="px-6 md:px-12">
          <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-10">
            {project.tags?.map((tag) => (
              <span key={tag} className="text-[9px] md:text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em] md:tracking-[0.3em] border border-white/[0.05] bg-white/[0.02] px-3 md:px-5 py-1.5 md:py-2 rounded-xl md:rounded-2xl shadow-inner">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase leading-none drop-shadow-lg">
              {project.title}
            </h3>
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-[1rem] md:rounded-[1.5rem] clay-btn !p-0 flex items-center justify-center group-hover:text-neon-cyan transition-all">
              <ArrowUpRight className="w-5 h-5 md:w-7 md:h-7" />
            </div>
          </div>

          <p className="text-zinc-500 text-base md:text-xl mb-10 md:mb-14 leading-relaxed line-clamp-2 font-medium tracking-tight">
            {project.description}
          </p>

        </div>
      </div>

      {/* Shine Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}
