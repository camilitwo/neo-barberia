'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function WhoWeAre() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const leftVariants = {
    hidden: { 
      x: -100, 
      opacity: 0,
      rotate: -5,
    },
    visible: {
      x: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 60,
        damping: 15,
      },
    },
  };

  const rightVariants = {
    hidden: { 
      x: 100, 
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 60,
        damping: 15,
      },
    },
  };

  const textVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
      },
    },
  };

  return (
    <section 
      id="nosotros" 
      ref={ref}
      className="py-20 md:py-32 px-4 bg-gradient-to-b from-black to-secondary"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            variants={leftVariants}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://preview.colorlib.com/theme/thebarber/img/about/about_lft.png"
                alt="Neo Barbería Interior"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Floating Info Card */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={isInView ? { 
                scale: 1, 
                rotate: 0,
                transition: {
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: 0.5,
                }
              } : {}}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: {
                  type: 'spring',
                  stiffness: 400,
                }
              }}
              className="absolute -bottom-6 -right-6 glass-effect rounded-xl p-6 shadow-glow"
            >
              <div className="flex items-center space-x-3">
                <div className="text-4xl">🕐</div>
                <div>
                  <h3 className="text-xl font-bold text-primary">Horario</h3>
                  <p className="text-gray-300">Lun-Dom</p>
                  <p className="text-gray-300">11:00 - 20:30</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            variants={rightVariants}
            className="space-y-6"
          >
            <motion.div variants={textVariants}>
              <motion.h2 
                className="text-5xl md:text-6xl font-bold mb-4"
                whileInView={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                  backgroundImage: 'linear-gradient(90deg, var(--primary), var(--accent), var(--primary))',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Nosotros
              </motion.h2>
              <h3 className="text-2xl md:text-3xl text-gray-300 mb-6">
                Peluquería con estilo experimentado y tradicional
              </h3>
            </motion.div>

            <motion.p 
              variants={textVariants}
              className="text-lg text-gray-400 leading-relaxed text-justify"
            >
              ¡Bienvenidos a <span className="text-primary font-semibold">NEOBARBERÍA</span>, donde tu estilo es nuestra prioridad! 
              Somos pioneros en la comuna, y no es casualidad: nos enorgullecemos de contar con los barberos más talentosos, 
              apasionados por su arte y expertos en resaltar lo mejor de ti.
            </motion.p>

            <motion.p 
              variants={textVariants}
              className="text-lg text-gray-400 leading-relaxed text-justify"
            >
              En NEOBARBERÍA, combinamos tradición y calidad con productos de prestigio como 
              <span className="text-accent font-semibold"> SirFausto</span> y 
              <span className="text-accent font-semibold"> Nishman</span>, para asegurarte una experiencia única y de primera.
            </motion.p>

            <motion.p 
              variants={textVariants}
              className="text-lg text-gray-400 leading-relaxed text-justify"
            >
              Ven y descubre el lugar donde el estilo se encuentra con la excelencia; estamos aquí para transformar tu imagen 
              con dedicación, alegría y profesionalismo. ¡Deja que tu estilo hable por ti con 
              <span className="text-primary font-semibold"> NEOBARBERÍA</span>!
            </motion.p>

            <motion.div
              variants={textVariants}
              className="pt-6"
            >
              <motion.a
                href="#equipo"
                whileHover={{ 
                  scale: 1.05,
                  x: 10,
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-3 bg-primary text-black font-bold rounded-full shadow-lg hover:shadow-glow transition-all duration-300"
              >
                Conoce nuestro equipo
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2"
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
