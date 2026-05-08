'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Layers, Terminal as TerminalIcon, ShieldCheck, Database } from 'lucide-react';
import Image from 'next/image';

export default function BentoAbout() {
  return (
    <section id="about" className="py-24 md:py-60 relative bg-[#010101]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col mb-16 md:mb-24 text-center items-center">
          <div className="flex items-center gap-4 text-neon-cyan font-mono text-[10px] md:text-[11px] tracking-[0.4em] uppercase mb-6 md:mb-8">
            <Layers className="w-4 h-4" />
            Core Architecture
          </div>
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.85]">
            SYSTEM <br /> <span className="text-zinc-900 italic">PHILOSOPHY</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">

          {/* Main Card */}
          <div className="md:col-span-8 md:row-span-2 clay-card group relative overflow-hidden flex flex-col">
            <div className="relative w-full h-[250px] md:h-[400px] overflow-hidden group-hover:scale-[1.01] transition-transform duration-700">
              <Image 
                src="/yugin.jpg" 
                alt="Eugene L. Bulabog" 
                fill 
                className="object-cover object-[center_20%]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-transparent to-transparent opacity-60" />
              
              <div className="absolute top-6 left-6 flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center">
                  <TerminalIcon className="text-white w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 relative z-10 flex-grow flex flex-col justify-center">
              <h3 className="text-4xl md:text-6xl font-black mb-4 md:mb-6 tracking-tighter uppercase leading-none text-white">Eugene L. Bulabog</h3>
              <div className="space-y-4 md:space-y-6 text-zinc-500 text-lg md:text-xl lg:text-2xl leading-snug max-w-3xl font-medium">
                <p>
                  I design digital ecosystems that prioritize human interaction
                  through tactile, claymorphic aesthetics and rigid full-stack reliability.
                </p>
                <p>
                  From <span className="text-white">Next.js 15</span> orchestration to
                  <span className="text-white"> Optimized</span> static layers,
                  I build products that feel alive under the user&apos;s touch.
                </p>
              </div>
            </div>

            <div className="absolute bottom-[-5%] right-[-5%] opacity-[0.01] group-hover:opacity-[0.03] transition-opacity pointer-events-none hidden md:block">
              <Cpu className="w-[400px] h-[400px]" />
            </div>
          </div>

          {/* Skills: Frontend - FIXED HEIGHT & ALIGNMENT */}
          <div className="md:col-span-4 clay-card group p-8 md:p-10 flex flex-col h-fit">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <ShieldCheck className="text-neon-cyan w-6 h-6" />
              <span className="text-xs font-black tracking-[0.3em] uppercase text-neon-cyan">Frontend Stack</span>
            </div>
            <div className="flex flex-wrap gap-3 md:gap-4 items-start content-start">
              {['Next.js', 'React', 'Tailwind', 'Motion', 'Typescript'].map(tech => (
                <span key={tech} className="px-4 py-2 h-fit inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-[10px] md:text-[12px] font-black text-white hover:text-neon-cyan transition-all shadow-inner whitespace-nowrap">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Skills: Backend - FIXED HEIGHT & ALIGNMENT */}
          <div className="md:col-span-4 clay-card group p-8 md:p-10 flex flex-col h-fit">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <Database className="text-neon-purple w-6 h-6" />
              <span className="text-xs font-black tracking-[0.3em] uppercase text-neon-purple">Backend Stack</span>
            </div>
            <div className="flex flex-wrap gap-3 md:gap-4 items-start content-start">
              {['Postgres', 'Node.js', 'Prisma', 'Auth', 'JSON'].map(tech => (
                <span key={tech} className="px-4 py-2 h-fit inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-[10px] md:text-[12px] font-black text-white hover:text-neon-purple transition-all shadow-inner whitespace-nowrap">
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
