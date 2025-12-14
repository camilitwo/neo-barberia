'use client';

import { useBookingModal } from './BookingModalProvider';

interface BarberBookingButtonProps {
  barberId: number;
  label?: string;
  className?: string;
}

export default function BarberBookingButton({ barberId, label = 'Agendar', className = '' }: BarberBookingButtonProps) {
  const { openBookingModal } = useBookingModal();

  return (
    <button
      onClick={() => openBookingModal(barberId)}
      className={`px-6 py-3 bg-primary hover:bg-primary-hover text-black font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
    >
      {label}
    </button>
  );
}
