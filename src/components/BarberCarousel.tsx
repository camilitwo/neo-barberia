'use client';

import { useEffect, useMemo, useState } from 'react';

type Barber = {
  name: string;
  role: string;
  description: string;
  specialties: string[];
  principle: string;
};

export function BarberCarousel({ barbers }: { barbers: Barber[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const safeLength = Math.max(barbers.length, 1);

  const mod = useMemo(() => (value: number) => (value + safeLength) % safeLength, [safeLength]);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((current) => mod(current + 1));
    }, 6200);

    return () => clearInterval(id);
  }, [mod]);

  if (barbers.length === 0) return null;

  return (
    <div className="carousel" aria-label="Carrusel de barberos" role="region">
      <div
        className="carousel__track"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        aria-live="polite"
      >
        {barbers.map((barber, index) => (
          <article key={barber.name} className="carousel__item">
            <div className="barber-portrait">
              <span aria-hidden> {barber.name.charAt(0)} </span>
            </div>
            <div className="carousel__content">
              <p className="ribbon">{barber.role}</p>
              <h3>{barber.name}</h3>
              <p>{barber.description}</p>
              <div className="tags">
                {barber.specialties.map((tag) => (
                  <span key={tag} className="pill">
                    {tag}
                  </span>
                ))}
              </div>
              <p>
                Inspirado en <strong>{barber.principle}</strong> para mantener cada movimiento
                elegante y consistente.
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className="carousel__controls" aria-hidden>
        <button type="button" onClick={() => setActiveIndex((current) => mod(current - 1))}>
          ‹
        </button>
        <button type="button" onClick={() => setActiveIndex((current) => mod(current + 1))}>
          ›
        </button>
      </div>
    </div>
  );
}
