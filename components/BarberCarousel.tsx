'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { Barber } from '@/data/barbers';

import CdnImage from '@/components/CdnImage';

interface BarberCarouselProps {
  barbers: Barber[];
}

export default function BarberCarousel({ barbers }: BarberCarouselProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const selectedBarber = barbers[selectedIndex] ?? barbers[0];
  const socialUrl = selectedBarber?.instagram || selectedBarber?.facebook;
  const socialLabel = selectedBarber?.instagram ? 'Instagram' : selectedBarber?.facebook ? 'Facebook' : '';

  useEffect(() => {
    if (barbers.length <= 1) return;
    if (isPaused) return;

    const id = window.setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % barbers.length);
    }, 4500);

    return () => window.clearInterval(id);
  }, [barbers.length, isPaused]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  return (
    <section
      id="equipo"
      ref={ref}
      className="relative pt-16 pb-32 sm:py-20 md:py-28 px-4 bg-background overflow-hidden team-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 z-0 grain-overlay pointer-events-none">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={barbers[selectedIndex]?.id ?? selectedIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <CdnImage
              src={barbers[selectedIndex]?.imagen ?? barbers[0]?.imagen}
              alt={barbers[selectedIndex]?.nombre ?? barbers[0]?.nombre ?? 'Neo Barbería - Barbero'}
              fill
              sizes="100vw"
              className="w-full h-full object-cover object-[50%_18%] grayscale contrast-125 brightness-50"
              priority
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 max-w-7xl mx-auto"
      >
        <div className="relative min-h-[60vh] flex flex-col justify-center py-10">
          <h2 className="text-xs font-bold text-muted uppercase tracking-[0.2em] mb-8 ml-1">
            Nuestro Equipo
          </h2>

          <div className="flex flex-col space-y-2 relative z-20">
            {barbers.map((barber, index) => (
              <div key={barber.id} className="group relative">
                <input
                  className="hidden peer"
                  id={`barber-${barber.id}`}
                  name="barber"
                  type="radio"
                  checked={selectedIndex === index}
                  onChange={() => setSelectedIndex(index)}
                />
                <label
                  className="relative z-10 block cursor-pointer py-4 border-b border-white/10 hover:border-primary/50 transition-colors"
                  htmlFor={`barber-${barber.id}`}
                >
                  <span
                    className={`barber-name text-5xl md:text-6xl font-extrabold tracking-tighter block transition-colors ${
                      selectedIndex === index
                        ? 'text-primary'
                        : 'text-white/90 group-hover:text-white'
                    }`}
                  >
                    {barber.apodo.toUpperCase()}
                  </span>

                  <span
                    className={`text-sm font-mono text-gray-500 mt-2 block transition-opacity ${
                      selectedIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {barber.especialidad} / {(index + 1).toString().padStart(2, '0')}
                  </span>
                </label>
              </div>
            ))}
          </div>

          {socialUrl && (
            <>
              <motion.a
                href={socialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver ${socialLabel} de ${selectedBarber?.apodo ?? 'barbero'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-8 sm:hidden inline-flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-[11px] underline underline-offset-8 decoration-primary/40 hover:decoration-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                <span>Ver {socialLabel}</span>
                <span className="text-base">→</span>
              </motion.a>

              <motion.a
                href={socialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver ${socialLabel} de ${selectedBarber?.apodo ?? 'barbero'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="hidden sm:mt-10 sm:inline-flex items-center justify-between gap-4 border border-primary/60 text-primary font-bold uppercase py-3.5 px-6 hover:bg-primary hover:text-black transition-colors duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent w-fit"
              >
                <span className="text-[11px] tracking-[0.2em]">Ver {socialLabel}</span>
                <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
              </motion.a>
            </>
          )}
        </div>
      </motion.div>

      <style jsx global>{`
        .team-section .grain-overlay::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E");
          pointer-events: none;
          mix-blend-mode: overlay;
          z-index: 10;
        }

        .team-section input[type='radio']:checked + label .barber-name {
          transform: translateX(20px);
        }

        .team-section .barber-name {
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), color 0.2s ease;
        }
      `}</style>
    </section>
  );
}
