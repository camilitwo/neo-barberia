'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CdnImage from '@/components/CdnImage';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(() => {
    if (typeof window !== 'undefined') return window.location.hash || '#inicio';
    return '#inicio';
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (pathname !== '/') return;

      const sectionIds = ['inicio', 'nosotros', 'equipo', 'galeria', 'contacto'];
      const scrollY = window.scrollY;
      const offset = 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (scrollY + offset >= top) {
          setActiveHref(`#${sectionIds[i]}`);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
    if (pathname === '/nosotros') {
      setActiveHref('/nosotros');
      return;
    }
    if (pathname === '/galeria') {
      setActiveHref('/galeria');
      return;
    }
    if (pathname === '/') {
      setActiveHref((typeof window !== 'undefined' && window.location.hash) ? window.location.hash : '#inicio');
    }
  }, [pathname]);

  const navLinks = useMemo(() => {
    const home = '/#inicio';
    const team = '/#equipo';
    const contact = '/#contacto';
    return [
      { href: home, label: 'Inicio', activeKey: '#inicio' },
      { href: '/nosotros', label: 'Nosotros', activeKey: '/nosotros' },
      { href: team, label: 'Equipo', activeKey: '#equipo' },
      { href: '/galeria', label: 'Galería', activeKey: '/galeria' },
      { href: contact, label: 'Contacto', activeKey: '#contacto' },
    ];
  }, []);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 flex justify-between items-center transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 supports-[backdrop-filter]:bg-black/50 backdrop-blur-md'
          : 'bg-black/85 supports-[backdrop-filter]:bg-black/45 backdrop-blur-md sm:bg-transparent sm:backdrop-blur-0'
      }`}
    >
      <Link href="/" className="flex items-center gap-3">
        <span className="relative w-9 h-9 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm overflow-hidden">
          <CdnImage
            src="/neobarberia_2026-01-28_09_23/1_t2y8pa.png"
            alt="Neo Barbería"
            fill
            sizes="36px"
            className="object-contain"
          />
        </span>
        <span className="font-bold text-sm uppercase tracking-[0.35em] text-white mix-blend-difference">
          Neo
        </span>
      </Link>

      <nav className="hidden sm:flex items-center gap-4 sm:gap-6 md:gap-8">
        {navLinks.map((link) => {
          const isActive = activeHref === link.activeKey;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setActiveHref(link.activeKey)}
              className={`relative font-semibold uppercase transition-colors ${
                'text-white hover:text-primary'
              } ${
                'text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em]'
              } ${isActive ? 'text-primary' : ''} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded`}
            >
              {link.label}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[3px] h-[3px] sm:w-1 sm:h-1 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={() => setIsMenuOpen((v) => !v)}
        className="sm:hidden w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-sm text-white hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Abrir menú"
        aria-expanded={isMenuOpen}
      >
        <span className="text-lg">☰</span>
      </button>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] sm:hidden"
        >
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 left-4 right-4 rounded-2xl border border-white/10 bg-background/95 backdrop-blur-md p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-gray-300">Menu</span>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-white/30 transition-colors"
                aria-label="Cerrar"
              >
                <span className="text-lg">×</span>
              </button>
            </div>

            <div className="mt-4 flex flex-col">
              {navLinks.map((link) => {
                const isActive = activeHref === link.activeKey;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      setActiveHref(link.activeKey);
                      setIsMenuOpen(false);
                    }}
                    className={`py-3 border-b border-white/10 last:border-b-0 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                      isActive ? 'text-primary' : 'text-white hover:text-primary'
                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded`}
                  >
                    <span className="relative inline-block">
                      {link.label}
                      {isActive && (
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                      )}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.header>
  );
}
