'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { FiCheck, FiX } from 'react-icons/fi';

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: { name: string; included: boolean }[];
  image: string;
  badge?: string;
  ctaText: string;
  ctaStyle: 'filled' | 'outline' | 'ghost';
  position?: 'normal' | 'elevated' | 'lowered';
}

const plans: Plan[] = [
  {
    id: 'essential',
    name: 'ESENCIAL',
    price: 12000,
    description: 'El corte perfecto para quienes saben lo que quieren. Rápido, preciso, impecable.',
    features: [
      { name: 'Corte Premium Fade', included: true },
      { name: 'Lavado Revitalizante', included: true },
      { name: 'Alineación de Barba', included: false },
      { name: 'Tratamiento Facial', included: false },
    ],
    image: 'https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    ctaText: 'RESERVAR $12.000',
    ctaStyle: 'outline',
    position: 'normal',
  },
  {
    id: 'signature',
    name: 'SIGNATURE',
    price: 22000,
    description: 'La experiencia Neo completa. Donde la técnica se encuentra con el lujo.',
    features: [
      { name: 'Corte Artisanal Personalizado', included: true },
      { name: 'Afeitado Clásico con Toalla Caliente', included: true },
      { name: 'Diseño de Barba Premium', included: true },
      { name: 'Tratamiento Facial', included: false },
    ],
    image: 'https://images.pexels.com/photos/1813278/pexels-photo-1813278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    badge: 'Más Elegido',
    ctaText: 'AGENDAR AHORA →',
    ctaStyle: 'filled',
    position: 'elevated',
  },
  {
    id: 'elite',
    name: 'ELITE',
    price: 35000,
    description: 'El ritual definitivo. Para quienes exigen la excelencia en cada detalle.',
    features: [
      { name: 'Corte Director\'s Cut', included: true },
      { name: 'Ritual de Afeitado Completo', included: true },
      { name: 'Tratamiento Facial Hidratante', included: true },
      { name: 'Masaje Capilar & Terapia', included: true },
    ],
    image: 'https://images.pexels.com/photos/2040189/pexels-photo-2040189.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    badge: 'Premium',
    ctaText: 'RESERVAR EXPERIENCIA',
    ctaStyle: 'outline',
    position: 'lowered',
  },
];

const bookingUrl = 'https://neooc2b.setmore.com/?fbclid=PAZXh0bgNhZW0CMTEAAaaOGfb00uDJuEsMw9NMHy2Da7Qy6sfgyZHYMtwgSEj_5R3HK1mp4I51bxU_aem_ZEFdpvIRt2yhMVwlxEbhQg#services';

