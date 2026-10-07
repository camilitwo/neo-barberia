'use client';

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState } from 'react';
import CdnImage from '@/components/CdnImage';
import { imagekitUrl } from '@/lib/imagekit';
import { stylesData } from '@/data/styles';

const styleScenes = [
  {
    wash: 'rgba(230,180,100,0.16)',
    accent: 'var(--primary)',
    texture: 'linear-gradient(135deg, rgba(255,255,255,0.075), transparent 28%, rgba(230,180,100,0.08) 62%, transparent)',
  },
  {
    wash: 'rgba(245,124,0,0.14)',
    accent: 'var(--accent)',
    texture: 'linear-gradient(145deg, transparent, rgba(245,124,0,0.09) 35%, rgba(255,255,255,0.055) 70%, transparent)',
  },
  {
    wash: 'rgba(255,255,255,0.11)',
    accent: '#f5f5f5',
    texture: 'linear-gradient(120deg, rgba(255,255,255,0.06), transparent 34%, rgba(230,180,100,0.065) 76%, transparent)',
  },
];

function StyleCard({ style, index }: { style: (typeof stylesData)[number]; index: number }) {
  return (
    <Link href={`/estilos/${style.slug}`} className="group relative z-10 block">
      <motion.div
        initial={{ opacity: 1, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
        className="flex flex-col relative"
      >
        <span
          className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-none select-none mb-2 text-white/[0.07]"
        >
          {style.subtitle}
        </span>

        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 tracking-[0.25em] uppercase group-hover:text-primary transition-colors duration-300">
          {style.title}
        </h3>

        <div className="w-full aspect-[4/5] mb-4 md:mb-6 overflow-hidden rounded-sm relative border border-white/[0.08] bg-black active:scale-[0.98] transition-transform duration-200 ease-out">
          <CdnImage
            src={imagekitUrl(style.image)}
            alt={style.title}
            fill
            sizes="(max-width: 768px) 70vw, 30vw"
            priority={index === 0}
            className="object-cover grainy-bw group-hover:grayscale-0 group-hover:scale-[1.035] will-change-transform styles-img"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-50" />
        </div>

        <p className="text-xs text-gray-400 leading-relaxed tracking-[0.15em] uppercase max-w-[160px]">
          {style.description}
        </p>
      </motion.div>
    </Link>
  );
}

export default function StylesShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const firstOpacity = useTransform(scrollYProgress, [0, 0.18, 0.36], [1, 1, 0]);
  const secondOpacity = useTransform(scrollYProgress, [0.22, 0.42, 0.62], [0, 1, 0]);
  const thirdOpacity = useTransform(scrollYProgress, [0.56, 0.76, 1], [0, 1, 1]);
  const firstScale = useTransform(scrollYProgress, [0, 0.36], [1, 1.035]);
  const secondScale = useTransform(scrollYProgress, [0.22, 0.62], [1.035, 1]);
  const thirdScale = useTransform(scrollYProgress, [0.56, 1], [1.035, 1]);
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.34) {
      setActiveIndex(0);
      return;
    }

    if (latest < 0.68) {
      setActiveIndex(1);
      return;
    }

    setActiveIndex(2);
  });

  const imageMotion = [
    { opacity: firstOpacity, scale: firstScale },
    { opacity: secondOpacity, scale: secondScale },
    { opacity: thirdOpacity, scale: thirdScale },
  ];
  const activeScene = styleScenes[activeIndex] ?? styleScenes[0];

  return (
    <section
      id="estilos"
      ref={sectionRef}
      className="styles-scroll bg-background py-16 sm:py-20 md:min-h-[300dvh] md:py-0 relative overflow-visible"
    >
      <div className="mx-auto mb-10 max-w-6xl px-6 md:hidden">
        <p className="text-sm font-semibold text-primary">Tipos de corte</p>
        <h2 className="mt-3 max-w-3xl text-[clamp(2.4rem,6vw,4.6rem)] font-extrabold leading-[0.96] tracking-[-0.035em] text-white text-balance">
          El estilo correcto se nota al salir.
        </h2>
      </div>

      <div className="md:hidden">
        <div className="flex overflow-x-auto gap-5 px-6 pb-6 snap-x snap-mandatory no-scrollbar">
          {stylesData.map((style, i) => (
            <div key={style.slug} className="snap-center shrink-0 w-[72vw] max-w-[300px]">
              <StyleCard style={style} index={i} />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:sticky md:top-0 md:flex md:min-h-[100dvh] md:items-center md:overflow-hidden">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            backgroundColor: activeIndex === 0 ? 'rgba(12,10,8,1)' : activeIndex === 1 ? 'rgba(13,8,5,1)' : 'rgba(8,8,8,1)',
          }}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-90"
          animate={{ backgroundImage: activeScene.texture }}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          animate={{ backgroundColor: activeScene.accent }}
          transition={{ duration: reduceMotion ? 0 : 0.45 }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,0.92fr)_minmax(420px,0.8fr)] items-center gap-14 px-8 lg:px-10">
          <div>
            <p className="text-sm font-semibold text-primary">Tipos de corte</p>
            <h2 className="mt-4 max-w-3xl text-[clamp(3.3rem,7.2vw,6.4rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-white text-balance">
              El estilo correcto se nota al salir.
            </h2>

            <div className="mt-10 grid max-w-3xl grid-cols-[2px_1fr] gap-7">
              <div className="relative overflow-hidden bg-white/12">
                <motion.div
                  className="absolute left-0 top-0 w-full origin-top"
                  style={{ height: progressHeight, backgroundColor: activeScene.accent }}
                />
              </div>

              <div className="space-y-1">
                {stylesData.map((style, index) => {
                  const isActive = activeIndex === index;

                  return (
                    <Link
                      key={style.slug}
                      href={`/estilos/${style.slug}`}
                      className="group block border-b border-white/12 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <div className="flex items-start justify-between gap-8">
                        <div>
                          <motion.p
                            className="text-4xl font-extrabold leading-none tracking-[-0.035em] text-white transition-colors duration-300 group-hover:text-primary"
                            animate={{ opacity: isActive ? 1 : 0.38, x: isActive ? 0 : -8 }}
                            transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                          >
                            {style.title}
                          </motion.p>
                          <motion.p
                            className="mt-3 max-w-md text-sm leading-6 text-gray-300"
                            animate={{ opacity: isActive ? 1 : 0.46 }}
                            transition={{ duration: reduceMotion ? 0 : 0.32 }}
                          >
                            {style.description}
                          </motion.p>
                        </div>
                        <motion.span
                          className="pt-2 text-xs font-bold text-primary"
                          animate={{ opacity: isActive ? 1 : 0.22 }}
                        >
                          0{index + 1}
                        </motion.span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-white/12 bg-black shadow-[0_32px_90px_rgba(0,0,0,0.44)]">
              {stylesData.map((style, index) => (
                <motion.div
                  key={style.slug}
                  className="absolute inset-0"
                  style={imageMotion[index]}
                >
                  <CdnImage
                    src={imagekitUrl(style.image)}
                    alt={style.title}
                    fill
                    sizes="42vw"
                    priority={index === 0}
                    className="object-cover grayscale contrast-125 brightness-90"
                  />
                </motion.div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/64 via-transparent to-black/10" />
              <div className="absolute bottom-5 left-5 right-5">
                <motion.div
                  className="border border-white/14 bg-black/36 px-5 py-4 backdrop-blur-xl"
                  animate={{ borderColor: activeIndex === 1 ? 'rgba(245,124,0,0.45)' : activeIndex === 0 ? 'rgba(230,180,100,0.45)' : 'rgba(255,255,255,0.28)' }}
                  transition={{ duration: reduceMotion ? 0 : 0.36 }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: activeScene.accent }}>
                    {stylesData[activeIndex]?.subtitle}
                  </p>
                  <p className="mt-2 text-2xl font-extrabold leading-none text-white">
                    {stylesData[activeIndex]?.tagline}
                  </p>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="pointer-events-none absolute -inset-6 -z-10 blur-2xl"
              animate={{ backgroundColor: activeScene.wash }}
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
        {stylesData.flatMap((style) => [style.image, ...style.gallery.map((item) => item.src)]).map((src) => (
          <CdnImage
            key={src}
            src={imagekitUrl(src)}
            alt=""
            width={24}
            height={30}
            aria-hidden="true"
          />
        ))}
      </div>

    </section>
  );
}
