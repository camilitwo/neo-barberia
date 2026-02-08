'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';

import CdnImage from '@/components/CdnImage';
import { imagekitUrl } from '@/lib/imagekit';

interface ImageGalleryProps {
  showBookingButton?: boolean;
  onBookingClick?: () => void;
  urlEndpoint?: string;
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
}: ImageGalleryProps) {
  const [index, setIndex] = useState(-1);

  const slides = photos.map((photo) => ({
    ...photo,
    src: imagekitUrl(photo.src),
  }));

  return (
    <>
      {/* Versión Desktop/Tablet - Collage Artístico */}
      <div className="hidden md:block w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-[600px] lg:h-[700px]"
        >
          {/* Imagen 1 - Grande, arriba izquierda, rotada */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: '-2deg' }}
            transition={{ delay: 0, type: 'spring', stiffness: 100, damping: 15 }}
            whileHover={{ scale: 1.05, rotate: '0deg', zIndex: 20 }}
            className="absolute top-0 left-0 w-[48%] h-[55%] cursor-pointer group"
            onClick={() => setIndex(0)}
          >
            <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl">
              <CdnImage
                urlEndpoint={urlEndpoint}
                src={photos[0].src}
                alt="Neo Barbería 1"
                fill
                sizes="50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Imagen 2 - Mediana, arriba derecha, rotada */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: '3deg' }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 100, damping: 15 }}
            whileHover={{ scale: 1.05, rotate: '0deg', zIndex: 20 }}
            className="absolute top-[5%] right-0 w-[48%] h-[42%] cursor-pointer group"
            onClick={() => setIndex(1)}
          >
            <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl">
              <CdnImage
                urlEndpoint={urlEndpoint}
                src={photos[1].src}
                alt="Neo Barbería 2"
                fill
                sizes="50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tl from-black/60 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Imagen 3 - Alta, abajo izquierda, leve rotación */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: '-1.5deg' }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 100, damping: 15 }}
            whileHover={{ scale: 1.05, rotate: '0deg', zIndex: 20 }}
            className="absolute bottom-0 left-[3%] w-[38%] h-[48%] cursor-pointer group"
            onClick={() => setIndex(2)}
          >
            <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl">
              <CdnImage
                urlEndpoint={urlEndpoint}
                src={photos[2].src}
                alt="Neo Barbería 3"
                fill
                sizes="40vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Imagen 4 - Mediana, abajo derecha, rotada */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: '2.5deg' }}
            transition={{ delay: 0.45, type: 'spring', stiffness: 100, damping: 15 }}
            whileHover={{ scale: 1.05, rotate: '0deg', zIndex: 20 }}
            className="absolute bottom-[8%] right-[2%] w-[54%] h-[45%] cursor-pointer group"
            onClick={() => setIndex(3)}
          >
            <div className="relative w-full h-full overflow-hidden rounded-lg shadow-2xl">
              <CdnImage
                urlEndpoint={urlEndpoint}
                src={photos[3].src}
                alt="Neo Barbería 4"
                fill
                sizes="55vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-bl from-accent/20 via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Versión Móvil - Grid Simple */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="md:hidden grid grid-cols-2 gap-3"
      >
        {photos.map((photo, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className={`relative cursor-pointer group overflow-hidden rounded-lg shadow-lg ${
              idx === 0 ? 'col-span-2 aspect-[4/3]' : 'aspect-square'
            }`}
            onClick={() => setIndex(idx)}
          >
            <CdnImage
              urlEndpoint={urlEndpoint}
              src={photo.src}
              alt={`Neo Barbería ${idx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {showBookingButton && onBookingClick && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
          onClick={onBookingClick}
          className="mt-8 w-full bg-primary hover:bg-primary-hover text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-glow hover:shadow-[0_0_40px_rgba(230,180,100,0.5)] transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          <span className="flex items-center justify-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Agenda tu cita ahora
          </span>
        </motion.button>
      )}

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
        }}
      />
    </>
  );
}

