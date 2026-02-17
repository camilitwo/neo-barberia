'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import CdnImage from '@/components/CdnImage';
import { imagekitUrl } from '@/lib/imagekit';

const cuts = [
  {
    title: 'Pompadour',
    src: '/neobarberia_2026-01-28_09_23/cd06874ebcad5ed5e1aa18e1388f4c32.jpg',
  },
  {
    title: 'Crop francés',
    src: '/neobarberia_2026-01-28_09_23/Swanky-Malone-French-Crop-Taper.jpg',
  },
  {
    title: 'Buzz Cut',
    src: '/neobarberia_2026-01-28_09_23/1759405506_bab390bdea15f5cb03a8506b9f45f21d.webp',
  },
  {
    title: 'Texturizado',
    src: '/neobarberia_2026-01-28_09_23/a326c8e546a490f543bc1c7ad998d461.jpg',
  },
];

export default function PopularCutsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best: { index: number; ratio: number } | null = null;
        entries.forEach((entry) => {
          const idx = cards.indexOf(entry.target as HTMLDivElement);
          if (idx === -1) return;
          if (!best || entry.intersectionRatio > best.ratio) {
            best = { index: idx, ratio: entry.intersectionRatio };
          }
        });
        if (best && (best as { index: number; ratio: number }).ratio > 0.5) {
          setActiveIndex((best as { index: number; ratio: number }).index);
        }
      },
      { root: scrollRef.current, threshold: [0, 0.5, 1] }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="cortes" className="py-16 sm:py-20 border-t border-white/10 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 mb-8 flex items-baseline justify-between">
          <h2 className="text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight">
            Cortes Populares
          </h2>
          <span className="text-xs text-primary font-mono">[SCROLL]</span>
        </div>

        <div ref={scrollRef} className="popular-cuts flex overflow-x-auto gap-1 px-4 sm:px-6 pb-8 snap-x snap-mandatory">
          {cuts.map((cut, i) => (
            <motion.div
              key={cut.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              whileHover={{ scale: 1.01 }}
              className="flex-none w-[80vw] sm:w-[65vw] md:w-[40vw] snap-center relative aspect-[3/4] group overflow-hidden"
            >
              <CdnImage
                src={imagekitUrl(cut.src)}
                alt={cut.title}
                fill
                sizes="(max-width: 768px) 80vw, (max-width: 1024px) 65vw, 40vw"
                className={`object-cover transition-all duration-500 ${
                  activeIndex === i ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'
                }`}
              />
              <div className="absolute bottom-4 left-4">
                <p className="text-white text-xl uppercase tracking-wider bg-black/50 px-2">
                  {cut.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .popular-cuts {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .popular-cuts::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
