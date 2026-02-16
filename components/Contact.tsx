'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SiInstagram, SiTiktok, SiWhatsapp } from 'react-icons/si';

export default function Contact() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  // Links
  const instagramUrl = 'https://www.instagram.com/neobarberia.cl/';
  const tiktokUrl = 'https://www.tiktok.com/@neo.barberia.cl';
  const whatsappNumber = '56923726076'; // sin signos ni espacios
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola NeoBarberia!')}`;
  const mapsDirections = 'https://www.google.com/maps/dir/?api=1&destination=-33.35871917342603,-70.73995452397547';
  const email = 'contacto@neobarberia.cl';

  return (
    <section
      id="contacto"
      ref={ref}
      className="relative py-16 sm:py-20 md:py-28 px-4 bg-background overflow-hidden contact-section"
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10 max-w-7xl mx-auto"
      >
        <div className="relative px-2 sm:px-6 pb-12 pt-4">
          <motion.div variants={itemVariants} className="flex-none pt-4 pb-12">
            <h2 className="text-[18vw] sm:text-[10vw] leading-[0.85] font-extrabold text-outline uppercase tracking-tighter mix-blend-overlay opacity-90">
              Quilicura,
              <br />
              Santiago
            </h2>
          </motion.div>

          <div className="flex flex-col justify-end space-y-12 relative">
            <motion.div variants={itemVariants} className="space-y-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] block border-l-2 border-primary pl-3">
                Address
              </span>
              <div className="pl-4">
                <p className="text-2xl font-light text-gray-100">Quilicura, Santiago</p>
                <p className="text-2xl font-light text-gray-100">Chile</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3 pb-8">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] block border-l-2 border-primary pl-3">
                Contact
              </span>
              <div className="pl-4 flex flex-col items-start space-y-2">
                <a
                  className="text-xl text-gray-200 hover:text-primary transition-colors border-b border-white/10 pb-1"
                  href={`mailto:${email}`}
                >
                  {email}
                </a>
                <a
                  className="text-xl text-gray-200 hover:text-primary transition-colors border-b border-white/10 pb-1"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +56 9 2372 6076
                </a>
              </div>

              <div className="pl-4 pt-6 flex items-center gap-4">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Instagram"
                >
                  <SiInstagram className="w-5 h-5" aria-hidden />
                </a>
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="TikTok"
                >
                  <SiTiktok className="w-5 h-5" aria-hidden />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="WhatsApp"
                >
                  <SiWhatsapp className="w-5 h-5" aria-hidden />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex justify-center sm:mt-0 sm:block sm:absolute sm:right-6 sm:top-1/2 sm:-translate-y-1/2 z-20"
          >
            <a
              href={mapsDirections}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-primary text-black shadow-[0_20px_50px_rgba(230,180,100,0.25)] flex items-center justify-center hover:scale-105 transition-transform duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Cómo llegar"
            >
              <span className="text-2xl sm:text-4xl transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">↗</span>
            </a>
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary whitespace-nowrap opacity-80">
              Cómo llegar
            </span>
          </motion.div>
        </div>
      </motion.div>

      <style jsx global>{`
        .contact-section .text-outline {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.8);
          color: transparent;
        }
      `}</style>
    </section>
  );
}
