'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import CdnImage from '@/components/CdnImage';
import { imagekitUrl } from '@/lib/imagekit';
import { stylesData } from '@/data/styles';

const goldLine = { backgroundColor: 'rgba(230, 180, 100, 0.35)' };
const ghostColor = { color: 'rgba(255,255,255,0.07)' };
const imgBorder = { border: '1px solid rgba(255,255,255,0.06)' };

function StyleCard({ style, index }: { style: (typeof stylesData)[number]; index: number }) {
  return (
    <Link href={`/estilos/${style.slug}`} className="group relative z-10 block">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className="flex flex-col relative"
      >
        {/* Ghost text */}
        <span
          className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none select-none mb-2"
          style={ghostColor}
        >
          {style.subtitle}
        </span>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 tracking-[0.25em] uppercase group-hover:text-primary transition-colors duration-300">
          {style.title}
        </h3>

        {/* Image */}
        <div className="w-full aspect-[4/5] mb-4 md:mb-6 overflow-hidden rounded-sm relative" style={imgBorder}>
          <CdnImage
            src={imagekitUrl(style.image)}
            alt={style.title}
            fill
            sizes="(max-width: 768px) 70vw, 30vw"
            className="object-cover grainy-bw group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
          />
        </div>

        {/* Description */}
        <p className="text-[10px] text-gray-500 leading-relaxed tracking-[0.2em] uppercase max-w-[160px]">
          {style.description}
        </p>
      </motion.div>
    </Link>
  );
}

export default function StylesShowcase() {
  return (
    <section id="estilos" className="bg-background py-12 sm:py-16 lg:py-24 relative overflow-hidden">

      {/* ═══ MOBILE: horizontal scroll carousel ═══ */}
      <div className="md:hidden">
        <div className="flex overflow-x-auto gap-6 px-6 pb-6 snap-x snap-mandatory no-scrollbar">
          {stylesData.map((style, i) => (
            <div key={style.slug} className="snap-center shrink-0 w-[70vw] max-w-[300px]">
              <StyleCard style={style} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* ═══ DESKTOP: 3-col grid with gold dividers ═══ */}
      <div className="hidden md:block max-w-6xl mx-auto px-8 relative">
        <div className="grid grid-cols-3 gap-0 relative">

          {/* Gold vertical dividers */}
          <div className="absolute left-[33.33%] top-0 bottom-0 w-px -translate-x-1/2 z-20" style={goldLine} />
          <div className="absolute left-[66.66%] top-0 bottom-0 w-px -translate-x-1/2 z-20" style={goldLine} />

          {/* Col 1 — Clásico (top) */}
          <div className="pr-8 pt-10 pb-10">
            <StyleCard style={stylesData[0]} index={0} />
          </div>

          {/* Col 2 — Moderno (staggered down) */}
          <div className="px-8 pt-24 pb-10 flex flex-col items-end text-right">
            <div className="w-full">
              <StyleCard style={stylesData[1]} index={1} />
            </div>
          </div>

          {/* Col 3 — Barba (top) */}
          <div className="pl-8 pt-10 pb-10">
            <StyleCard style={stylesData[2]} index={2} />
          </div>

        </div>
      </div>

    </section>
  );
}
