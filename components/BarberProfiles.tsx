'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Barber } from '@/data/barbers';

interface BarberProfilesProps {
  barbers: Barber[];
}

export default function BarberProfiles({ barbers }: BarberProfilesProps) {
  return (
    <section id="perfiles" className="py-16 sm:py-20 md:py-28 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gradient text-gradient-fallback mb-4">
            Perfiles de Nuestros Barberos
          </h2>
          <p className="text-muted text-lg max-w-3xl mx-auto">
            Conoce la experiencia, el estilo y las publicaciones personales de cada artista.
          </p>
        </motion.div>

        <div className="space-y-10">
          {barbers.map((barber, index) => (
            <motion.article
              key={barber.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-effect rounded-2xl border border-border p-6 sm:p-8 shadow-2xl"
            >
              <div className="grid gap-8 lg:grid-cols-[1.1fr_1.4fr]">
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-glow">
                      <Image
                        src={barber.imagen}
                        alt={`Foto de ${barber.nombre}`}
                        fill
                        sizes="(max-width: 640px) 120px, 160px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white">
                          {barber.nombre}
                        </h3>
                        <span className="bg-primary text-black px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                          {barber.apodo}
                        </span>
                      </div>
                      <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">
                        {barber.especialidad}
                      </p>
                      <p className="text-muted mt-3">
                        {barber.descripcion}
                      </p>
                      {(barber.instagram || barber.facebook) && (
                        <div className="flex gap-4 mt-4">
                          {barber.instagram && (
                            <a
                              href={barber.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground hover:text-accent transition-colors"
                            >
                              <FontAwesomeIcon icon={faInstagram} size="lg" />
                            </a>
                          )}
                          {barber.facebook && (
                            <a
                              href={barber.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground hover:text-accent transition-colors"
                            >
                              <FontAwesomeIcon icon={faFacebook} size="lg" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-surface/80 border border-border rounded-xl p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted">Experiencia</p>
                      <p className="text-white font-semibold mt-2">{barber.experiencia}</p>
                    </div>
                    <div className="bg-surface/80 border border-border rounded-xl p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted">Enfoque</p>
                      <p className="text-white font-semibold mt-2">{barber.enfoque}</p>
                    </div>
                    <div className="bg-surface/80 border border-border rounded-xl p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted">Disponibilidad</p>
                      <p className="text-white font-semibold mt-2">{barber.disponibilidad}</p>
                    </div>
                    <div className="bg-surface/80 border border-border rounded-xl p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted">Servicios destacados</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {barber.servicios.map((servicio) => (
                          <span
                            key={servicio}
                            className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary"
                          >
                            {servicio}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-muted mb-3">
                      Galería personal
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {barber.galeria.map((foto, fotoIndex) => (
                        <div
                          key={foto.src}
                          className={`relative overflow-hidden rounded-xl border border-border shadow-xl group ${
                            fotoIndex === 0 ? 'col-span-2 h-56' : 'h-40'
                          }`}
                        >
                          <Image
                            src={foto.src}
                            alt={foto.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-muted mb-3">
                      Publicaciones personales
                    </p>
                    <div className="space-y-4">
                      {barber.publicaciones.map((post) => (
                        <div
                          key={post.titulo}
                          className="bg-surface/80 border border-border rounded-xl p-4"
                        >
                          <p className="text-xs uppercase tracking-[0.2em] text-primary">{post.fecha}</p>
                          <h4 className="text-lg font-semibold text-white mt-2">{post.titulo}</h4>
                          <p className="text-muted text-sm mt-2">{post.resumen}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
