'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe2, Cpu, Zap, Activity, Layers, Terminal as TerminalIcon, ShieldCheck, Database } from 'lucide-react';

export default function BentoAbout() {
  return (
    <section id="about" className="py-60 relative bg-[#010101]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col mb-24 text-center items-center">
          <div className="flex items-center gap-4 text-neon-cyan font-mono text-[11px] tracking-[0.4em] uppercase mb-8">
            <Layers className="w-4 h-4" />
            Core Architecture
          </div>
          <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.85]">
            SYSTEM <br /> <span className="text-zinc-900 italic">PHILOSOPHY</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[350px]">
          
          {/* Main Card */}
          <div className="md:col-span-8 md:row-span-2 clay-card group relative p-12">
            <div className="flex flex-col h-full justify-between relative z-10">
              <div className="w-16 h-16 rounded-[2rem] bg-white/[0.03] flex items-center justify-center border border-white/5 shadow-inner mb-12">
                <TerminalIcon className="text-white w-8 h-8" />
              </div>
              <div>
                <h3 className="text-5xl font-black mb-8 tracking-tighter uppercase">Eugene L. Bulabog</h3>
                <div className="space-y-8 text-zinc-500 text-xl md:text-2xl leading-relaxed max-w-2xl font-medium">
                  <p>
                    I design digital ecosystems that prioritize human interaction 
                    through tactile, claymorphic aesthetics and rigid full-stack reliability.
                  </p>
                  <p>
                    From <span className="text-white">Next.js 15</span> orchestration to 
                    <span className="text-neon-cyan"> Supabase</span> real-time layers, 
                    I build products that feel alive under the user's touch.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-[-10%] right-[-5%] opacity-[0.01] group-hover:opacity-[0.03] transition-opacity pointer-events-none">
              <Cpu className="w-[500px] h-[500px]" />
            </div>
          </div>

          {/* Skills: Frontend */}
          <div className="md:col-span-4 clay-card group p-10">
            <div className="flex items-center gap-3 mb-10">
              <ShieldCheck className="text-neon-cyan w-5 h-5" />
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-600">Frontend Stack</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {['Next.js', 'React', 'Tailwind', 'Motion', 'Typescript'].map(tech => (
                <span key={tech} className="px-4 py-2 rounded-xl border border-white/5 bg-white/[0.01] text-[10px] font-black text-zinc-500 hover:text-white transition-all shadow-inner">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Skills: Backend */}
          <div className="md:col-span-4 clay-card group p-10">
            <div className="flex items-center gap-3 mb-10">
              <Database className="text-neon-purple w-5 h-5" />
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-zinc-600">Backend Stack</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {['Supabase', 'Postgres', 'Node.js', 'Prisma', 'Auth'].map(tech => (
                <span key={tech} className="px-4 py-2 rounded-xl border border-white/5 bg-white/[0.01] text-[10px] font-black text-zinc-500 hover:text-white transition-all shadow-inner">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="md:col-span-4 clay-card flex flex-col justify-between p-10 border-neon-lime/5">
            <div className="flex justify-between items-start">
              <Activity className="text-zinc-900 w-8 h-8" />
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-neon-lime/10 border border-neon-lime/20 shadow-inner">
                <div className="w-2 h-2 rounded-full bg-neon-lime animate-pulse" />
                <span className="text-[10px] font-black text-neon-lime uppercase tracking-widest">Available Now</span>
              </div>
            </div>
            <div>
              <h4 className="font-black text-xl tracking-tight uppercase leading-none">GLOBAL NETWORK</h4>
              <p className="text-[10px] font-mono text-zinc-600 mt-3 uppercase tracking-widest">Manila // Remote Node</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
