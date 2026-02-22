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
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: 1,
        }
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 z-50 border border-white/20 text-white font-bold uppercase py-4 px-6 hover:bg-white hover:text-black transition-colors duration-300 flex items-center justify-between gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent bg-black/30 backdrop-blur-md"
    >
      <span className="text-[12px] sm:text-sm tracking-[0.2em]">Agendar</span>
      <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
    </motion.a>
  );
}
