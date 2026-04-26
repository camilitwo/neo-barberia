'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background hero-minimal"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/1319459/pexels-photo-1319459.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          alt="Neo Barbería"
          fill
          priority
          className="object-cover scale-105 blur-[2px] opacity-70"
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
        <h1 className="text-[clamp(5rem,20vw,12rem)] font-extrabold tracking-tighter text-white leading-[0.8]">
          Neo
        </h1>
        <h2 className="text-[clamp(5rem,20vw,12rem)] font-light tracking-tighter text-outline leading-[0.8] -mt-2 md:-mt-6">
          Barbería
        </h2>

        {/* CTA Buttons - Maximum Conversion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/planes"
            className="group relative px-8 py-4 bg-primary text-black font-black text-[11px] tracking-[0.3em] uppercase rounded-full overflow-hidden shadow-[0_0_40px_rgba(230,180,100,0.4)] hover:shadow-[0_0_60px_rgba(230,180,100,0.6)] transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="relative z-10 flex items-center gap-2">
              Ver Planes
              <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
          <a
            href="https://neooc2b.setmore.com/?fbclid=PAZXh0bgNhZW0CMTEAAaaOGfb00uDJuEsMw9NMHy2Da7Qy6sfgyZHYMtwgSEj_5R3HK1mp4I51bxU_aem_ZEFdpvIRt2yhMVwlxEbhQg#services"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-white/30 text-white font-bold text-[11px] tracking-[0.3em] uppercase rounded-full hover:bg-white hover:text-black transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Reservar Ahora
          </a>
        </motion.div>

        {/* Social proof hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 text-[10px] text-white/50 uppercase tracking-[0.2em]"
        >
          Desde $12.000 · 4.9★ (150+ reseñas)
        </motion.p>
      </motion.div>

      <style jsx global>{`
        .hero-minimal .text-outline {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.9);
          color: transparent;
        }

        .hero-minimal .hero-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E");
        }
      `}</style>
    </section>
  );
}
