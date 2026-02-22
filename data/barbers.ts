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
    especialidad: 'Fundador & Barbero',
    descripcion: 'Más de una década transformando estilos. Su visión creó Neo Barbería y su precisión define cada experiencia.',
    imagen: '/neobarberia_2026-01-28_09_23/barbers/400f4454-f75c-46c9-bd5c-c6e5a8661ea2_owfqid.webp',
    instagram: 'https://www.instagram.com/stoferbarber/',
    yearsExperience: 10,
    role: 'FOUNDER',
    interests: ['Visión creativa', 'Atención al detalle', 'Experiencia premium', 'Estilo personalizado'],
    signatureCuts: [
      { imagen: '/neobarberia_2026-01-28_09_23/barbers/400f4454-f75c-46c9-bd5c-c6e5a8661ea2_owfqid.webp', label: '' },
      { imagen: 'neobarberia_2026-01-28_09_23/barbers/Chris/IMG_6308_ydhab1.jpg?updatedAt=1769603096843', label: '' },
      
    ],
    quote: 'LA PRECISIÓN NO ES TÉCNICA, ES ACTITUD.',
  },
  {
    id: 2,
    nombre: 'Vicente Bravo',
    apodo: 'Viishon',
    especialidad: 'Senior Barber',
    descripcion: 'Creatividad y técnica en cada corte. Entiende lo que necesitás antes de que lo digas.',
    imagen: '/neobarberia_2026-01-28_09_23/barbers/5c78573f-3fde-4257-944d-b68f113e4b40_ctyy8e.webp',
    instagram: 'https://www.instagram.com/viishon.barber/',
    yearsExperience: 6,
    role: 'SENIOR BARBER',
    interests: ['Tendencias actuales', 'Asesoría de imagen', 'Estilo urbano', 'Innovación constante'],
    signatureCuts: [
      { imagen: '/neobarberia_2026-01-28_09_23/barbers/5c78573f-3fde-4257-944d-b68f113e4b40_ctyy8e.webp', label: 'SKIN_FADE' },
      { imagen: '/neobarberia_2026-01-28_09_23/gallery/WhatsApp_Image_2025-12-01_at_09.19.43_1_zp0dzj.jpg?updatedAt=1769603095497', label: 'DROP_FADE' },
    ],
    quote: 'TU ESTILO HABLA ANTES QUE VOS.',
  },
  {
    id: 3,
    nombre: 'Fabián Garrido',
    apodo: 'Keo',
    especialidad: 'Barber',
    descripcion: 'Dedicación y pulcritud en cada detalle. Convierte cada visita en un momento para vos.',
    imagen: '/neobarberia_2026-01-28_09_23/barbers/576989ba-9099-4c0d-a430-69d314eedb44_jfph0o.webp',
    instagram: 'https://www.instagram.com/keo_barber.cl/',
    yearsExperience: 5,
    role: 'BARBER',
    interests: ['Acabados impecables', 'Cuidado personal', 'Confianza del cliente', 'Perfección en detalles'],
    signatureCuts: [
      { imagen: '/neobarberia_2026-01-28_09_23/barbers/576989ba-9099-4c0d-a430-69d314eedb44_jfph0o.webp', label: 'RAZOR_SHAVE' },
      { imagen: '/neobarberia_2026-01-28_09_23/gallery/WhatsApp_Image_2025-12-01_at_09.19.43_nqzjni.jpg?updatedAt=1769603095899', label: 'BEARD_SCULPT' },
    ],
    quote: 'LOS DETALLES HACEN LA DIFERENCIA.',
  },
  {
    id: 4,
    nombre: 'Patricio Beltrán',
    apodo: 'Pato',
    especialidad: 'Creative Barber',
    descripcion: 'Donde otros ven un corte, él ve una oportunidad de expresión. Cada cliente sale con algo único.',
    imagen: '/neobarberia_2026-01-28_09_23/barbers/aw-image-53_vgsjzj.webp',
    yearsExperience: 4,
    role: 'CREATIVE BARBER',
    interests: ['Expresión personal', 'Looks únicos', 'Visión artística', 'Identidad de estilo'],
    signatureCuts: [
      { imagen: '/neobarberia_2026-01-28_09_23/barbers/aw-image-53_vgsjzj.webp', label: 'HAIR_ART' },
    ],
    quote: 'CADA CORTE ES UNA DECLARACIÓN.',
  },
];