export default function PricingPlans() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const plansRef = useRef<HTMLDivElement | null>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });
  const isPlansInView = useInView(plansRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
    },
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL').format(price);
  };

  const getPositionClasses = (position?: string) => {
    switch (position) {
      case 'elevated':
        return 'md:-mt-12';
      case 'lowered':
        return 'md:mt-12';
      default:
        return '';
    }
  };

  const getCtaClasses = (style: string, planId: string) => {
    const base = 'w-full py-5 px-6 rounded-full text-[11px] font-black tracking-[0.3em] uppercase transition-all duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent relative overflow-hidden group';
    
    if (planId === 'signature') {
      // Most popular - highest conversion focus
      return `${base} bg-primary text-black shadow-[0_0_40px_rgba(230,180,100,0.4)] hover:shadow-[0_0_60px_rgba(230,180,100,0.6)] hover:scale-[1.02] animate-pulse-slow`;
    }
    
    switch (style) {
      case 'filled':
        return `${base} bg-primary text-black shadow-[0_10px_40px_rgba(230,180,100,0.3)] hover:shadow-[0_15px_50px_rgba(230,180,100,0.5)] hover:bg-primary-hover hover:scale-[1.02]`;
      case 'outline':
        return `${base} border-2 border-white/30 text-white hover:bg-white hover:text-black hover:border-white hover:scale-[1.02] backdrop-blur-sm`;
      case 'ghost':
        return `${base} border-2 border-primary/50 text-primary hover:bg-primary hover:text-black hover:border-primary hover:scale-[1.02]`;
      default:
        return base;
    }
  };

  return (
    <div className="pricing-plans">
      {/* Hero Header */}
      <motion.header
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="mb-20 md:mb-32"
      >
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary mb-4 italic">
          Experiencia Definida
        </p>
        <h1 className="text-[clamp(3rem,10vw,8rem)] font-extrabold tracking-tighter leading-[0.8] uppercase pricing-outline-text">
          ELIGE TU<br />ESTILO
        </h1>
      </motion.header>

      {/* Pricing Grid */}
      <motion.div
        ref={plansRef}
        variants={containerVariants}
        initial="hidden"
        animate={isPlansInView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-3 gap-y-20 md:gap-x-8 lg:gap-x-12 items-start"
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            variants={itemVariants}
            className={`flex flex-col group ${getPositionClasses(plan.position)}`}
          >
            {/* Image Card */}
            <div className="relative overflow-hidden mb-6 aspect-[4/5] bg-surface transition-transform duration-500 group-hover:-translate-y-2">
              <Image
                src={plan.image}
                alt={`Servicio ${plan.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover grayscale contrast-125 brightness-75 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              {plan.badge && (
                <div className={`absolute top-4 right-4 text-black text-[9px] font-black tracking-[0.3em] px-4 py-2 rounded-full uppercase shadow-lg ${
                  plan.id === 'signature' 
                    ? 'bg-primary animate-pulse' 
                    : 'bg-white/90'
                }`}>
                  {plan.badge}
                </div>
              )}
            </div>

            {/* Plan Header */}
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter uppercase mb-2 text-white">
              {plan.name}
            </h2>
            <p className="text-gray-500 text-xs leading-relaxed mb-6 min-h-[40px]">
              {plan.description}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-primary text-2xl font-bold">$</span>
              <span className="text-white text-5xl font-light tracking-tight italic">
                {formatPrice(plan.price)}
              </span>
              <span className="text-gray-600 text-xs ml-1">CLP</span>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-10">
              {plan.features.map((feature) => (
                <div
                  key={feature.name}
                  className={`flex items-center justify-between group/item ${
                    !feature.included ? 'opacity-40' : ''
                  }`}
                >
                  <span
                    className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-colors ${
                      feature.included
                        ? 'text-gray-400 group-hover/item:text-white'
                        : 'text-gray-600'
                    }`}
                  >
                    {feature.name}
                  </span>
                  <div className="h-[1px] flex-grow mx-4 bg-white/5" />
                  {feature.included ? (
                    <FiCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  ) : (
                    <FiX className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>

            {/* Urgency hint for Signature */}
            {plan.id === 'signature' && (
              <p className="text-[9px] text-center text-primary/70 uppercase tracking-[0.3em] mb-3 font-bold">
                Solo 3 cupos por día →
              </p>
            )}
            
            {/* CTA Button */}
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={getCtaClasses(plan.ctaStyle, plan.id)}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {plan.ctaText}
                {plan.id === 'signature' && (
                  <span className="inline-block animate-bounce">→</span>
                )}
              </span>
            </a>
            
            {/* Trust indicators */}
            <div className="mt-4 flex items-center justify-center gap-3 text-[9px] text-gray-500 uppercase tracking-[0.2em]">
              <span className="flex items-center gap-1">
                <FiCheck className="w-3 h-3 text-primary" />
                Pago seguro
              </span>
              {plan.id === 'signature' && (
                <span className="flex items-center gap-1">
                  <FiCheck className="w-3 h-3 text-primary" />
                  Garantía Neo
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Social Proof Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-20 mb-12 flex flex-wrap items-center justify-center gap-8 py-6 border-y border-white/5"
      >
        <div className="text-center">
          <p className="text-3xl font-black text-primary">4.9★</p>
          <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em]">150+ reseñas</p>
        </div>
        <div className="h-8 w-px bg-white/10 hidden sm:block" />
        <div className="text-center">
          <p className="text-3xl font-black text-white">2,500+</p>
          <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em]">cortes este año</p>
        </div>
        <div className="h-8 w-px bg-white/10 hidden sm:block" />
        <div className="text-center">
          <p className="text-3xl font-black text-white">97%</p>
          <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em]">vuelven</p>
        </div>
      </motion.div>

      {/* Trust Footer */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex flex-col md:flex-row items-end justify-between pt-12"
      >
        <div className="max-w-md">
          <p className="text-xl font-light tracking-tight italic text-gray-400 leading-relaxed">
            &ldquo;No es solo un corte. Es la confianza de salir por esa puerta sabiendo que te ves impecable.&rdquo;
          </p>
          <p className="text-[10px] font-black tracking-[0.4em] uppercase text-primary mt-6">
            NEO BARBERÍA — QUilicura
          </p>
        </div>
        <div className="mt-12 md:mt-0 text-right">
          <span className="text-[15vw] font-black leading-none text-white/[0.03] select-none pointer-events-none uppercase">
            NEO
          </span>
        </div>
      </motion.section>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-t border-white/10 p-4">
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 rounded-full bg-primary text-black text-[11px] font-black tracking-[0.3em] uppercase flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(230,180,100,0.4)]"
        >
          AGENDAR SIGNATURE →
        </a>
      </div>

      <style jsx global>{`
        .pricing-plans .pricing-outline-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
          color: transparent;
        }
        @keyframes pulse-slow {
          0%, 100% { box-shadow: 0 0 40px rgba(230,180,100,0.4); }
          50% { box-shadow: 0 0 60px rgba(230,180,100,0.6); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
