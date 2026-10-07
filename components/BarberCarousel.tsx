'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { SiInstagram } from 'react-icons/si';

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
  const hasInstagram = Boolean(selectedBarber?.instagram);

  useEffect(() => {
    if (barbers.length <= 1) return;
    if (isPaused) return;

    const id = window.setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % barbers.length);
    }, 4500);

    return () => window.clearInterval(id);
  }, [barbers.length, isPaused]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <section
      id="equipo"
      ref={ref}
      className="relative px-4 py-20 sm:py-24 md:py-28 bg-background overflow-hidden team-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 z-0 grain-overlay pointer-events-none">
        {barbers.map((barber, index) => {
          const isSelected = selectedIndex === index;

          return (
            <motion.div
              key={barber.id}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: isSelected ? 1 : 0,
                scale: isSelected ? 1 : 1.035,
                filter: isSelected ? 'blur(0px)' : 'blur(8px)',
              }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <CdnImage
                src={barber.imagen}
                alt={barber.nombre}
                fill
                sizes="100vw"
                className="w-full h-full object-cover grayscale contrast-125 brightness-50"
                style={{ objectPosition: barber.imagePosition ?? '50% 18%' }}
                priority={index === 0}
              />
            </motion.div>
          );
        })}
        <div className="absolute inset-0 opacity-0 pointer-events-none">
          {barbers.map((barber) => (
            <CdnImage
              key={`preload-${barber.id}`}
              src={barber.imagen}
              alt=""
              width={32}
              height={40}
              aria-hidden="true"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/72 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 max-w-7xl mx-auto"
      >
        <div className="relative min-h-[68vh] grid grid-cols-1 gap-10 py-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(300px,0.56fr)] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold text-primary">Nuestro equipo</p>
            <h2 className="max-w-3xl text-[clamp(2.45rem,6.8vw,4.85rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-white text-balance">
              Elige el pulso de tu próximo corte.
            </h2>

            <div className="mt-10 flex flex-col relative z-20 border-t border-white/12">
              {barbers.map((barber, index) => {
                const isSelected = selectedIndex === index;

                return (
                  <button
                    key={barber.id}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className="group relative grid w-full grid-cols-[1fr_auto] items-center gap-4 border-b border-white/12 py-5 text-left transition-colors duration-200 ease-out hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.99]"
                    aria-pressed={isSelected}
                  >
                    <span>
                      <span
                        className={`barber-name block text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.035em] transition-colors duration-200 ease-out ${
                          isSelected
                            ? 'text-primary'
                            : 'text-white/86 group-hover:text-white'
                        }`}
                      >
                        {barber.apodo}
                      </span>
                      <span
                        className={`mt-2 block text-sm text-gray-400 transition-opacity duration-200 ease-out ${
                          isSelected ? 'opacity-100' : 'opacity-60'
                        }`}
                      >
                        {barber.especialidad}
                      </span>
                    </span>
                    <span className={`text-xs font-bold text-primary transition-opacity duration-200 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'}`}>
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border border-white/12 bg-black/34 p-4 backdrop-blur-md shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
            <div className="relative aspect-[4/5] overflow-hidden bg-black">
              {barbers.map((barber, index) => {
                const isSelected = selectedIndex === index;

                return (
                  <motion.div
                    key={`portrait-${barber.id}`}
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                      opacity: isSelected ? 1 : 0,
                      scale: isSelected ? 1 : 1.025,
                    }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <CdnImage
                      src={barber.imagen}
                      alt={barber.nombre}
                      fill
                      sizes="(max-width: 1024px) 80vw, 360px"
                      className="object-cover grayscale contrast-125 brightness-90"
                      style={{ objectPosition: barber.imagePosition ?? '50% 18%' }}
                    />
                  </motion.div>
                );
              })}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={selectedBarber?.id ?? 'copy'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute bottom-4 left-4 right-4"
                >
                  <p className="text-2xl font-extrabold leading-none text-white">{selectedBarber?.nombre}</p>
                  <p className="mt-2 text-sm leading-6 text-white/72">{selectedBarber?.descripcion}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedBarber?.id ?? 'actions'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="lg:col-start-1 mt-2 flex flex-wrap items-center gap-4"
            >
              {socialUrl && (
                <>
                  <a
                    href={socialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver ${socialLabel} de ${selectedBarber?.apodo ?? 'barbero'}`}
                    className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-[0.18em] text-[11px] underline underline-offset-8 decoration-primary/40 hover:decoration-primary transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded active:scale-[0.97] sm:hidden"
                  >
                    {hasInstagram && (
                      <SiInstagram className="w-4 h-4 flex-none" aria-hidden="true" />
                    )}
                    <span>Ver {socialLabel}</span>
                    <span className="text-base transition-transform duration-200 ease-out">→</span>
                  </a>

                  <a
                    href={socialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver ${socialLabel} de ${selectedBarber?.apodo ?? 'barbero'}`}
                    className="hidden sm:inline-flex items-center justify-between gap-4 border border-primary/60 text-primary font-bold uppercase py-3.5 px-6 hover:bg-primary hover:text-black transition-all duration-200 ease-out group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent w-fit active:scale-[0.97]"
                  >
                    {hasInstagram && (
                      <SiInstagram className="w-4 h-4 flex-none" aria-hidden="true" />
                    )}
                    <span className="text-[11px] tracking-[0.2em]">Ver {socialLabel}</span>
                    <span className="text-lg group-hover:translate-x-1 transition-transform duration-200 ease-out">→</span>
                  </a>
                </>
              )}

              <Link
                href={`/barberos/${selectedBarber?.id}`}
                aria-label={`Ver perfil de ${selectedBarber?.apodo ?? 'barbero'}`}
                className="inline-flex min-h-12 items-center justify-center border border-white/16 bg-black/24 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white hover:bg-white hover:text-black transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.97]"
              >
                <span>Ver perfil</span>
              </Link>

              <Link
                href="/trabaja-con-nosotros"
                className="inline-flex min-h-12 items-center justify-center px-1 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white/54 hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.97]"
              >
                Únete al equipo
              </Link>
            </motion.div>
          </AnimatePresence>
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
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .team-section .grain-overlay::before { display: none; }
        }

        .team-section .barber-name {
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), color 0.2s ease;
        }
      `}</style>
    </section>
  );
}
