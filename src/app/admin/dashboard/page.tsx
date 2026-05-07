import React from 'react';
import { PROJECTS, CONTACTS, ANALYTICS } from '@/data/mockData';
import {
  LayoutDashboard,
  PlusCircle,
  MessageSquare,
  Eye,
  LogOut,
  FolderOpen
} from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const contacts = CONTACTS;
  const projects = PROJECTS;
  const analytics = ANALYTICS;
  const totalViews = analytics?.reduce((acc, curr) => acc + curr.view_count, 0) || 0;

  return (
    <main className="min-h-screen bg-[#030303] text-white">
      {/* Sidebar / Top Nav */}
      <nav className="border-b border-white/5 bg-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-neon-purple/20 flex items-center justify-center border border-neon-purple/30">
              <LayoutDashboard className="w-6 h-6 text-neon-purple" />
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase">Command Center</h1>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xs font-bold text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">
              View Site
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 rounded-sm border border-red-500/30 text-red-500 text-xs font-bold hover:bg-red-500 hover:text-white transition-all">
              <LogOut className="w-4 h-4" />
              TERMINATE
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass p-8 border-neon-cyan/20">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Total Data Ingest</p>
              <Eye className="w-4 h-4 text-neon-cyan" />
            </div>
            <p className="text-4xl font-black">{totalViews}</p>
            <p className="text-[10px] text-zinc-500 mt-2 font-bold uppercase">Total Page Views</p>
          </div>
          <div className="glass p-8 border-neon-purple/20">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active Operations</p>
              <FolderOpen className="w-4 h-4 text-neon-purple" />
            </div>
            <p className="text-4xl font-black">{projects?.length || 0}</p>
            <p className="text-[10px] text-zinc-500 mt-2 font-bold uppercase">Projects in DB</p>
          </div>
          <div className="glass p-8 border-neon-lime/20">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Incoming Signals</p>
              <MessageSquare className="w-4 h-4 text-neon-lime" />
            </div>
            <p className="text-4xl font-black">{contacts?.length || 0}</p>
            <p className="text-[10px] text-zinc-500 mt-2 font-bold uppercase">Form Submissions</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Projects Management */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                <PlusCircle className="text-neon-cyan" />
                Project Influx
              </h2>
            </div>

            <div className="space-y-4">
              {projects?.map((p) => (
                <div key={p.id} className="glass p-6 border-white/5 flex items-center justify-between hover:border-white/20 transition-all">
                  <div>
                    <h3 className="font-bold text-lg uppercase">{p.title}</h3>
                    <div className="flex gap-2 mt-1">
                      {p.tags?.slice(0, 3).map((t: string) => (
                        <span key={t} className="text-[8px] font-bold text-zinc-500 uppercase">#{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-[10px] font-bold bg-white/5 border border-white/10 hover:bg-white/10">EDIT</button>
                    <button className="px-3 py-1 text-[10px] font-bold bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white">DELETE</button>
                  </div>
                </div>
              ))}
              {projects?.length === 0 && (
                <div className="p-12 text-center glass border-dashed border-white/10 text-zinc-500 font-bold uppercase tracking-widest">
                  No records found in sector
                </div>
              )}
            </div>
          </div>

          {/* Recent Messages */}
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
              <MessageSquare className="text-neon-lime" />
              Recent Signals
            </h2>

            <div className="space-y-4">
              {contacts?.map((c) => (
                <div key={c.id} className="glass p-6 border-white/5 hover:border-neon-lime/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-neon-lime uppercase tracking-widest">{c.name}</span>
                    <span className="text-[10px] font-bold text-zinc-500">{new Date(c.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-zinc-300 text-sm italic">"{c.message}"</p>
                  <p className="text-[10px] font-bold text-zinc-600 mt-4 uppercase">Source: {c.email}</p>
                </div>
              ))}
              {contacts?.length === 0 && (
                <div className="p-12 text-center glass border-dashed border-white/10 text-zinc-500 font-bold uppercase tracking-widest">
                  Quiet on all frequencies
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
