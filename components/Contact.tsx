'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { SiInstagram, SiTiktok, SiWhatsapp } from 'react-icons/si';

export default function Contact() {
  const ref = useRef<HTMLDivElement | null>(null);
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

  // Links
  const instagramUrl = 'https://www.instagram.com/neobarberia.cl/';
  const tiktokUrl = 'https://www.tiktok.com/@neo.barberia.cl';
  const whatsappNumber = '56923726076'; // sin signos ni espacios
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola NeoBarberia!')}`;
  const mapsDirections = 'https://www.google.com/maps/dir/?api=1&destination=-33.35871917342603,-70.73995452397547';

  return (
    <section
      id="contacto"
      ref={ref}
      className="py-16 sm:py-20 md:py-32 px-4 bg-gradient-to-b from-surface to-background"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-gradient text-gradient-fallback">
            Contáctanos
          </h2>
          <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto">¿Tienes alguna pregunta? Estamos aquí para ayudarte</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Information + Map */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Contact Cards */}
            <motion.div
              whileHover={{
                scale: 1.02,
                x: 6,
              }}
              className="glass-effect rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 cursor-pointer border border-border"
            >
              <div className="text-primary text-4xl">📍</div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-1">Ubicación</h3>
                <p className="text-muted">Quilicura, Santiago</p>
                <p className="text-muted">Chile</p>
                <div className="mt-3 flex space-x-3">
                  <a
                    href={mapsDirections}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-black font-semibold rounded-full shadow-sm hover:opacity-95 transition"
                    aria-label="Cómo llegar"
                  >
                    Cómo llegar
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Map Embed */}
            <div className="rounded-2xl overflow-hidden border border-border">
              <iframe
                title="NEOBARBERIA - Mapa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3332.472852100119!2d-70.73995452397547!3d-33.35871917342603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c17ea1e163d9%3A0x2d3c52ec810800c9!2sNEOBARBERIA!5e0!3m2!1ses!2scl!4v1764509448229!5m2!1ses!2scl"
                width="100%"
                className="h-48 sm:h-64 md:h-72 w-full"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Social Media */}
            <div className="pt-6">
              <h3 className="text-lg sm:text-xl font-bold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                {/* Instagram */}
                <motion.a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08, rotate: 8 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:shadow-glow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Instagram"
                >
                  <SiInstagram className="w-5 h-5" aria-hidden />
                </motion.a>

                {/* TikTok */}
                <motion.a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08, rotate: -8 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:shadow-glow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="TikTok"
                >
                  <SiTiktok className="w-5 h-5" aria-hidden />
                </motion.a>

                {/* WhatsApp */}
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:shadow-glow transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="WhatsApp"
                >
                  <SiWhatsapp className="w-5 h-5" aria-hidden />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right column placeholder (form or CTA) - keep minimal to not break layout */}
          <motion.div variants={itemVariants} className="bg-transparent rounded-xl p-6 border border-border glass-effect">
            <h3 className="text-lg font-bold mb-4">Reserva o envíanos un mensaje</h3>
            <p className="text-muted mb-4">Haz click en el botón de WhatsApp o envía un correo usando el formulario.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" className="w-full p-3 rounded-md bg-background border border-border focus:outline-none" />
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-3 rounded-md bg-background border border-border focus:outline-none" />
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Mensaje" className="w-full p-3 rounded-md bg-background border border-border focus:outline-none h-24" />
              <div className="flex items-center space-x-3">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full">Enviar WhatsApp</a>
              </div>
            </form>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
