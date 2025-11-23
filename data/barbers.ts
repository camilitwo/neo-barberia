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
    nombre: 'Christofer Beltran',
    apodo: 'Stofer',
    especialidad: 'Corte Clásico',
    descripcion: 'Con más de 10 años de experiencia, domina el estilo clásico con precisión y profesionalismo.',
    imagen: 'https://avatar.anywhere.app/files/img/fwX5JH1Nz5M9/profilepic.png',
    instagram: 'https://www.instagram.com/stofer_.barber/',
  },
  {
    id: 2,
    nombre: 'Vicente Bravo',
    apodo: 'Viishon',
    especialidad: 'Fades Modernos',
    descripcion: 'Especialista en fades y diseños modernos, combina técnica con creatividad.',
    imagen: 'https://avatar.anywhere.app/files/img/fSJlNA2u1AsE/profilepic.png',
    instagram: 'https://www.instagram.com/viishon.barber/',
  },
  {
    id: 3,
    nombre: 'Fabián Garrido',
    apodo: 'Keo',
    especialidad: 'Afeitados Clásicos',
    descripcion: 'Maestro en afeitados tradicionales y experto en perfilados de precisión.',
    imagen: 'https://avatar.anywhere.app/files/img/fkneURSA3h6p/profilepic.png',
    instagram: 'https://www.instagram.com/keo_barber.cl/',
  },
  {
    id: 4,
    nombre: 'Julio Cesar',
    apodo: 'Juliocersabarber',
    especialidad: 'Diseños y Arte Capilar',
    descripcion: 'Creativo y detallista, transforma cada corte en una obra de arte.',
    imagen: 'https://avatar.anywhere.app/files/img/fLLJb3F5TdW0/1726283971723.png',
  },
];
