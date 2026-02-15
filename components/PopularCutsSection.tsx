'use client';

import { motion } from 'framer-motion';

import CdnImage from '@/components/CdnImage';
import { imagekitUrl } from '@/lib/imagekit';

const cuts = [
  {
    title: 'Pompadour',
    src: '/neobarberia_2026-01-28_09_23/gallery/WhatsApp_Image_2025-12-01_at_09.18.24_mpsuh5.jpg',
  },
  {
    title: 'Textured Crop',
    src: '/neobarberia_2026-01-28_09_23/gallery/WhatsApp_Image_2025-12-01_at_09.19.37_a1b0c7.jpg',
  },
  {
    title: 'Buzz Fade',
    src: '/neobarberia_2026-01-28_09_23/gallery/WhatsApp_Image_2025-12-01_at_09.19.43_nqzjni.jpg',
  },
  {
    title: 'Flow',
    src: '/neobarberia_2026-01-28_09_23/gallery/WhatsApp_Image_2025-12-01_at_09.19.43_1_zp0dzj.jpg',
  },
];

export default function PopularCutsSection() {
  return (
    <section id="cortes" className="py-16 sm:py-20 border-t border-white/10 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 mb-8 flex items-baseline justify-between">
          <h2 className="text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight">
            Cortes Populares
          </h2>
          <span className="text-xs text-primary font-mono">[SCROLL]</span>
        </div>

        <div className="popular-cuts flex overflow-x-auto gap-1 px-4 sm:px-6 pb-8 snap-x snap-mandatory">
          {cuts.map((cut) => (
            <motion.div
              key={cut.title}
              whileHover={{ scale: 1.01 }}
              className="flex-none w-[80vw] sm:w-[65vw] md:w-[40vw] snap-center relative aspect-[3/4] group overflow-hidden"
            >
              <CdnImage
                src={imagekitUrl(cut.src)}
                alt={cut.title}
                fill
                sizes="(max-width: 768px) 80vw, (max-width: 1024px) 65vw, 40vw"
                className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute bottom-4 left-4">
                <p className="text-white text-xl uppercase tracking-wider bg-black/50 px-2">
                  {cut.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .popular-cuts {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .popular-cuts::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
