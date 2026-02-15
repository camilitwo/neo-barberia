'use client';

import { motion, useInView } from 'framer-motion';
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
      className="relative py-16 sm:py-20 md:py-28 px-4 bg-background overflow-hidden team-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 z-0 grain-overlay pointer-events-none">
        <CdnImage
          src={barbers[selectedIndex]?.imagen ?? barbers[0]?.imagen}
          alt={barbers[selectedIndex]?.nombre ?? barbers[0]?.nombre ?? 'Neo Barbería - Barbero'}
          fill
          sizes="100vw"
          className="w-full h-full object-cover object-[50%_18%] grayscale contrast-125 brightness-50"
          priority
        />
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
                    className="barber-name text-5xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 block group-hover:text-primary transition-all peer-checked:text-primary"
                  >
                    {barber.apodo.toUpperCase()}
                  </span>

                  <span className="text-sm font-mono text-gray-500 mt-2 block opacity-0 peer-checked:opacity-100 transition-opacity">
                    {barber.especialidad} / {(index + 1).toString().padStart(2, '0')}
                  </span>
                </label>
              </div>
            ))}
          </div>
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
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
}
