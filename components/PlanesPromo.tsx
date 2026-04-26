'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiCheck } from 'react-icons/fi';

const quickPlans = [
  {
    id: 'essential',
    name: 'ESENCIAL',
    price: '$12.000',
    description: 'Corte + Lavado',
    highlight: false,
  },
  {
    id: 'signature',
    name: 'SIGNATURE',
    price: '$22.000',
    description: 'Corte + Afeitado + Barba',
    highlight: true,
  },
  {
    id: 'elite',
    name: 'ELITE',
    price: '$35.000',
    description: 'Experiencia Completa',
    highlight: false,
  },
];

export default function PlanesPromo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative px-4 py-16 sm:py-20 bg-background overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-3"
          >
            Experiencias Definidas
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter uppercase text-white"
          >
            ELIGE TU PLAN
          </motion.h2>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {quickPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`relative p-6 md:p-8 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
                plan.highlight
                  ? 'bg-primary/10 border-primary/50 shadow-[0_0_40px_rgba(230,180,100,0.15)]'
                  : 'bg-surface/50 border-white/10 hover:border-white/20'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black text-[9px] font-black tracking-[0.2em] px-3 py-1 rounded-full uppercase">
                  Más Elegido
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-xs text-gray-500 uppercase tracking-[0.15em] mb-4">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl md:text-5xl font-light italic text-white">
                    {plan.price}
                  </span>
                  <span className="text-xs text-gray-600 ml-1">CLP</span>
                </div>

                <Link
                  href="/planes"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all ${
                    plan.highlight
                      ? 'bg-primary text-black hover:shadow-[0_0_30px_rgba(230,180,100,0.4)]'
                      : 'border border-white/20 text-white hover:bg-white hover:text-black'
                  }`}
                >
                  Ver Detalles
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link
            href="/planes"
            className="group inline-flex items-center gap-3 text-white/60 hover:text-primary text-sm font-medium transition-colors"
          >
            <span className="flex items-center gap-2">
              <FiCheck className="w-4 h-4 text-primary" />
              Garantía de satisfacción
            </span>
            <span className="h-px w-8 bg-white/20 group-hover:w-12 group-hover:bg-primary transition-all" />
            <span className="uppercase tracking-[0.2em] text-[10px] font-bold">
              Comparar todos los planes →
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
