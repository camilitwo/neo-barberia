'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-background hero-minimal"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/1319459/pexels-photo-1319459.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt="Neo Barbería"
          fill
          priority
          className="object-cover scale-105 blur-[2px] opacity-70 motion-reduce:blur-0 motion-reduce:scale-100"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-black/90" />
        <div className="absolute inset-0 hero-grain pointer-events-none opacity-[0.12] mix-blend-overlay" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="relative z-10 text-center flex flex-col items-center justify-center leading-none select-none"
      >
        <h1 className="text-[clamp(3.5rem,12vw,6rem)] font-extrabold tracking-[-0.03em] text-white leading-[0.85] text-balance">
          Neo
        </h1>
        <h2 className="text-[clamp(3.5rem,12vw,6rem)] font-light tracking-[-0.03em] text-outline leading-[0.85] -mt-2 md:-mt-4 text-balance">
          Barbería
        </h2>
      </motion.div>

      <style jsx global>{`
        .hero-minimal .text-outline {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.9);
          color: transparent;
        }

        .hero-minimal .hero-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E");
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-minimal .hero-grain { display: none; }
        }
      `}</style>
    </section>
  );
}
