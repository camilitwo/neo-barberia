'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function FloatingLogo() {
  return (
    <div className="w-full flex justify-center -mt-10 sm:-mt-16 md:-mt-24 pointer-events-none">
      <Link href="/" className="pointer-events-auto" aria-label="Neo Barbería - Inicio">
        {/* Contenedor rectangular con padding para que la imagen cuadrada se muestre completa */}
        <div className="bg-white/95 dark:bg-black/80 rounded-xl p-2 sm:p-3 md:p-4 shadow-xl border border-border flex items-center justify-center">
          {/* ancho y alto explícitos para que Image `fill` funcione correctamente */}
          <div className="relative w-16 sm:w-20 md:w-28 h-16 sm:h-20 md:h-28">
            <Image
              src="https://res.cloudinary.com/dddfx1xwt/image/upload/v1764116007/1_t2y8pa.png"
              alt="Neo Barbería"
              fill
              sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 112px"
              className="object-contain"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
