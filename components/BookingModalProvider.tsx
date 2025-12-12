"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import BookingModal from "./BookingModal";

interface BookingModalContextValue {
  openBookingModal: (barberId?: number) => void;
  closeBookingModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error("useBookingModal must be used within BookingModalProvider");
  }
  return ctx;
}

export default function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialBarberId, setInitialBarberId] = useState<number | undefined>();

  const value = useMemo(
    () => ({
      openBookingModal: (barberId?: number) => {
        setInitialBarberId(barberId);
        setIsOpen(true);
      },
      closeBookingModal: () => {
        setIsOpen(false);
        setInitialBarberId(undefined);
      },
    }),
    []
  );

  return (
    <BookingModalContext.Provider value={value}>
      {children}
      {/* Renderizamos una sola instancia del modal global */}
      <BookingModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setInitialBarberId(undefined);
        }}
        initialBarberId={initialBarberId}
      />
    </BookingModalContext.Provider>
  );
}

