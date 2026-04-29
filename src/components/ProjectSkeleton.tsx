'use client';

import React from 'react';

export default function ProjectSkeleton() {
  return (
    <div className="glass border-white/5 overflow-hidden animate-pulse">
      <div className="h-64 w-full bg-white/5" />
      <div className="p-8">
        <div className="flex gap-2 mb-4">
          <div className="w-12 h-3 bg-white/5 rounded" />
          <div className="w-12 h-3 bg-white/5 rounded" />
        </div>
        <div className="w-3/4 h-8 bg-white/10 rounded mb-4" />
        <div className="w-full h-4 bg-white/5 rounded mb-2" />
        <div className="w-2/3 h-4 bg-white/5 rounded mb-8" />
        <div className="pt-6 border-t border-white/5 flex justify-between items-center">
          <div className="flex gap-4">
            <div className="w-5 h-5 bg-white/5 rounded-full" />
            <div className="w-5 h-5 bg-white/5 rounded-full" />
          </div>
          <div className="w-24 h-4 bg-white/5 rounded" />
        </div>
      </div>
    </div>
  );
}
