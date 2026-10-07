'use client';

import { useEffect } from 'react';

import { barbersData } from '@/data/barbers';
import { stylesData } from '@/data/styles';

const assetPaths = [
  '/videos/neo-hero-poster.webp',
  '/videos/neo-hero.mp4',
  ...barbersData.flatMap((barber) => [
    barber.imagen,
    ...barber.signatureCuts.map((cut) => cut.imagen),
  ]),
  ...stylesData.flatMap((style) => [
    style.image,
    ...style.gallery.map((item) => item.src),
  ]),
];

function preloadImage(src: string) {
  if (!src || src.endsWith('.mp4')) return;
  const image = new window.Image();
  image.decoding = 'async';
  image.src = src;
}

function preloadVideo(src: string) {
  const video = document.createElement('video');
  video.preload = 'metadata';
  video.muted = true;
  video.playsInline = true;
  video.src = src;
}

export default function PreloadExperienceAssets() {
  useEffect(() => {
    const run = () => {
      const uniqueAssets = Array.from(new Set(assetPaths));

      uniqueAssets.forEach((src, index) => {
        window.setTimeout(() => {
          if (src.endsWith('.mp4')) {
            preloadVideo(src);
            return;
          }

          preloadImage(src);
        }, index * 80);
      });
    };

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(run, { timeout: 2500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = globalThis.setTimeout(run, 1200);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  return null;
}
