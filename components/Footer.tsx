'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: '👍', href: 'https://facebook.com/neobarberia', label: 'Facebook' },
    { icon: '🐦', href: 'https://twitter.com/neobarberia', label: 'Twitter' },
    { icon: '📷', href: 'https://instagram.com/neobarberia', label: 'Instagram' },
  ];

  const footerLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#equipo', label: 'Equipo' },
    { href: '#contacto', label: 'Contacto' },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.h3
              className="text-3xl font-bold text-gradient"
              whileHover={{ scale: 1.05 }}
            >
              Neo Barbería
            </motion.h3>
            <p className="text-muted text-sm">
              La barbería que está revolucionando Quilicura con estilo, precisión y personalidad.
            </p>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Enlaces</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-primary transition-colors duration-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">Síguenos</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{
                    scale: 1.2,
                    y: -5,
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-surface hover:bg-primary/30 rounded-full flex items-center justify-center text-2xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <div className="text-muted text-sm space-y-1 pt-4">
              <p>Horario de atención:</p>
              <p className="text-primary font-semibold">Lun-Dom: 11:00 - 20:30</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted text-sm">
            Copyright © {currentYear} Neo Barbería. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="#" className="text-muted hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded">
              Privacidad
            </Link>
            <Link href="#" className="text-muted hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
