'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import { Barber } from '@/data/barbers';

import CdnImage from '@/components/CdnImage';
import { imagekitUrl } from '@/lib/imagekit';

interface BarberCarouselProps {
  barbers: Barber[];
}

export default function BarberCarousel({ barbers }: BarberCarouselProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  return (
    <section
      id="equipo"
      ref={ref}
      className="py-16 sm:py-20 md:py-32 px-4 bg-surface"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gradient text-gradient-fallback">
            Nuestro Equipo
          </h2>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto">
            Conoce a los artistas detrás de cada corte. ¡Descubre el estilo NeoBarbería!
          </p>
        </motion.div>

        {/* Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          spaceBetween={30}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          className="barber-swiper pb-16"
        >
          {barbers.map((barber, index) => (
            <SwiperSlide key={barber.id}>
              <BarberCard barber={barber} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .barber-swiper {
          padding: 20px;
        }

        .barber-swiper .swiper-pagination-bullet {
          background: var(--primary);
          width: 12px;
          height: 12px;
          opacity: 0.5;
        }

        .barber-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: var(--accent);
        }

        .barber-swiper .swiper-button-next,
        .barber-swiper .swiper-button-prev {
          color: var(--primary);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .barber-swiper .swiper-button-next:hover,
        .barber-swiper .swiper-button-prev:hover {
          background: rgba(230, 180, 100, 0.3);
          transform: scale(1.1);
        }

        .barber-swiper .swiper-button-next::after,
        .barber-swiper .swiper-button-prev::after {
          font-size: 20px;
          font-weight: bold;
        }
      `}</style>
    </section>
  );
}

function BarberCard({ barber, index }: { barber: Barber; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
      }}
      whileHover={{
        y: -10,
        transition: {
          type: 'spring',
          stiffness: 400,
          damping: 10,
        }
      }}
      className="glass-effect rounded-2xl overflow-hidden shadow-2xl h-full group cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-80 overflow-hidden">
        <Image
          src={barber.imagen}
          alt={barber.nombre}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <CdnImage
                src={barber.imagen}
                alt={barber.nombre}
                fill
                sizes="50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Nickname Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            delay: 0.3,
          }}
          className="absolute top-4 right-4 bg-primary text-black px-4 py-2 rounded-full font-bold shadow-lg"
        >
          {barber.apodo}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <motion.h3
          className="text-2xl font-bold text-white"
          whileHover={{ scale: 1.05, color: 'var(--primary)' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {barber.nombre}
        </motion.h3>

        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <p className="text-primary font-semibold text-xs sm:text-sm uppercase tracking-wider">
            {barber.especialidad}
          </p>
        </div>

        <p className="text-muted text-sm leading-relaxed">
          {barber.descripcion}
        </p>

        {/* Social Icons */}
        {(barber.instagram || barber.facebook) && (
          <div className="flex space-x-4 pt-4">
            {barber.instagram && (
              <motion.a
                href={barber.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.2,
                  rotate: 15,
                }}
                whileTap={{ scale: 0.9 }}
                className="text-foreground hover:text-accent transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </motion.a>
            )}
            {barber.facebook && (
              <motion.a
                href={barber.facebook}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.2,
                  rotate: -15,
                }}
                whileTap={{ scale: 0.9 }}
                className="text-foreground hover:text-accent transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </motion.a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
