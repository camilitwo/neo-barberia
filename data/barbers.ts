export interface Barber {
  id: number;
  nombre: string;
  apodo: string;
  especialidad: string;
  descripcion: string;
  imagen: string;
  instagram?: string;
  facebook?: string;
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
  },
  {
    id: 2,
    nombre: 'Vicente Bravo',
    apodo: 'Viishon',
    especialidad: 'Fades Modernos',
    descripcion: 'Especialista en fades y diseños modernos, combina técnica con creatividad.',
    imagen: '/neobarberia_2026-01-28_09_23/barbers/5c78573f-3fde-4257-944d-b68f113e4b40_ctyy8e.webp',
    instagram: 'https://www.instagram.com/viishon.barber/',
  },
  {
    id: 3,
    nombre: 'Fabián Garrido',
    apodo: 'Keo',
    especialidad: 'Afeitados Clásicos',
    descripcion: 'Maestro en afeitados tradicionales y experto en perfilados de precisión.',
    imagen: '/neobarberia_2026-01-28_09_23/barbers/576989ba-9099-4c0d-a430-69d314eedb44_jfph0o.webp',
    instagram: 'https://www.instagram.com/keo_barber.cl/',
  },
  {
    id: 4,
    nombre: 'Patricio Beltrán',
    apodo: 'Pato',
    especialidad: 'Diseños y Arte Capilar',
    descripcion: 'Creativo y detallista, transforma cada corte en una obra de arte.',
    imagen: '/neobarberia_2026-01-28_09_23/barbers/aw-image-53_vgsjzj.webp',
  },
];
