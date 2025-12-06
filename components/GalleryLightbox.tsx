'use client';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import React, { useEffect, useState } from 'react';

interface Slide {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
}

interface Props {
  slides: Slide[];
  index: number;
  open: boolean;
  onClose: () => void;
}

export default function GalleryLightbox({ slides, index, open, onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number>(index);

  useEffect(() => {
    setCurrentIndex(index);
  }, [index]);

  return (
    <Lightbox
      open={open}
      index={currentIndex}
      slides={slides.map((s) => ({ src: s.src, alt: s.alt }))}
      onClose={onClose}
      onIndexChange={(i: number) => setCurrentIndex(i)}
      styles={{
        container: { backgroundColor: 'rgba(0,0,0,0.95)' },
      }}
    />
  );
}
