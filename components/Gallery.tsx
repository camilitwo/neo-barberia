'use client';

import React, { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import GalleryLightbox from './GalleryLightbox';

const fetcher = (url: string) => fetch(url).then(res => res.json());

type Photo = {
  id: string;
  src: string;
  width?: number;
  height?: number;
  alt?: string;
};

export default function PhotosGallery(): JSX.Element {
  const { data, error } = useSWR<Photo[]>('/api/gallery', fetcher, { revalidateOnFocus: false });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const photos = useMemo(() => {
    if (!data) return [] as Photo[];
    return data.map((p: Photo) => ({ src: p.src, width: p.width || 4, height: p.height || 3, alt: p.alt || '' }));
  }, [data]);

  const openLightbox = useCallback((i: number) => {
    setIndex(i);
    setLightboxOpen(true);
  }, []);

  if (error) return <div className="text-red-500">Error cargando galería</div>;
  if (!data) return <div className="py-12 text-center">Cargando galería…</div>;

  return (
    <section id="galeria" className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Galería</h2>
      <p className="text-muted mb-6">Algunos de nuestros trabajos.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {photos.map((p, i) => (
          <button key={p.src} onClick={() => openLightbox(i)} className="relative block w-full h-48 overflow-hidden rounded-lg shadow-lg focus:outline-none">
            <Image src={p.src} alt={p.alt || `Imagen ${i + 1}`} fill sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" className="object-cover" priority={i < 8} />
          </button>
        ))}
      </div>

      <GalleryLightbox slides={photos} index={index} open={lightboxOpen} onClose={() => setLightboxOpen(false)} />
    </section>
  );
}
