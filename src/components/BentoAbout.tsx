'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe2, Cpu, Zap, Activity, Layers, Terminal as TerminalIcon, ShieldCheck, Database } from 'lucide-react';

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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 md:auto-rows-[350px]">
          
          {/* Main Card */}
          <div className="md:col-span-8 md:row-span-2 clay-card group relative p-8 md:p-12 min-h-[400px] md:min-h-0">
            <div className="flex flex-col h-full justify-between relative z-10">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1.5rem] md:rounded-[2rem] bg-white/[0.03] flex items-center justify-center border border-white/5 shadow-inner mb-8 md:mb-12">
                <TerminalIcon className="text-white w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div>
                <h3 className="text-3xl md:text-5xl font-black mb-6 md:mb-8 tracking-tighter uppercase">Eugene L. Bulabog</h3>
                <div className="space-y-6 md:space-y-8 text-zinc-500 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl font-medium">
                  <p>
                    I design digital ecosystems that prioritize human interaction 
                    through tactile, claymorphic aesthetics and rigid full-stack reliability.
                  </p>
                  <p>
                    From <span className="text-white">Next.js 15</span> orchestration to 
                    <span className="text-neon-cyan"> Optimized</span> static layers, 
                    I build products that feel alive under the user's touch.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-[-10%] right-[-5%] opacity-[0.01] group-hover:opacity-[0.03] transition-opacity pointer-events-none hidden md:block">
              <Cpu className="w-[500px] h-[500px]" />
            </div>
          </div>

          {/* Skills: Frontend */}
          <div className="md:col-span-4 clay-card group p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6 md:mb-10">
              <ShieldCheck className="text-neon-cyan w-5 h-5" />
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-600">Frontend Stack</span>
            </div>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {['Next.js', 'React', 'Tailwind', 'Motion', 'Typescript'].map(tech => (
                <span key={tech} className="px-3 md:px-4 py-1.5 md:py-2 rounded-xl border border-white/5 bg-white/[0.01] text-[9px] md:text-[10px] font-black text-zinc-500 hover:text-white transition-all shadow-inner">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Skills: Backend */}
          <div className="md:col-span-4 clay-card group p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6 md:mb-10">
              <Database className="text-neon-purple w-5 h-5" />
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-600">Backend Stack</span>
            </div>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {['Postgres', 'Node.js', 'Prisma', 'Auth', 'JSON'].map(tech => (
                <span key={tech} className="px-3 md:px-4 py-1.5 md:py-2 rounded-xl border border-white/5 bg-white/[0.01] text-[9px] md:text-[10px] font-black text-zinc-500 hover:text-white transition-all shadow-inner">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="md:col-span-4 clay-card flex flex-col justify-between p-8 md:p-10 border-neon-lime/5 min-h-[200px] md:min-h-0">
            <div className="flex justify-between items-start">
              <Activity className="text-zinc-900 w-8 h-8" />
              <div className="flex items-center gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-neon-lime/10 border border-neon-lime/20 shadow-inner">
                <div className="w-2 h-2 rounded-full bg-neon-lime animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-black text-neon-lime uppercase tracking-widest">Available Now</span>
              </div>
            </div>
            <div>
              <h4 className="font-black text-lg md:text-xl tracking-tight uppercase leading-none">GLOBAL NETWORK</h4>
              <p className="text-[9px] md:text-[10px] font-mono text-zinc-600 mt-2 md:mt-3 uppercase tracking-widest">Manila // Remote Node</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
