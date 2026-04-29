'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { incrementPageView } from '@/app/actions';

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    incrementPageView(pathname);
  }, [pathname]);

  return null;
}
