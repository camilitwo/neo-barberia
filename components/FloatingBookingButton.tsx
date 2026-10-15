'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingBookingButtonProps {
  url: string;
  deferUntilScrolled?: boolean;
}

export default function FloatingBookingButton({ url, deferUntilScrolled = false }: FloatingBookingButtonProps) {
  const [shouldShow, setShouldShow] = useState(!deferUntilScrolled);

  useEffect(() => {
    if (!deferUntilScrolled) {
      setShouldShow(true);
      return;
    }

    const handleScroll = () => {
      setShouldShow(window.scrollY > window.innerHeight * 0.72);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [deferUntilScrolled]);

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agenda tu cita"
      initial={{ opacity: 0, y: 8 }}
      animate={{
        opacity: shouldShow ? 1 : 0,
        y: shouldShow ? 0 : 8,
        pointerEvents: shouldShow ? 'auto' : 'none',
        transition: { duration: 0.25, delay: shouldShow ? 0.15 : 0, ease: [0.23, 1, 0.32, 1] }
      }}
      className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 z-50 border border-white/20 text-white font-bold uppercase py-4 px-6 flex items-center justify-between gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent bg-black/30 backdrop-blur-md booking-btn"
    >
      <span className="text-[12px] sm:text-sm tracking-[0.2em]">Agendar</span>
      <span className="text-lg booking-arrow">→</span>
    </motion.a>
  );
}
