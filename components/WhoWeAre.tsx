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
              Nosotros
            </motion.h3>

            <motion.h2
              variants={textVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black outline-text tracking-[-0.03em] leading-[0.9] text-balance"
            >
              NEO
            </motion.h2>

            <motion.p variants={textVariants} className="text-lg md:text-xl font-light text-gray-300 max-w-xl">
              Peluquería con estilo experimentado y tradicional
            </motion.p>
          </div>

          <div className="space-y-6">
            <motion.p variants={textVariants} className="text-base sm:text-lg text-muted leading-relaxed">
              ¡Bienvenidos a <span className="text-primary font-semibold">NEOBARBERÍA</span>, donde tu estilo es nuestra prioridad!
              Somos pioneros en la comuna, y no es casualidad: nos enorgullecemos de contar con los barberos más talentosos,
              apasionados por su arte y expertos en resaltar lo mejor de ti.
            </motion.p>

            {variant === 'full' && (
              <>
                <motion.p variants={textVariants} className="text-base sm:text-lg text-muted leading-relaxed">
                  En NEOBARBERÍA, combinamos tradición y calidad con productos de prestigio como
                  <span className="text-accent font-semibold"> SirFausto</span> y
                  <span className="text-accent font-semibold"> Nishman</span>, para asegurarte una experiencia única y de primera.
                </motion.p>

                <motion.p variants={textVariants} className="text-base sm:text-lg text-muted leading-relaxed">
                  Ven y descubre el lugar donde el estilo se encuentra con la excelencia; estamos aquí para transformar tu imagen
                  con dedicación, alegría y profesionalismo. ¡Deja que tu estilo hable por ti con
                  <span className="text-primary font-semibold"> NEOBARBERÍA</span>!
                </motion.p>
              </>
            )}

            {variant === 'full' ? (
              <motion.a
                variants={textVariants}
                href="#equipo"
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center text-sm font-bold text-white hover:text-primary transition-colors border-b border-white/10 pb-1 who-link"
              >
                Conoce nuestro equipo
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
                <span className="text-sm text-gray-500">NEOBARBERÍA</span>
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
