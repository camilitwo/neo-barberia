'use client';

import { motion } from 'framer-motion';

interface FloatingBookingButtonProps {
  url: string;
}

export default function FloatingBookingButton({ url }: FloatingBookingButtonProps) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agenda tu cita"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.3, delay: 1, ease: [0.23, 1, 0.32, 1] }
      }}
      className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 z-50 border border-white/20 text-white font-bold uppercase py-4 px-6 flex items-center justify-between gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent bg-black/30 backdrop-blur-md booking-btn"
    >
      <span className="text-[12px] sm:text-sm tracking-[0.2em]">Agendar</span>
      <span className="text-lg booking-arrow">→</span>
    </motion.a>
  );
}
