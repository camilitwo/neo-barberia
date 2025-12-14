'use client';

import { motion } from 'framer-motion';
import ImageGallery from './ImageGallery';

export default function GallerySection() {
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
            showBookingButton={false}
            onBookingClick={handleBooking}
          />
        </motion.div>
      </div>
    </section>
  );
}

