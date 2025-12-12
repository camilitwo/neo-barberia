'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import BookingModal from './BookingModal';

export default function FloatingBookingButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsModalOpen(true)}
        aria-label="Agenda tu cita"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 1,
          }
        }}
        whileHover={{
          scale: 1.1,
          y: -5,
          transition: {
            type: 'spring',
            stiffness: 400,
            damping: 10,
          }
        }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 z-50 px-5 sm:px-6 py-3 sm:py-4 bg-primary hover:bg-primary-hover text-black font-bold text-sm sm:text-lg rounded-full shadow-2xl cursor-pointer overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        style={{
          boxShadow: '0 10px 40px rgba(212, 175, 55, 0.4)',
        }}
      >
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-accent/20"
          initial={{ x: '100%' }}
          animate={{ x: isHovered ? '0%' : '100%' }}
          transition={{ duration: 0.3 }}
        />

      {/* Content */}
      <span className="relative z-10 flex items-center space-x-2">
        <motion.span
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        ><CalendarOutlined />
        </motion.span>
        <span>Agenda Aquí</span>
      </span>

        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 bg-primary rounded-full"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </motion.button>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
