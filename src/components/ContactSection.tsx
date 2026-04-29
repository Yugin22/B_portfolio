'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactForm } from '@/app/actions';

const Github = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);

    if (result.success) {
      setStatus({ type: 'success', message: result.success });
      (e.target as HTMLFormElement).reset();
    } else if (result.error) {
      setStatus({ type: 'error', message: result.error });
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-60 relative overflow-hidden bg-[#010101]">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            
            <div>
              <h2 className="text-7xl md:text-9xl font-black mb-12 uppercase tracking-tighter leading-[0.8]">
                LET&apos;S <br />
                <span className="text-gradient">CONNECT.</span>
              </h2>
              
              <p className="text-zinc-500 text-xl mb-16 max-w-md leading-relaxed font-medium">
                Designing the future requires collaboration. My terminal is open for 
                SaaS deployments and elite full-stack roles.
              </p>

              <div className="space-y-8">
                <a href="mailto:hello@bulabog.dev" className="inline-block text-3xl font-black hover:text-neon-cyan transition-colors tracking-tighter">
                  hello@bulabog.dev
                </a>

                <div className="flex gap-6">
                  <a href="https://github.com" target="_blank" className="p-6 clay-card !rounded-[2rem] hover:border-white/20">
                    <Github className="w-6 h-6 text-zinc-500" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" className="p-6 clay-card !rounded-[2rem] hover:border-white/20">
                    <Linkedin className="w-6 h-6 text-zinc-500" />
                  </a>
                </div>
              </div>
            </div>

            <div className="clay-card p-12 md:p-20 relative overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-8">
                  <div>
                    <label className="block text-[10px] font-black text-zinc-600 uppercase mb-4 tracking-[0.3em]">Full Name</label>
                    <input
                      name="name"
                      type="text"
                      required
                      className="w-full bg-white/[0.01] border border-white/5 rounded-2xl p-6 outline-none focus:border-white/20 transition-all text-white font-medium shadow-inner"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-zinc-600 uppercase mb-4 tracking-[0.3em]">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full bg-white/[0.01] border border-white/5 rounded-2xl p-6 outline-none focus:border-white/20 transition-all text-white font-medium shadow-inner"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-zinc-600 uppercase mb-4 tracking-[0.3em]">Mission Details</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-white/[0.01] border border-white/5 rounded-2xl p-6 outline-none focus:border-white/20 transition-all text-white font-medium shadow-inner resize-none"
                    placeholder="Message..."
                  />
                </div>

                <button
                  disabled={isSubmitting}
                  className="clay-btn w-full py-6 bg-white !text-black flex items-center justify-center gap-4 hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      Transmit Package
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>

                {status && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-6 rounded-2xl border shadow-inner ${
                      status.type === 'success' ? 'border-neon-lime/20 bg-neon-lime/5 text-neon-lime' : 'border-red-500/20 bg-red-500/5 text-red-500'
                    }`}
                  >
                    <p className="text-[10px] font-black uppercase tracking-widest text-center">{status.message}</p>
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
