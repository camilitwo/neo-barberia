export interface BlogPost {
  id: number;
  titulo: string;
  descripcion: string;
  contenido: string;
  imagen: string;
  categoria: string;
  fecha: string;
  autor: string;
  tiempoLectura: string;
}

export const blogPostsData: BlogPost[] = [
  {
    id: 1,
    titulo: '5 Consejos para Mantener tu Corte Fresco por Más Tiempo',
    descripcion: 'Aprende los secretos profesionales para que tu corte se vea impecable entre visitas.',
    contenido: 'Mantener tu corte fresco no tiene por qué ser complicado. Lava tu cabello con productos de calidad cada 2-3 días, usa acondicionador solo en las puntas, y seca con toalla suavemente. Aplica productos de styling cuando el cabello esté húmedo y evita tocarlo constantemente durante el día.',
    imagen: '/blog/corte-fresco.jpg',
    categoria: 'Cuidado',
    fecha: '2024-01-15',
    autor: 'Stofer',
    tiempoLectura: '3 min'
  },
  {
    id: 2,
    titulo: 'Tendencias de Cortes Masculinos 2024',
    descripcion: 'Descubre los estilos que están marcando la diferencia este año.',
    contenido: 'Los fades siguen dominando, pero con variaciones más creativas. El mullet moderno está en auge, los cortes texturizados ganan terreno, y los diseños personalizados son cada vez más populares. La clave está en adaptar la tendencia a tu tipo de rostro y estilo personal.',
    imagen: '/blog/tendencias-2024.jpg',
    categoria: 'Tendencias',
    fecha: '2024-01-10',
    autor: 'Viishon',
    tiempoLectura: '5 min'
  },
  {
    id: 3,
    titulo: 'El Arte del Afeitado Clásico: Guía Completa',
    descripcion: 'Todo lo que necesitas saber sobre el afeitado tradicional con navaja.',
    contenido: 'El afeitado clásico es más que una técnica, es un ritual. Prepara la piel con vapor caliente, usa una brocha de calidad para aplicar crema de afeitar, y realiza pasadas suaves en dirección del crecimiento del vello. Finaliza con agua fría y un bálsamo aftershave nutritivo.',
    imagen: '/blog/afeitado-clasico.jpg',
    categoria: 'Técnicas',
    fecha: '2024-01-05',
    autor: 'Keo',
    tiempoLectura: '6 min'
  },
  {
    id: 4,
    titulo: 'Productos Esenciales para el Cabello Masculino',
    descripcion: 'Los imprescindibles que todo hombre debe tener en su arsenal de grooming.',
    contenido: 'Invierte en un buen shampoo sin sulfatos, un acondicionador hidratante, una pomada o cera de fijación media para styling diario, y un aceite capilar para nutrir. No olvides un peine de dientes anchos y un cepillo de calidad. La calidad supera a la cantidad.',
    imagen: '/blog/productos-esenciales.jpg',
    categoria: 'Productos',
    fecha: '2023-12-28',
    autor: 'Juliocersabarber',
    tiempoLectura: '4 min'
  },
  {
    id: 5,
    titulo: 'Cómo Elegir el Corte Perfecto para tu Tipo de Rostro',
    descripcion: 'Guía definitiva para encontrar el estilo que mejor te favorece.',
    contenido: 'Rostro ovalado: casi cualquier estilo funciona. Rostro cuadrado: suaviza ángulos con volumen en la parte superior. Rostro redondo: crea altura con fades laterales. Rostro alargado: equilibra con volumen en los costados. La clave es trabajar con tu estructura facial, no contra ella.',
    imagen: '/blog/tipo-rostro.jpg',
    categoria: 'Guías',
    fecha: '2023-12-20',
    autor: 'Stofer',
    tiempoLectura: '5 min'
  },
  {
    id: 6,
    titulo: 'La Importancia del Cuidado de la Barba',
    descripcion: 'Mantén tu barba saludable, suave y con estilo profesional.',
    contenido: 'Una barba bien cuidada requiere rutina: lava con shampoo para barba 2-3 veces por semana, aplica aceite de barba diariamente para hidratar, peina con cepillo de cerdas naturales, y recorta regularmente para mantener la forma. La paciencia es clave en el crecimiento.',
    imagen: '/blog/cuidado-barba.jpg',
    categoria: 'Cuidado',
    fecha: '2023-12-15',
    autor: 'Keo',
    tiempoLectura: '4 min'
  }
];
