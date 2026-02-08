"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ComingSoon() {
  // Variantes para animaciones suaves
  const container = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.8, 0.25, 1], staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 14 } },
  };

  return (
    <section
      aria-labelledby="coming-soon-title"
      className="relative overflow-hidden px-4 py-24 sm:py-32 bg-gradient-to-b from-background via-surface to-background"
    >
      {/* Decoraciones */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-primary/20 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-accent/30 blur-3xl" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative max-w-4xl mx-auto text-center space-y-8"
      >
        {/* Logo centrado responsive */}
        <motion.div
          variants={item}
          className="flex justify-center"
        >
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 overflow-hidden rounded-2xl">
            <Image
              src="/neobarberia_2026-01-28_09_23/1_t2y8pa.png"
              alt="Neo Barbería Logo"
              fill
              priority
              sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
              className="object-contain drop-shadow-[0_0_25px_rgba(230,180,100,0.35)]"
            />
          </div>
        </motion.div>
        {/* Título */}
        <motion.h2
          id="coming-soon-title"
          variants={item}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
          style={{
            backgroundImage: "linear-gradient(90deg, var(--primary), var(--accent))",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Muy Pronto: Una Nueva Experiencia
        </motion.h2>

        <motion.p
          variants={item}
          className="text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto px-2"
        >
          Estamos afinando los últimos detalles para traerte una barbería digital que refleje tu estilo. Reservas inteligentes, contenido exclusivo y una comunidad que vive la cultura del buen corte.
        </motion.p>
        {/* CTA Buttons */}

      </motion.div>
    </section>
  );
}
