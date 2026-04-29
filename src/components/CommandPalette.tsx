'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Home, Briefcase, Mail, LogIn, X, Terminal } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const commands = [
    { name: 'Home', icon: Home, action: () => router.push('/') },
    { name: 'View Projects', icon: Briefcase, action: () => router.push('#projects') },
    { name: 'Contact Me', icon: Mail, action: () => router.push('#contact') },
    { name: 'Admin Dashboard', icon: Terminal, action: () => router.push('/admin/dashboard') },
    { name: 'Admin Login', icon: LogIn, action: () => router.push('/admin/login') },
  ];

  const filteredCommands = commands.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-xl glass border-white/10 relative overflow-hidden flex flex-col"
          >
            <div className="p-4 border-b border-white/10 flex items-center gap-4">
              <Search className="w-5 h-5 text-zinc-500" />
              <input
                autoFocus
                className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-zinc-600"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-zinc-500 font-bold">
                ESC
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, i) => (
                  <button
                    key={i}
                    onClick={() => handleAction(cmd.action)}
                    className="w-full flex items-center gap-4 p-4 rounded-lg hover:bg-neon-cyan/10 hover:text-neon-cyan transition-all text-zinc-400 text-left group"
                  >
                    <cmd.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-bold uppercase tracking-widest text-sm">{cmd.name}</span>
                    <span className="ml-auto text-[10px] text-zinc-700 font-black">ACTION</span>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-zinc-600 uppercase font-bold text-xs tracking-widest">
                  No commands found matching "{query}"
                </div>
              )}
            </div>

            <div className="p-4 bg-white/5 border-t border-white/10 flex items-center justify-between text-[10px] font-bold text-zinc-500 tracking-widest uppercase">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><Command className="w-3 h-3" /> + K TO TOGGLE</span>
              </div>
              <span>PORTFOLIO.OS v1.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
