'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { SiWhatsapp } from 'react-icons/si';

export default function JoinTheCrew() {
  const visionRef = useRef<HTMLDivElement | null>(null);
  const requirementsRef = useRef<HTMLDivElement | null>(null);
  const isVisionInView = useInView(visionRef, { once: true, amount: 0.3 });
  const isRequirementsInView = useInView(requirementsRef, { once: true, amount: 0.3 });

  const whatsappNumber = '56923726076';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola NeoBarberia! Me interesa unirme al equipo.')}`;

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const requirements = [
    { number: '01', label: 'Pasión' },
    { number: '02', label: 'Técnica' },
    { number: '03', label: 'Visión' },
    { number: '04', label: 'Respeto' },
  ];

  return (
    <div className="join-the-crew">
      {/* Hero Section */}
      <section className="relative h-[70vh] sm:h-[80vh] flex flex-col justify-end px-4 sm:px-6 py-12 overflow-hidden max-w-7xl mx-auto">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="Interior de barbería profesional"
            fill
            priority
            className="object-cover grayscale brightness-50 opacity-60"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 join-grain pointer-events-none opacity-[0.08] mix-blend-overlay" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="relative z-10 space-y-4"
        >
          <h1 className="text-[15vw] sm:text-[10vw] md:text-[9rem] font-extrabold tracking-tighter uppercase leading-[0.8] join-outline-text mb-4">
            ÚNETE AL<br />EQUIPO
          </h1>
          <p className="max-w-xl text-lg sm:text-xl md:text-2xl font-light text-gray-400 leading-relaxed uppercase tracking-tight">
            ESTAMOS BUSCANDO ARTISTAS QUE{' '}
            <span className="text-white font-extrabold">DESAFÍEN LOS LÍMITES</span>
          </p>
        </motion.div>
      </section>

      {/* Bento Layout */}
      <motion.section
        ref={visionRef}
        variants={containerVariants}
        initial="hidden"
        animate={isVisionInView ? 'visible' : 'hidden'}
        className="px-4 sm:px-6 mt-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        {/* Vision Card */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-8 bg-surface/50 border border-border p-6 sm:p-8 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="w-12 h-1 bg-primary" />
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tighter text-white">
              Nuestra Visión
            </h2>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg">
              No somos solo una barbería. Somos un colectivo de mentes creativas
              dedicadas a elevar el estándar del cuidado masculino. Buscamos
              talento crudo, pasión innegable y el deseo de liderar el cambio en
              la industria.
            </p>
          </div>
          <div className="mt-8">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 text-white font-extrabold uppercase tracking-widest text-sm py-4 px-8 bg-surface border border-border hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              QUIERO EMPEZAR
              <span className="transform group-hover:translate-x-2 transition-transform">→</span>
            </a>
          </div>
        </motion.div>

        {/* Image Card */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-4 aspect-square md:aspect-auto overflow-hidden"
        >
          <Image
            src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt="Manos de barbero profesional trabajando"
            width={600}
            height={600}
            className="w-full h-full object-cover grayscale hover:scale-105 transition-transform duration-700"
            quality={80}
          />
        </motion.div>

        {/* Contact / Apply Card */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-12 flex flex-col md:flex-row items-center justify-between gap-8 py-12 sm:py-16 border-y border-border px-4 sm:px-8"
        >
          <div className="text-center md:text-left">
            <p className="text-gray-500 uppercase tracking-widest text-xs mb-2">
              ¿Listo para el desafío?
            </p>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase tracking-tighter text-white">
              CONTACTA CON NOSOTROS AL{' '}
              <br className="hidden md:block" />
              <span className="text-gray-600">+56 9 2372 6076</span>
            </h3>
          </div>
          <div className="flex gap-4">
            <a
              className="p-5 sm:p-6 border border-border hover:border-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiWhatsapp className="w-7 h-7 sm:w-8 sm:h-8" />
            </a>
          </div>
        </motion.div>
      </motion.section>

      {/* Requirements Section */}
      <motion.section
        ref={requirementsRef}
        variants={containerVariants}
        initial="hidden"
        animate={isRequirementsInView ? 'visible' : 'hidden'}
        className="px-4 sm:px-6 py-20 sm:py-24 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 text-center">
          {requirements.map((req) => (
            <motion.div key={req.number} variants={itemVariants} className="space-y-4">
              <span className="text-4xl sm:text-5xl font-extrabold italic text-gray-800">
                {req.number}
              </span>
              <p className="uppercase font-bold tracking-tighter text-white">
                {req.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <style jsx global>{`
        .join-the-crew .join-outline-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
          color: transparent;
        }
        .join-the-crew .join-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}
