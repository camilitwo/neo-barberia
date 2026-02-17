export interface BarberCut {
  imagen: string;
  label: string;
}

export interface Barber {
  id: number;
  nombre: string;
  apodo: string;
  especialidad: string;
  descripcion: string;
  imagen: string;
  instagram?: string;
  facebook?: string;
  yearsExperience: number;
  role: string;
  interests: string[];
  signatureCuts: BarberCut[];
  quote: string;
}

export const barbersData: Barber[] = [
  {
    id: 1,
    nombre: 'Christofer Beltrán',
    apodo: 'Stofer',
    especialidad: 'Corte Clásico',
    descripcion: 'Con más de 10 años de experiencia, domina el estilo clásico con precisión y profesionalismo.',
    imagen: '/neobarberia_2026-01-28_09_23/barbers/400f4454-f75c-46c9-bd5c-c6e5a8661ea2_owfqid.webp',
    instagram: 'https://www.instagram.com/stofer_.barber/',
    yearsExperience: 10,
    role: 'FOUNDER',
    interests: ['Corte Clásico', 'Tijera sobre peine', 'Estilo Old School', 'Navaja tradicional'],
    signatureCuts: [
      { imagen: '/neobarberia_2026-01-28_09_23/barbers/400f4454-f75c-46c9-bd5c-c6e5a8661ea2_owfqid.webp', label: '' },
      { imagen: 'neobarberia_2026-01-28_09_23/barbers/Chris/IMG_6308_ydhab1.jpg?updatedAt=1769603096843', label: '' },
      
    ],
    quote: 'LA PRECISIÓN NO ES TÉCNICA; ES UN LENGUAJE DE NECESIDAD MECÁNICA.',
  },
  {
    id: 2,
    nombre: 'Vicente Bravo',
    apodo: 'Viishon',
    especialidad: 'Fades Modernos',
    descripcion: 'Especialista en fades y diseños modernos, combina técnica con creatividad.',
    imagen: '/neobarberia_2026-01-28_09_23/barbers/5c78573f-3fde-4257-944d-b68f113e4b40_ctyy8e.webp',
    instagram: 'https://www.instagram.com/viishon.barber/',
    yearsExperience: 6,
    role: 'SENIOR BARBER',
    interests: ['Fades Modernos', 'Skin Fade', 'Diseño Freestyle', 'Texturas'],
    signatureCuts: [
      { imagen: '/neobarberia_2026-01-28_09_23/barbers/5c78573f-3fde-4257-944d-b68f113e4b40_ctyy8e.webp', label: 'SKIN_FADE' },
      { imagen: '/neobarberia_2026-01-28_09_23/gallery/WhatsApp_Image_2025-12-01_at_09.19.43_1_zp0dzj.jpg?updatedAt=1769603095497', label: 'DROP_FADE' },
    ],
    quote: 'CADA FADE ES UNA TRANSICIÓN ENTRE LO VISIBLE Y LO INVISIBLE.',
  },
  {
    id: 3,
    nombre: 'Fabián Garrido',
    apodo: 'Keo',
    especialidad: 'Afeitados Clásicos',
    descripcion: 'Maestro en afeitados tradicionales y experto en perfilados de precisión.',
    imagen: '/neobarberia_2026-01-28_09_23/barbers/576989ba-9099-4c0d-a430-69d314eedb44_jfph0o.webp',
    instagram: 'https://www.instagram.com/keo_barber.cl/',
    yearsExperience: 5,
    role: 'BARBER',
    interests: ['Afeitado Clásico', 'Perfilado de barba', 'Hot Towel', 'Navaja recta'],
    signatureCuts: [
      { imagen: '/neobarberia_2026-01-28_09_23/barbers/576989ba-9099-4c0d-a430-69d314eedb44_jfph0o.webp', label: 'RAZOR_SHAVE' },
      { imagen: '/neobarberia_2026-01-28_09_23/gallery/WhatsApp_Image_2025-12-01_at_09.19.43_nqzjni.jpg?updatedAt=1769603095899', label: 'BEARD_SCULPT' },
    ],
    quote: 'EL AFEITADO ES UN RITUAL, NO UN PROCEDIMIENTO.',
  },
  {
    id: 4,
    nombre: 'Patricio Beltrán',
    apodo: 'Pato',
    especialidad: 'Diseños y Arte Capilar',
    descripcion: 'Creativo y detallista, transforma cada corte en una obra de arte.',
    imagen: '/neobarberia_2026-01-28_09_23/barbers/aw-image-53_vgsjzj.webp',
    yearsExperience: 4,
    role: 'CREATIVE BARBER',
    interests: ['Arte Capilar', 'Diseños Geométricos', 'Color Creativo', 'Freestyle Art'],
    signatureCuts: [
      { imagen: '/neobarberia_2026-01-28_09_23/barbers/aw-image-53_vgsjzj.webp', label: 'HAIR_ART' },
    ],
    quote: 'CADA CABEZA ES UN LIENZO; CADA CORTE, UNA DECLARACIÓN.',
  },
];
