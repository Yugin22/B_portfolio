'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Terminal, User, Briefcase, Mail, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Magnetic from './Magnetic';

const navItems = [
  { name: 'Projects', href: '#projects', icon: Briefcase },
  { name: 'About', href: '#about', icon: User },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${isScrolled ? 'py-4 glass border-b border-white/[0.05]' : 'py-6 md:py-8 bg-transparent'
        }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Magnetic>
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover:border-neon-cyan/50 transition-all duration-500">
              <Terminal className="w-4 h-4 text-white group-hover:text-neon-cyan transition-colors" />
            </div>
            <span className="text-sm font-black tracking-[0.4em] text-white uppercase">
              BULABOG<span className="text-neon-cyan">.</span>DEV
            </span>
          </Link>
        </Magnetic>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-12">
          {navItems.map((item) => (
            <Magnetic key={item.name}>
              <Link
                href={item.href}
                className="text-[10px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em]"
              >
                {item.name}
              </Link>
            </Magnetic>
          ))}

          <div className="w-px h-4 bg-white/10" />

          <Magnetic>
            <Link
              href="#contact"
              className="px-8 py-2.5 rounded-full border border-white/10 hover:border-white/30 hover:bg-white hover:text-black text-[10px] font-black uppercase tracking-widest transition-all duration-500"
            >
              Hire Me
            </Link>
          </Magnetic>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-t border-white/5 p-8 flex flex-col gap-6 lg:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-black text-zinc-500 hover:text-white transition-colors uppercase tracking-tighter"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 rounded-2xl bg-white text-black text-center font-black uppercase tracking-widest text-xs"
            >
              HIRE ME
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
