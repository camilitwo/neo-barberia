'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CdnImage from '@/components/CdnImage';
import { imagekitUrl } from '@/lib/imagekit';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingBookingButton from '@/components/FloatingBookingButton';
import { stylesData } from '@/data/styles';

export default function StyleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const style = stylesData.find((s) => s.slug === slug);

  if (!style) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Estilo no encontrado</h1>
          <Link href="/" className="text-primary hover:text-accent transition-colors font-semibold">
            ← Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  const currentIndex = stylesData.findIndex((s) => s.slug === slug);
  const prevStyle = currentIndex > 0 ? stylesData[currentIndex - 1] : null;
  const nextStyle = currentIndex < stylesData.length - 1 ? stylesData[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero section */}
      <section className="relative h-[70vh] w-full overflow-hidden flex items-end justify-center">
        <div className="absolute inset-0 z-0">
          <CdnImage
            src={imagekitUrl(style.image)}
            alt={style.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="relative z-10 w-full max-w-4xl px-6 pb-12 text-center"
        >
          {/* Ghost text */}
          <h2 className="text-7xl sm:text-8xl md:text-9xl font-black text-white/[0.06] tracking-tighter leading-none select-none uppercase">
            {style.subtitle}
          </h2>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase -mt-6 sm:-mt-8">
            {style.title}
          </h1>

          {/* Tagline */}
          <p className="text-primary text-sm sm:text-base font-mono mt-4 tracking-wider uppercase">
            {style.tagline}
          </p>
        </motion.div>
      </section>

      {/* Description section */}
      <section className="py-16 sm:py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
          >
            {/* Left: description */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-primary" />
                <span className="text-[10px] text-primary font-mono tracking-[0.3em] uppercase">
                  Sobre este estilo
                </span>
              </div>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                {style.detailDescription}
              </p>
            </div>

            {/* Right: features */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1px] bg-primary" />
                <span className="text-[10px] text-primary font-mono tracking-[0.3em] uppercase">
                  Técnicas
                </span>
              </div>
              <ul className="space-y-3">
                {style.features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-center gap-3 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span className="text-sm text-gray-200 uppercase tracking-wider font-medium group-hover:text-primary transition-colors">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery section */}
      {style.gallery.length > 0 && (
        <section className="py-16 sm:py-20 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="text-[10px] text-primary font-mono tracking-[0.3em] uppercase">
                Galería
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {style.gallery.map((item, i) => (
                <motion.div
                  key={item.src}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/5 group"
                >
                  <CdnImage
                    src={imagekitUrl(item.src)}
                    alt={item.label}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white text-sm uppercase tracking-wider bg-black/50 px-2 py-1">
                      {item.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA section */}
      <section className="py-16 sm:py-20 border-t border-white/5">
        <div className="max-w-md mx-auto px-6 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4">
            ¿Listo para tu corte?
          </h3>
          <p className="text-gray-400 text-sm mb-8">
            Reserva tu cita y deja que nuestros barberos expertos transformen tu estilo.
          </p>
          <a
            href="https://neooc2b.setmore.com/?fbclid=PAZXh0bgNhZW0CMTEAAaaOGfb00uDJuEsMw9NMHy2Da7Qy6sfgyZHYMtwgSEj_5R3HK1mp4I51bxU_aem_ZEFdpvIRt2yhMVwlxEbhQg#services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-[var(--primary-hover)] text-background px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(230,181,101,0.3)] transition-all transform active:scale-95"
          >
            Reservar Cita
            <span className="material-icons text-sm">arrow_forward</span>
          </a>
        </div>
      </section>

      {/* Navigation between styles */}
      <section className="border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between">
          {prevStyle ? (
            <Link
              href={`/estilos/${prevStyle.slug}`}
              className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group"
            >
              <span className="material-icons text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
              <div>
                <span className="text-[10px] uppercase tracking-wider block">Anterior</span>
                <span className="text-sm font-bold text-white group-hover:text-primary transition-colors uppercase tracking-wider">
                  {prevStyle.title}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/#estilos"
            className="text-[10px] text-gray-500 hover:text-primary uppercase tracking-[0.2em] transition-colors"
          >
            Ver todos
          </Link>

          {nextStyle ? (
            <Link
              href={`/estilos/${nextStyle.slug}`}
              className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group text-right"
            >
              <div>
                <span className="text-[10px] uppercase tracking-wider block">Siguiente</span>
                <span className="text-sm font-bold text-white group-hover:text-primary transition-colors uppercase tracking-wider">
                  {nextStyle.title}
                </span>
              </div>
              <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      <Footer />
      <FloatingBookingButton url="https://neooc2b.setmore.com/?fbclid=PAZXh0bgNhZW0CMTEAAaaOGfb00uDJuEsMw9NMHy2Da7Qy6sfgyZHYMtwgSEj_5R3HK1mp4I51bxU_aem_ZEFdpvIRt2yhMVwlxEbhQg#services" />
    </main>
  );
}
