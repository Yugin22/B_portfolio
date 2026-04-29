'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';
import { login } from '@/app/actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Magnetic from '@/components/Magnetic';

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result.success) {
      router.push('/admin/dashboard');
    } else if (result.error) {
      setError(result.error);
    }

    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-[#010101] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-neon-cyan/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-neon-purple/5 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl clay-card p-12 md:p-20 relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-20 h-20 rounded-[2rem] bg-white/[0.03] border border-white/5 flex items-center justify-center shadow-inner mb-8">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Secure Gateway</h1>
          <p className="text-zinc-500 font-medium tracking-tight">Enter your credentials to access the Neural Dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-8">
            <div>
              <label className="block text-[10px] font-black text-zinc-600 uppercase mb-4 tracking-[0.3em]">Access ID</label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-white/[0.01] border border-white/5 rounded-2xl p-6 outline-none focus:border-white/20 transition-all text-white font-medium shadow-inner"
                placeholder="admin@bulabog.dev"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-zinc-600 uppercase mb-4 tracking-[0.3em]">Neural Key</label>
              <input
                name="password"
                type="password"
                required
                className="w-full bg-white/[0.01] border border-white/5 rounded-2xl p-6 outline-none focus:border-white/20 transition-all text-white font-medium shadow-inner"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-500 text-center"
            >
              <p className="text-xs font-bold uppercase tracking-wider">{error}</p>
            </motion.div>
          )}

          <div className="flex flex-col gap-6">
            <Magnetic>
              <button
                disabled={isSubmitting}
                className="clay-btn w-full py-6 bg-white !text-black flex items-center justify-center gap-4"
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    Initialize Session
                    <ShieldCheck className="w-5 h-5" />
                  </>
                )}
              </button>
            </Magnetic>

            <Link href="/" className="text-center text-[10px] font-black text-zinc-600 uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2">
              <ArrowLeft className="w-3 h-3" />
              Return to Grid
            </Link>
          </div>
        </form>
      </motion.div>
    </main>
  );
}
