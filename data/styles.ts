export interface StyleCategory {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tagline: string;
  detailDescription: string;
  features: string[];
  gallery: { src: string; label: string }[];
}

export const stylesData: StyleCategory[] = [
  {
    slug: 'clasico',
    title: 'Clásico',
    subtitle: 'CLASSIC',
    description: 'Elegancia sin esfuerzo. Estructura, limpieza y carácter.',
    image: '/neobarberia_2026-01-28_09_23/portrait-charismatic-sensual-male-black-sweater-creative-personality.webp',
    tagline: 'El arte del corte con carácter',
    detailDescription:
      'El estilo clásico es sinónimo de sofisticación. Líneas definidas, volumen controlado y acabados pulidos que proyectan confianza. Desde el pompadour hasta el side part, cada corte habla de quien lo lleva.',
    features: ['Pompadour', 'Side Part', 'Slick Back', 'Taper tradicional', 'Ivy League'],
    gallery: [
      { src: '/neobarberia_2026-01-28_09_23/gallery/classsic/pompadour.webp', label: 'Pompadour Clásico' },
      { src: '/neobarberia_2026-01-28_09_23/gallery/classsic/tapper.webp', label: 'Taper Clásico' },
      { src: '/neobarberia_2026-01-28_09_23/gallery/classsic/sidepart.webp', label: 'Side Part' },
      { src: '/neobarberia_2026-01-28_09_23/gallery/classsic/crewcut.webp', label: 'Crew Cut Clásico' },
      { src: '/neobarberia_2026-01-28_09_23/gallery/classsic/ivy.webp', label: 'Ivy League' },
    ],
  },
  {
    slug: 'moderno',
    title: 'Moderno',
    subtitle: 'MODERN',
    description: 'Texturas vivas. Movimiento, actitud y personalidad.',
    image: '/neobarberia_2026-01-28_09_23/cd06874ebcad5ed5e1aa18e1388f4c32.jpg?updatedAt=1771285991186',
    tagline: 'Cortes que marcan tendencia',
    detailDescription:
      'El corte moderno es pura actitud. Fades agresivos, texturas con movimiento, crop francés y estilos que desafían lo convencional. Para quienes buscan un look fresco, dinámico y lleno de carácter.',
    features: ['Skin Fade', 'French Crop', 'Texturizado', 'Mullet Moderno', 'Diseño Freestyle'],
    gallery: [
      { src: '/neobarberia_2026-01-28_09_23/a326c8e546a490f543bc1c7ad998d461.jpg', label: 'Texturizado Moderno' },
      { src: '/neobarberia_2026-01-28_09_23/1759405506_bab390bdea15f5cb03a8506b9f45f21d.webp', label: 'Buzz Cut' },
      { src: '/neobarberia_2026-01-28_09_23/Swanky-Malone-French-Crop-Taper.jpg', label: 'French Crop' },
      { src: '/neobarberia_2026-01-28_09_23/mullet.webp', label: 'Mullet Moderno' },
      { src: '/neobarberia_2026-01-28_09_23/skin.webp', label: 'Skin Fade' },
    ],
  },
  {
    slug: 'barba',
    title: 'Barba',
    subtitle: 'BEARD',
    description: 'Distinción y porte. Barba perfilada con precisión artesanal.',
    image: '/neobarberia_2026-01-28_09_23/portrait-redhead-bearded-male-eyeglasses-dressed-elegant-wool-suit-grey-background.webp',
    tagline: 'Barba con identidad propia',
    detailDescription:
      'Una barba bien trabajada transforma por completo. Perfilado con navaja, degradados en barba, diseño personalizado y tratamientos con toalla caliente. El toque final que define tu estilo.',
    features: ['Perfilado con navaja', 'Barba degradada', 'Diseño personalizado', 'Hot Towel', 'Bigote esculpido'],
    gallery: [
      { src: '/neobarberia_2026-01-28_09_23/corporatebeard.webp', label: 'Barba Corporativa' },
      { src: '/neobarberia_2026-01-28_09_23/barbacortadegradada.webp', label: 'Barba Cortada Gradada' },
      { src: '/neobarberia_2026-01-28_09_23/barba-clasica.webp', label: 'Barba Clásica' },
      { src: '/neobarberia_2026-01-28_09_23/chevron.webp', label: 'Bigote Chevron' },
    ],
  },
];
