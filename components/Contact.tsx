'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SiInstagram, SiTiktok, SiWhatsapp } from 'react-icons/si';

export default function Contact() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.07,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  // Links
  const instagramUrl = 'https://www.instagram.com/neobarberia.cl/';
  const tiktokUrl = 'https://www.tiktok.com/@neo.barberia.cl';
  const whatsappNumber = '56923726076'; // sin signos ni espacios
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola NeoBarberia!')}`;
  const mapsDirections = 'https://www.google.com/maps/place/NEOBARBERIA/@-33.3587192,-70.7399545,17z/data=!3m1!4b1!4m6!3m5!1s0x9662c17ea1e163d9:0x2d3c52ec810800c9!8m2!3d-33.3587192!4d-70.7373796!16s%2Fg%2F11l33c9gmr?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D';
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
            <h2 className="text-[clamp(2.5rem,10vw,6rem)] leading-[0.9] font-extrabold text-outline uppercase tracking-[-0.03em] mix-blend-overlay opacity-90 text-balance">
              Quilicura,
              <br />
              Santiago
            </h2>
          </motion.div>

          <div className="flex flex-col justify-end space-y-12 relative">
            <motion.div variants={itemVariants} className="space-y-3">
              <span className="text-sm font-medium text-gray-400 block mb-2">
                Dirección
              </span>
              <div>
                <p className="text-2xl font-light text-gray-100">Quilicura, Santiago</p>
                <p className="text-2xl font-light text-gray-100">Chile</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3 pb-8">
              <span className="text-sm font-medium text-gray-400 block mb-2">
                Contacto
              </span>
              <div className="flex flex-col items-start space-y-2">
                <a
                  className="text-xl text-gray-200 hover:text-primary transition-colors duration-200 ease-out border-b border-white/10 pb-1 active:scale-[0.97]"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +56 9 2372 6076
                </a>
              </div>

              <div className="pt-6 flex items-center gap-4">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.95] will-change-transform"
                  aria-label="Instagram"
                >
                  <SiInstagram className="w-5 h-5 transition-transform duration-200 ease-out" aria-hidden />
                </a>
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.95] will-change-transform"
                  aria-label="TikTok"
                >
                  <SiTiktok className="w-5 h-5 transition-transform duration-200 ease-out" aria-hidden />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.95] will-change-transform"
                  aria-label="WhatsApp"
                >
                  <SiWhatsapp className="w-5 h-5 transition-transform duration-200 ease-out" aria-hidden />
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
              className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-primary text-black shadow-[0_20px_50px_rgba(230,180,100,0.25)] flex items-center justify-center transition-transform duration-200 ease-out group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent will-change-transform active:scale-[0.95] contact-maps-btn"
              aria-label="Cómo llegar"
            >
              <span className="text-2xl sm:text-4xl transform -rotate-45 group-hover:rotate-0 transition-transform duration-200 ease-out">↗</span>
            </a>
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-4 text-[11px] font-medium text-primary whitespace-nowrap opacity-80">
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
        @media (hover: hover) and (pointer: fine) {
          .contact-section .contact-maps-btn:hover {
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  );
}
