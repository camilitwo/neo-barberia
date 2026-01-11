export interface Barber {
  id: number;
  slug: string;
  nombre: string;
  apodo: string;
  especialidad: string;
  descripcion: string;
  imagen: string;
  disponibilidad: string;
  servicios: string[];
  galeria: { src: string; alt: string }[];
  publicaciones: { titulo: string; fecha: string; resumen: string }[];
  instagram?: string;
  facebook?: string;
}

export const barbersData: Barber[] = [
  {
    id: 1,
    slug: 'stofer',
    nombre: 'Christofer Beltrán',
    apodo: 'Stofer',
    especialidad: 'Corte Clásico',
    descripcion: 'Con más de 10 años de experiencia, domina el estilo clásico con precisión y profesionalismo.',
    disponibilidad: 'Martes a sábado · 10:00 - 20:00',
    servicios: ['Corte clásico premium', 'Perfilado de barba', 'Asesoría de estilo'],
    galeria: [
      {
        src: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1765021660/WhatsApp_Image_2025-12-01_at_09.18.24_mpsuh5.jpg',
        alt: 'Detalle de corte clásico por Stofer',
      },
      {
        src: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1765021659/WhatsApp_Image_2025-12-01_at_09.19.37_a1b0c7.jpg',
        alt: 'Acabado con textura natural por Stofer',
      },
      {
        src: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1765021659/WhatsApp_Image_2025-12-01_at_09.19.43_nqzjni.jpg',
        alt: 'Peinado clásico con volumen por Stofer',
      },
    ],
    publicaciones: [
      {
        titulo: 'Cómo mantener un corte clásico impecable',
        fecha: 'Marzo 2024',
        resumen: 'Rutina de cuidado en casa y productos esenciales para un acabado profesional.',
      },
      {
        titulo: 'Guía rápida para barba alineada',
        fecha: 'Febrero 2024',
        resumen: 'Tips de perfilado y limpieza para mantener la barba definida.',
      },
    ],
    imagen: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1764511152/400f4454-f75c-46c9-bd5c-c6e5a8661ea2_owfqid.webp',
    instagram: 'https://www.instagram.com/stofer_.barber/',
  },
  {
    id: 2,
    slug: 'viishon',
    nombre: 'Vicente Bravo',
    apodo: 'Viishon',
    especialidad: 'Fades Modernos',
    descripcion: 'Especialista en fades y diseños modernos, combina técnica con creatividad.',
    disponibilidad: 'Lunes a viernes · 11:00 - 21:00',
    servicios: ['Fades de autor', 'Diseño de líneas', 'Corte + styling urbano'],
    galeria: [
      {
        src: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1765021659/WhatsApp_Image_2025-12-01_at_09.19.43_1_zp0dzj.jpg',
        alt: 'Fade medio con diseño por Viishon',
      },
      {
        src: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1765021659/WhatsApp_Image_2025-12-01_at_09.19.43_nqzjni.jpg',
        alt: 'Textura moderna y fade por Viishon',
      },
      {
        src: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1765021660/WhatsApp_Image_2025-12-01_at_09.18.24_mpsuh5.jpg',
        alt: 'Degradado alto y acabado mate por Viishon',
      },
    ],
    publicaciones: [
      {
        titulo: 'Tendencias en fades 2024',
        fecha: 'Abril 2024',
        resumen: 'Las combinaciones de degradado que están marcando el estilo urbano.',
      },
      {
        titulo: 'Diseños personalizados sin perder elegancia',
        fecha: 'Enero 2024',
        resumen: 'Cómo integrar líneas y patrones sin saturar el look.',
      },
    ],
    imagen: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1764511152/5c78573f-3fde-4257-944d-b68f113e4b40_ctyy8e.webp',
    instagram: 'https://www.instagram.com/viishon.barber/',
  },
  {
    id: 3,
    slug: 'keo',
    nombre: 'Fabián Garrido',
    apodo: 'Keo',
    especialidad: 'Afeitados Clásicos',
    descripcion: 'Maestro en afeitados tradicionales y experto en perfilados de precisión.',
    disponibilidad: 'Miércoles a domingo · 12:00 - 20:00',
    servicios: ['Afeitado tradicional', 'Ritual de barba', 'Perfilado premium'],
    galeria: [
      {
        src: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1765021659/WhatsApp_Image_2025-12-01_at_09.19.37_a1b0c7.jpg',
        alt: 'Ritual de barba con toalla caliente por Keo',
      },
      {
        src: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1765021659/WhatsApp_Image_2025-12-01_at_09.19.43_1_zp0dzj.jpg',
        alt: 'Perfilado preciso de barba por Keo',
      },
      {
        src: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1765021660/WhatsApp_Image_2025-12-01_at_09.18.24_mpsuh5.jpg',
        alt: 'Afeitado clásico con acabado suave por Keo',
      },
    ],
    publicaciones: [
      {
        titulo: 'Ritual de afeitado: pasos clave',
        fecha: 'Marzo 2024',
        resumen: 'Preparación, técnica y cuidados posteriores para un afeitado perfecto.',
      },
      {
        titulo: 'Cómo elegir tu estilo de barba',
        fecha: 'Diciembre 2023',
        resumen: 'Recomendaciones según forma de rostro y densidad.',
      },
    ],
    imagen: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1764511151/576989ba-9099-4c0d-a430-69d314eedb44_jfph0o.webp',
    instagram: 'https://www.instagram.com/keo_barber.cl/',
  },
  {
    id: 4,
    slug: 'pato',
    nombre: 'Patricio Beltrán',
    apodo: 'Pato',
    especialidad: 'Diseños y Arte Capilar',
    descripcion: 'Creativo y detallista, transforma cada corte en una obra de arte.',
    disponibilidad: 'Jueves a lunes · 13:00 - 22:00',
    servicios: ['Diseños artísticos', 'Corte creativo', 'Color puntual'],
    galeria: [
      {
        src: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1765021659/WhatsApp_Image_2025-12-01_at_09.19.43_nqzjni.jpg',
        alt: 'Diseño gráfico en corte por Pato',
      },
      {
        src: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1765021660/WhatsApp_Image_2025-12-01_at_09.18.24_mpsuh5.jpg',
        alt: 'Textura creativa con contraste por Pato',
      },
      {
        src: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1765021659/WhatsApp_Image_2025-12-01_at_09.19.37_a1b0c7.jpg',
        alt: 'Detalle de líneas artísticas por Pato',
      },
    ],
    publicaciones: [
      {
        titulo: 'Arte capilar: cómo nace un diseño',
        fecha: 'Febrero 2024',
        resumen: 'Proceso creativo desde el boceto hasta el detalle final.',
      },
      {
        titulo: 'Colores de impacto sin perder elegancia',
        fecha: 'Noviembre 2023',
        resumen: 'Puntos de luz y color para potenciar un corte creativo.',
      },
    ],
    imagen: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1764511151/aw-image-53_vgsjzj.webp',
  },
];
