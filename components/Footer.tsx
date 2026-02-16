'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Usar mismos enlaces que en Contact.tsx
  const instagramUrl = 'https://www.instagram.com/neobarberia.cl/';
  const tiktokUrl = 'https://www.tiktok.com/@neo.barberia.cl';
  const whatsappNumber = '56923726076';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola NeoBarberia!')}`;
  const mapsDirections = 'https://www.google.com/maps/dir/?api=1&destination=-33.35871917342603,-70.73995452397547';

  return (
    <footer className="relative bg-black text-white pt-24 pb-0 overflow-hidden">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 z-20">
        <a
          className="group flex items-center justify-center w-8 h-8 rounded-full border border-white/20 hover:border-white transition-colors duration-300"
          href="#inicio"
          aria-label="Volver arriba"
        >
          <span className="text-sm text-gray-400 group-hover:text-white transition-colors">↑</span>
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-24 md:mb-32 relative z-10 text-center md:text-left justify-items-center md:justify-items-start">
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">Location</h4>
            <a
              className="text-[11px] font-medium tracking-wide text-gray-300 hover:text-white transition-colors"
              href={mapsDirections}
              target="_blank"
              rel="noopener noreferrer"
            >
              Quilicura, Santiago,
              <br />
              Chile
            </a>
            <a
              className="text-[11px] font-medium tracking-wide text-gray-300 hover:text-white transition-colors mt-2"
              href={mapsDirections}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-4">
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">Social</h4>
            <a
              className="text-[11px] font-medium tracking-widest text-gray-300 hover:text-white uppercase transition-colors"
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              className="text-[11px] font-medium tracking-widest text-gray-300 hover:text-white uppercase transition-colors"
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              TikTok
            </a>
            <a
              className="text-[11px] font-medium tracking-widest text-gray-300 hover:text-white uppercase transition-colors"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-4">
            <h4 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">Legal</h4>
            <span className="text-[11px] font-medium tracking-wide text-gray-300">Horario</span>
            <span className="text-[11px] font-medium tracking-wide text-gray-300">Lun-Dom: 11:00 - 20:30</span>
            <span className="text-[11px] font-medium tracking-wide text-gray-300">© {currentYear} Neo Barbería</span>
            <Link
              href="https://github.com/camilitwo"
              className="text-[11px] font-medium tracking-wide text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              Diseñado por Camilo González
            </Link>
          </div>
        </div>
      </div>
      
    </footer>
  );
}
