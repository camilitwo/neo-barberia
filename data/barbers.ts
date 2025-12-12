export interface Barber {
  id: number;
  nombre: string;
  apodo: string;
  slug: string;
  especialidad: string;
  descripcion: string;
  bio: string;
  especialidades: string[];
  imagen: string;
  galeria: { url: string; alt: string }[];
  servicios: {
    nombre: string;
    descripcion: string;
    precio?: string;
  }[];
  disponibilidad: {
    dia: string;
    horario: string;
    nota?: string;
  }[];
  instagram?: string;
  facebook?: string;
}

export const barbersData: Barber[] = [
  {
    id: 1,
    nombre: 'Christofer Beltrán',
    apodo: 'Stofer',
    slug: 'christofer-beltran-stofer',
    especialidad: 'Corte Clásico',
    descripcion: 'Con más de 10 años de experiencia, domina el estilo clásico con precisión y profesionalismo.',
    bio: 'Con trayectoria en barberías premium, Christofer mezcla técnica clásica con tendencias modernas para lograr acabados impecables y asesorías honestas.',
    especialidades: ['Cortes clásicos', 'Barbas pulidas', 'Perfilado con navaja'],
    imagen: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1764511152/400f4454-f75c-46c9-bd5c-c6e5a8661ea2_owfqid.webp',
    galeria: [
      { url: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1764511152/400f4454-f75c-46c9-bd5c-c6e5a8661ea2_owfqid.webp', alt: 'Corte clásico definido' },
      { url: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1764511152/stofer-work-1_tm4smp.webp', alt: 'Cliente con estilo ejecutivo' },
      { url: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1764511152/stofer-work-2_bfgs4k.webp', alt: 'Detalle de perfilado con navaja' },
    ],
    servicios: [
      {
        nombre: 'Corte clásico + styling',
        descripcion: 'Asesoría personalizada, corte a tijera y peinado terminado con productos premium.',
        precio: '$9.000',
      },
      {
        nombre: 'Barba premium',
        descripcion: 'Perfilado con toalla caliente, aceites nutritivos y terminación con navaja.',
        precio: '$7.000',
      },
      {
        nombre: 'Paquete ejecutivo',
        descripcion: 'Corte clásico + barba con ritual completo y recomendaciones de cuidado en casa.',
        precio: '$14.000',
      },
    ],
    disponibilidad: [
      { dia: 'Lunes a Miércoles', horario: '10:00 - 18:00' },
      { dia: 'Jueves a Sábado', horario: '11:00 - 20:00', nota: 'Horarios peak, reserva con anticipación' },
    ],
    instagram: 'https://www.instagram.com/stofer_.barber/',
  },
  {
    id: 2,
    nombre: 'Vicente Bravo',
    apodo: 'Viishon',
    slug: 'vicente-bravo-viishon',
    especialidad: 'Fades Modernos',
    descripcion: 'Especialista en fades y diseños modernos, combina técnica con creatividad.',
    bio: 'Vicente vive los fades como un arte. Cada transición está pensada para destacar tus facciones y acompañarla de diseños únicos.',
    especialidades: ['Fades altos y medios', 'Diseños urbanos', 'Cejas y perfilados'],
    imagen: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1764511152/5c78573f-3fde-4257-944d-b68f113e4b40_ctyy8e.webp',
    galeria: [
      { url: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1764511152/5c78573f-3fde-4257-944d-b68f113e4b40_ctyy8e.webp', alt: 'Fade moderno por Viishon' },
      { url: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1764511152/viishon-work-1_ilz5xz.webp', alt: 'Diseño urbano en costado' },
      { url: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1764511152/viishon-work-2_iz3muo.webp', alt: 'Detalle de transición perfecta' },
    ],
    servicios: [
      {
        nombre: 'Fade moderno',
        descripcion: 'Degradado milimétrico con transición limpia y terminaciones pulidas.',
        precio: '$10.000',
      },
      {
        nombre: 'Fade + cejas',
        descripcion: 'Incluye diseño de cejas y perfilado para complementar el look.',
        precio: '$12.000',
      },
      {
        nombre: 'Diseño capilar artístico',
        descripcion: 'Líneas y figuras personalizadas con sombras y contrastes.',
        precio: '$15.000',
      },
    ],
    disponibilidad: [
      { dia: 'Martes a Viernes', horario: '12:00 - 21:00' },
      { dia: 'Sábado', horario: '10:00 - 17:00', nota: 'Espacios limitados para diseños' },
    ],
    instagram: 'https://www.instagram.com/viishon.barber/',
  },
  {
    id: 3,
    nombre: 'Fabián Garrido',
    apodo: 'Keo',
    slug: 'fabian-garrido-keo',
    especialidad: 'Afeitados Clásicos',
    descripcion: 'Maestro en afeitados tradicionales y experto en perfilados de precisión.',
    bio: 'Apasionado por la barbería tradicional, Keo cuida cada detalle del ritual del afeitado para ofrecer una experiencia relajante.',
    especialidades: ['Afeitado tradicional', 'Corte clásico', 'Perfilados de precisión'],
    imagen: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1764511151/576989ba-9099-4c0d-a430-69d314eedb44_jfph0o.webp',
    galeria: [
      { url: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1764511151/576989ba-9099-4c0d-a430-69d314eedb44_jfph0o.webp', alt: 'Ritual de afeitado clásico' },
      { url: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1764511151/keo-work-1_thpf3k.webp', alt: 'Perfilado de barba con navaja' },
      { url: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1764511151/keo-work-2_gc3iz5.webp', alt: 'Corte clásico estilizado' },
    ],
    servicios: [
      {
        nombre: 'Afeitado clásico completo',
        descripcion: 'Toalla caliente, espuma caliente y terminación calmante.',
        precio: '$9.000',
      },
      {
        nombre: 'Corte clásico + barba',
        descripcion: 'Servicio integral para mantener un estilo pulcro y elegante.',
        precio: '$14.000',
      },
      {
        nombre: 'Perfilado premium',
        descripcion: 'Corrección de líneas y definición con navaja para eventos.',
        precio: '$8.000',
      },
    ],
    disponibilidad: [
      { dia: 'Lunes a Viernes', horario: '11:00 - 19:00' },
      { dia: 'Sábado', horario: '10:00 - 15:00', nota: 'Afeitados tradicionales con reserva' },
    ],
    instagram: 'https://www.instagram.com/keo_barber.cl/',
  },
  {
    id: 4,
    nombre: 'Patricio Beltrán',
    apodo: 'Pato',
    slug: 'patricio-beltran-pato',
    especialidad: 'Diseños y Arte Capilar',
    descripcion: 'Creativo y detallista, transforma cada corte en una obra de arte.',
    bio: 'Patricio es el creativo del equipo. Sus diseños combinan precisión técnica y composición artística para que cada cliente luzca único.',
    especialidades: ['Arte capilar', 'Fades con diseño', 'Color y sombras'],
    imagen: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1764511151/aw-image-53_vgsjzj.webp',
    galeria: [
      { url: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1764511151/aw-image-53_vgsjzj.webp', alt: 'Diseño creativo en lateral' },
      { url: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1764511151/pato-work-1_vmyu4m.webp', alt: 'Fade con líneas artísticas' },
      { url: 'https://res.cloudinary.com/dddfx1xwt/image/upload/v1764511151/pato-work-2_gv1k4q.webp', alt: 'Aplicación de sombras y contrastes' },
    ],
    servicios: [
      {
        nombre: 'Arte capilar completo',
        descripcion: 'Diseño personalizado con fades y texturas según tu idea.',
        precio: '$15.000',
      },
      {
        nombre: 'Fade con diseño',
        descripcion: 'Degradado con figuras limpias y detalles pulidos.',
        precio: '$12.000',
      },
      {
        nombre: 'Color + diseño',
        descripcion: 'Aplicación de color para resaltar sombras y líneas.',
        precio: '$18.000',
      },
    ],
    disponibilidad: [
      { dia: 'Miércoles a Viernes', horario: '12:00 - 21:00' },
      { dia: 'Sábado', horario: '10:00 - 18:00', nota: 'Cupos limitados para diseños especiales' },
    ],
  },
];
