'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link with form data
    const subject = encodeURIComponent('Consulta desde Neo Barbería');
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\nEmail: ${formData.email}\nTeléfono: ${formData.phone}\n\nMensaje:\n${formData.message}`
    );
    window.location.href = `mailto:contacto@neobarberia.cl?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section
      id="contacto"
      ref={ref}
      className="py-16 sm:py-20 md:py-32 px-4 bg-gradient-to-b from-surface to-background"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gradient text-gradient-fallback">
            Contáctanos
          </h2>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <motion.div
              whileHover={{
                scale: 1.02,
                x: 10,
              }}
              className="glass-effect rounded-xl p-6 flex items-start space-x-4 cursor-pointer border border-border"
            >
              <div className="text-primary text-4xl">
                📍
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Ubicación</h3>
                <p className="text-muted">Quilicura, Santiago</p>
                <p className="text-muted">Chile</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.02,
                x: 10,
              }}
              className="glass-effect rounded-xl p-6 flex items-start space-x-4 cursor-pointer border border-border"
            >
              <div className="text-primary text-4xl">
                📞
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Teléfono</h3>
                <p className="text-muted">+56 9 XXXX XXXX</p>
                <p className="text-xs text-muted">Lun-Dom: 11:00 - 20:30</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.02,
                x: 10,
              }}
              className="glass-effect rounded-xl p-6 flex items-start space-x-4 cursor-pointer border border-border"
            >
              <div className="text-primary text-4xl">
                ✉️
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-muted">contacto@neobarberia.cl</p>
              </div>
            </motion.div>

            {/* Social Media */}
            <div className="pt-6">
              <h3 className="text-xl font-bold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <motion.a
                  href="https://instagram.com/neobarberia"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.2,
                    rotate: 15,
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:shadow-glow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  📷
                </motion.a>
                <motion.a
                  href="https://facebook.com/neobarberia"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.2,
                    rotate: -15,
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:shadow-glow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  👍
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="glass-effect rounded-2xl p-6 sm:p-8 space-y-6 border border-border"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2 text-muted">
                Nombre
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-primary/40 rounded-lg focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-accent transition-all text-foreground placeholder:text-muted"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-muted">
                Email
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/50 border border-primary/40 rounded-lg focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-accent transition-all text-foreground placeholder:text-muted"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-muted">
                Teléfono
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-primary/40 rounded-lg focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-accent transition-all text-foreground placeholder:text-muted"
                placeholder="+56 9 XXXX XXXX"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2 text-muted">
                Mensaje
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-black/50 border border-primary/40 rounded-lg focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-accent transition-all text-foreground resize-none placeholder:text-muted"
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)',
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-4 bg-primary hover:bg-primary-hover text-black font-bold text-base sm:text-lg rounded-full shadow-glow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Enviar Mensaje
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
