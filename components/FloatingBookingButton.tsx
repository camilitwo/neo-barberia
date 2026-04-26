'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const bookingUrl = 'https://neooc2b.setmore.com/?fbclid=PAZXh0bgNhZW0CMTEAAaaOGfb00uDJuEsMw9NMHy2Da7Qy6sfgyZHYMtwgSEj_5R3HK1mp4I51bxU_aem_ZEFdpvIRt2yhMVwlxEbhQg#services';

export default function FloatingBookingButton() {
  return (
    <motion.div
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
      className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 z-50 flex flex-col items-end gap-2"
    >
      {/* Ver Planes link */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
      >
        <Link
          href="/planes"
          className="text-[9px] text-gray-400 hover:text-primary font-bold tracking-[0.2em] uppercase bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full transition-colors"
        >
          Ver Planes
        </Link>
      </motion.div>

      {/* Main CTA - Agenda directa */}
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group bg-primary text-black font-black uppercase py-4 px-6 sm:py-5 sm:px-8 rounded-full shadow-[0_0_40px_rgba(230,180,100,0.4)] hover:shadow-[0_0_60px_rgba(230,180,100,0.6)] transition-all duration-300 flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent hover:scale-[1.02] active:scale-[0.98]"
      >
        <span className="text-[11px] sm:text-xs tracking-[0.25em]">Agendar</span>
        <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
      </a>
    </motion.div>
  );
}
