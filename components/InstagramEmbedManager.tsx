"use client";

import { useEffect } from 'react';

interface InstagramEmbedManagerProps {
  slug: string;
}

// Gestiona la carga del script de Instagram y reprocesa los embeds
// cada vez que cambia el barbero (slug).
export default function InstagramEmbedManager({ slug }: InstagramEmbedManagerProps) {
  // Cargar el script solo una vez en el cliente
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const w = window as any;

    // Si ya existe instgrm asumimos que el script fue cargado antes
    if (w.instgrm && w.instgrm.Embeds && typeof w.instgrm.Embeds.process === 'function') {
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.instagram.com/embed.js"]'
    );

    if (existingScript) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;

    document.body.appendChild(script);
  }, []);

  // Reprocesar embeds cada vez que cambia el slug
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const w = window as any;

    if (w.instgrm && w.instgrm.Embeds && typeof w.instgrm.Embeds.process === 'function') {
      try {
        w.instgrm.Embeds.process();
      } catch (e) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Error al reprocesar embeds de Instagram', e);
        }
      }
    }
  }, [slug]);

  return null;
}

