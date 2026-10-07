'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

type WhoWeAreVariant = 'preview' | 'full';

interface WhoWeAreProps {
  variant?: WhoWeAreVariant;
}

export default function WhoWeAre({ variant = 'preview' }: WhoWeAreProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const textVariants = {
    hidden: {
      y: 14,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <section
      id="nosotros"
      ref={ref}
      className="relative px-4 py-16 sm:py-20 md:py-24 bg-background overflow-hidden who-minimal"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div className="space-y-6">
            <motion.h3
              variants={textVariants}
              className="text-xl font-medium text-muted"
            >
              NOSOTROS
            </motion.h3>

            <motion.h2
              variants={textVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black outline-text tracking-[-0.03em] leading-[0.9] text-balance"
            >
              NEO
            </motion.h2>

            <motion.p variants={textVariants} className="text-2xl md:text-3xl font-semibold leading-tight text-white max-w-xl text-balance">
              Más que un corte. Una experiencia.
            </motion.p>

            <motion.p variants={textVariants} className="text-base sm:text-lg text-muted leading-relaxed max-w-xl">
              En Neo creemos que ir a la barbería es mucho más que cambiar tu look.
            </motion.p>
          </div>

          <div className="space-y-6">
            <motion.p variants={textVariants} className="text-base sm:text-lg text-muted leading-relaxed">
              Creamos un espacio donde puedes desconectarte, conversar, disfrutar el momento y salir sintiéndote mejor que cuando llegaste.
            </motion.p>

            <motion.p variants={textVariants} className="text-base sm:text-lg text-muted leading-relaxed">
              Nos preocupamos por cada detalle: desde la atención y el diagnóstico de tu estilo, hasta la precisión del corte y los pequeños detalles que hacen la diferencia.
            </motion.p>

            <motion.div variants={textVariants} className="border-l border-primary/70 pl-5">
              <p className="text-sm font-medium text-primary">Nuestro objetivo es simple:</p>
              <p className="mt-2 text-xl sm:text-2xl font-semibold leading-tight text-white text-balance">
                que encuentres tu estilo y disfrutes el proceso.
              </p>
            </motion.div>

            {variant === 'full' && (
              <>
                <motion.p variants={textVariants} className="text-base sm:text-lg text-muted leading-relaxed">
                  Trabajamos con productos profesionales y un equipo de barberos que comparte nuestra forma de entender la barbería: hacer las cosas bien, cuidar los detalles y entregar una experiencia que quieras repetir.
                </motion.p>
              </>
            )}

            <motion.p variants={textVariants} className="text-[11px] font-bold uppercase tracking-[0.26em] text-primary">
              Calidad · Estilo · Experiencia
            </motion.p>

            {variant === 'full' ? (
              <motion.a
                variants={textVariants}
                href="#equipo"
                whileTap={{ scale: 0.98 }}
                className="inline-flex min-h-12 items-center justify-center border border-primary bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-black transition-colors duration-200 ease-out hover:bg-primary-hover hover:border-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.97]"
              >
                Conoce a nuestro equipo
              </motion.a>
            ) : (
              <motion.div variants={textVariants}>
                <Link
                  href="/nosotros"
                  className="inline-flex items-center text-sm font-bold text-white hover:text-primary transition-colors border-b border-white/10 pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  Leer más
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        {variant === 'full' && (
          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <motion.div variants={textVariants}>
              <h4 className="text-sm font-medium text-primary mb-3">Horario</h4>
              <ul className="space-y-1">
                <li className="text-sm font-medium text-white flex justify-between">
                  <span>Lun-Dom</span>
                  <span className="text-gray-400">11:00-20:30</span>
                </li>
              </ul>
            </motion.div>

            <motion.div variants={textVariants}>
              <h4 className="text-sm font-medium text-primary mb-3">Info</h4>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-white">SirFausto / Nishman</span>
                <span className="text-sm text-gray-400">NEOBARBERÍA</span>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>

      <style jsx global>{`
        .who-minimal .outline-text {
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.5);
          color: transparent;
        }
        @media (hover: hover) and (pointer: fine) {
          .who-minimal .who-link:hover {
            transform: translateX(6px);
          }
        }
        .who-minimal .who-link {
          transition: color 0.2s ease-out, transform 0.2s cubic-bezier(0.23, 1, 0.32, 1);
        }
      `}</style>
    </section>
  );
}
