'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import type { PointerEvent } from 'react';

const bookingUrl = 'https://club.neobarberia.cl/';

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 22, mass: 0.4 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 22, mass: 0.4 });
  const rotateY = useTransform(springX, [-1, 1], [-4, 4]);
  const rotateX = useTransform(springY, [-1, 1], [3, -3]);
  const glowX = useTransform(springX, [-1, 1], ['30%', '70%']);
  const glowY = useTransform(springY, [-1, 1], ['30%', '70%']);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(230,180,100,0.13), transparent 32%)`;

  const reveal = {
    hidden: { opacity: 1, y: 14 },
    visible: { opacity: 1, y: 0 },
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    pointerX.set(Math.max(-1, Math.min(1, x)));
    pointerY.set(Math.max(-1, Math.min(1, y)));
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      id="inicio"
      className="hero-cinema relative min-h-[100dvh] w-full overflow-hidden bg-background px-4 pt-20 sm:px-6 sm:pt-24 lg:px-8"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_74%_30%,rgba(230,180,100,0.14),transparent_33%),linear-gradient(180deg,#0a0a0a_0%,#050505_100%)]" />
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
        style={{
          background: reduceMotion
            ? 'radial-gradient(circle at 70% 35%, rgba(230,180,100,0.08), transparent 30%)'
            : spotlight,
        }}
      />
      <div className="absolute inset-0 z-0 hero-grain pointer-events-none opacity-[0.08] mix-blend-overlay" />

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: reduceMotion ? 0 : 0.08 }}
        className="relative z-10 mx-auto grid min-h-[calc(100dvh-5rem)] max-w-7xl grid-cols-1 items-start gap-8 pb-10 md:min-h-[calc(100dvh-6rem)] md:grid-cols-[minmax(0,0.96fr)_minmax(320px,0.8fr)] md:items-center md:gap-12 lg:gap-16"
      >
        <div className="relative order-2 max-w-2xl pt-0 md:order-1 md:pt-0">
          <motion.p
            variants={reveal}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            className="mb-5 text-sm font-semibold text-primary sm:text-base"
          >
            Neo Barbería, Quilicura
          </motion.p>

          <motion.h1
            variants={reveal}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-[15ch] text-[clamp(2.8rem,6vw,4.85rem)] font-extrabold leading-[0.95] tracking-[-0.035em] text-white text-balance"
          >
            El corte se siente antes de verse.
          </motion.h1>

          <motion.p
            variants={reveal}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mt-6 max-w-[34rem] text-base leading-7 text-gray-300 sm:text-lg"
          >
            Barbería en Quilicura con oficio, detalle y agenda online.
          </motion.p>

          <motion.div
            variants={reveal}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-press inline-flex min-h-12 items-center justify-center border border-primary bg-primary px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-black transition-colors duration-150 ease-out hover:bg-primary-hover hover:border-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.97]"
            >
              Agendar hora
            </a>
            <a
              href="#equipo"
              className="hero-press inline-flex min-h-12 items-center justify-center border border-white/16 bg-black/25 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors duration-150 ease-out hover:border-white/40 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.97]"
            >
              Ver equipo
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={reveal}
          transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.08, ease: [0.23, 1, 0.32, 1] }}
          className="relative order-1 mx-auto w-full max-w-[20rem] perspective-stage sm:max-w-[22rem] md:order-2 md:max-w-[26rem] lg:max-w-[29rem]"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-12 top-1/2 hidden -translate-y-1/2 select-none font-black leading-none tracking-[-0.06em] text-white/[0.035] md:block lg:text-[11rem] md:text-[8rem]"
          >
            NEO
          </span>

          <motion.div
            className="relative z-10"
            style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
          >
            <div className="hero-material relative aspect-[9/15] w-full overflow-hidden border border-white/10 bg-black shadow-[0_28px_80px_rgba(0,0,0,0.48)] sm:aspect-[9/16]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/videos/neo-hero-poster.webp')" }}
              />
              <video
                className="relative z-10 h-full w-full object-cover motion-reduce:hidden"
                poster="/videos/neo-hero-poster.webp"
                muted
                playsInline
                autoPlay
                loop
                preload="metadata"
                aria-hidden="true"
              >
                <source src="/videos/neo-hero.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/34 via-transparent to-black/10" />

              <div className="hero-caption absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between gap-3 border border-white/14 bg-black/34 px-3 py-2.5 text-white shadow-[0_18px_44px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:bottom-4 sm:left-4 sm:right-4 sm:block sm:px-4 sm:py-3">
                <div>
                  <p className="text-sm font-semibold leading-none text-white">Video real de la experiencia</p>
                  <p className="mt-1 hidden text-xs leading-5 text-white/72 sm:block">Oficio, ambiente y resultado en una sola escena.</p>
                </div>
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-press inline-flex min-h-9 shrink-0 items-center justify-center bg-primary px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-black transition-colors duration-150 ease-out hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.97] sm:hidden"
                >
                  Agendar
                </a>
              </div>
            </div>
          </motion.div>

          <div className="pointer-events-none absolute -bottom-5 left-5 right-5 h-px bg-primary/55 shadow-[0_0_30px_rgba(230,180,100,0.45)]" />
        </motion.div>
      </motion.div>

      <style jsx global>{`
        .hero-cinema .hero-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E");
          will-change: transform;
        }

        .hero-cinema .perspective-stage {
          perspective: 1200px;
        }

        .hero-cinema .hero-material {
          transform: translateZ(0);
        }

        .hero-cinema .hero-press {
          transform-origin: center;
          will-change: transform;
        }

        .hero-cinema .hero-caption {
          -webkit-backdrop-filter: blur(18px) saturate(150%);
          backdrop-filter: blur(18px) saturate(150%);
        }

        @media (max-width: 767px) {
          .hero-cinema {
            min-height: auto;
          }
        }

        @media (prefers-reduced-transparency: reduce) {
          .hero-cinema .hero-caption {
            background: rgba(0, 0, 0, 0.82);
            -webkit-backdrop-filter: none;
            backdrop-filter: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-cinema .hero-grain {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
