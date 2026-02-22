'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ImageGallery from './ImageGallery';

type GallerySectionVariant = 'preview' | 'full';

interface GallerySectionProps {
  variant?: GallerySectionVariant;
}

export default function GallerySection({ variant = 'preview' }: GallerySectionProps) {
  const handleBooking = () => {
    window.open('https://neooc2b.setmore.com/?fbclid=PAZXh0bgNhZW0CMTEAAaaOGfb00uDJuEsMw9NMHy2Da7Qy6sfgyZHYMtwgSEj_5R3HK1mp4I51bxU_aem_ZEFdpvIRt2yhMVwlxEbhQg#services', '_blank');
  };

  return (
    <section id="galeria" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-fallback text-gradient mb-4">
            Galería
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ImageGallery
            compact={variant === 'preview'}
            showBookingButton={variant === 'full'}
            onBookingClick={variant === 'full' ? handleBooking : undefined}
          />
        </motion.div>

        {variant === 'preview' && (
          <div className="pt-10 flex justify-center">
            <Link
              href="/galeria"
              className="inline-flex items-center text-sm font-bold tracking-[0.2em] uppercase text-white hover:text-primary transition-colors border-b border-white/10 pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              Ver galería completa
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

