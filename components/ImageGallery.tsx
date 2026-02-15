'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

import CdnImage from '@/components/CdnImage';
import { imagekitUrl } from '@/lib/imagekit';

interface ImageGalleryProps {
  showBookingButton?: boolean;
  onBookingClick?: () => void;
  urlEndpoint?: string;
  compact?: boolean;
}

const photos = [
  {
    src: '/neobarberia_2026-01-28_09_23/gallery/WhatsApp_Image_2025-12-01_at_09.18.24_mpsuh5.jpg',
    width: 1200,
    height: 1600,
  },
  {
    src: '/neobarberia_2026-01-28_09_23/gallery/WhatsApp_Image_2025-12-01_at_09.19.37_a1b0c7.jpg',
    width: 1200,
    height: 1600,
  },
  {
    src: '/neobarberia_2026-01-28_09_23/gallery/WhatsApp_Image_2025-12-01_at_09.19.43_nqzjni.jpg',
    width: 1200,
    height: 1600,
  },
  {
    src: '/neobarberia_2026-01-28_09_23/gallery/WhatsApp_Image_2025-12-01_at_09.19.43_1_zp0dzj.jpg',
    width: 1200,
    height: 1600,
  },
];

export default function ImageGallery({
  showBookingButton = false,
  onBookingClick,
  urlEndpoint,
  compact = false,
}: ImageGalleryProps) {
  const slides = useMemo(
    () =>
      photos.map((photo) => ({
        ...photo,
        src: imagekitUrl(photo.src),
      })),
    []
  );

  const [visibleCount, setVisibleCount] = useState(3);
  const canLoadMore = visibleCount < slides.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 2, slides.length));
  };

  const visibleSlides = slides.slice(0, compact ? 3 : visibleCount);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <div className="grid grid-cols-2 gap-0">
          {visibleSlides[0] && (
            <div className="col-span-2 relative group overflow-hidden aspect-[16/10]">
            <CdnImage
              urlEndpoint={urlEndpoint}
              src={visibleSlides[0].src}
              alt="Neo Barbería - Interior"
              fill
              sizes="100vw"
              className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white font-mono text-xs">INTERIOR / MAIN</span>
            </div>
            </div>
          )}

          {visibleSlides[1] && (
            <div className="col-span-1 relative group overflow-hidden aspect-[3/5]">
            <CdnImage
              urlEndpoint={urlEndpoint}
              src={visibleSlides[1].src}
              alt="Neo Barbería - Corte"
              fill
              sizes="50vw"
              className="w-full h-full object-cover grayscale contrast-125 brightness-75 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>
          )}

          {visibleSlides[2] && (
            <div className="col-span-1 flex flex-col">
              <div className="relative group overflow-hidden aspect-square flex-grow">
              <CdnImage
                urlEndpoint={urlEndpoint}
                src={visibleSlides[2].src}
                alt="Neo Barbería - Herramientas"
                fill
                sizes="50vw"
                className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              </div>

              {!compact && (
                <div className="relative group overflow-hidden aspect-square flex-grow bg-surface flex items-center justify-center p-4">
                  <div className="text-center">
                    <svg className="w-10 h-10 mx-auto text-white/20 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 7l12 12" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 4l11 11" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 9l2-2" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 20l6-6" />
                    </svg>
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Precision</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {visibleSlides[3] && (
            <div className="col-span-2 relative group overflow-hidden aspect-[2/1]">
            <CdnImage
              urlEndpoint={urlEndpoint}
              src={visibleSlides[3].src}
              alt="Neo Barbería - Featured"
              fill
              sizes="100vw"
              className="w-full h-full object-cover grayscale contrast-125 brightness-75 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute bottom-4 right-4 bg-primary text-black text-[10px] font-bold px-2 py-1 uppercase">Featured Cut</div>
            </div>
          )}

          {visibleSlides[4] && (
            <div className="col-span-1 relative group overflow-hidden aspect-[4/5]">
            <CdnImage
              urlEndpoint={urlEndpoint}
              src={visibleSlides[4].src}
              alt="Neo Barbería - Style"
              fill
              sizes="50vw"
              className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            </div>
          )}

          {visibleSlides[5] && (
            <div className="col-span-1 relative group overflow-hidden aspect-[4/5]">
            <CdnImage
              urlEndpoint={urlEndpoint}
              src={visibleSlides[5].src}
              alt="Neo Barbería - Grooming"
              fill
              sizes="50vw"
              className="w-full h-full object-cover grayscale contrast-125 brightness-50 group-hover:brightness-75 transition-all duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/80 font-black text-6xl opacity-20 rotate-90 transform translate-x-4">BOLD</span>
            </div>
            </div>
          )}
        </div>

        {!compact && canLoadMore && (
          <div className="py-12 flex justify-center">
            <button
              className="group relative px-8 py-3 overflow-hidden bg-transparent"
              type="button"
              onClick={handleLoadMore}
            >
              <span className="absolute inset-0 w-full h-full border border-white/20 group-hover:border-primary transition-colors duration-300" />
              <span className="relative text-sm font-bold tracking-[0.2em] text-white group-hover:text-primary transition-colors">LOAD MORE</span>
              <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/60 -translate-x-1 -translate-y-1" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/60 translate-x-1 translate-y-1" />
            </button>
          </div>
        )}
      </motion.div>

      {showBookingButton && onBookingClick && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
          onClick={onBookingClick}
          className="mt-8 w-full border border-white/20 text-white font-bold uppercase py-6 hover:bg-white hover:text-black transition-colors duration-300 flex items-center justify-between px-8 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span className="tracking-[0.2em]">Agendar</span>
          <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
        </motion.button>
      )}
    </>
  );
}

