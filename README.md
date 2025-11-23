# Neo Barbería

Sitio web oficial de Neo Barbería - La barbería que está revolucionando Quilicura.

## 🚀 Tecnologías

Este proyecto está construido con:

- **Next.js 14** - Framework de React para producción
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework de CSS utility-first
- **Framer Motion** - Librería de animaciones para React
- **Swiper** - Carrusel moderno y responsive
- **Font Awesome** - Iconos
- **react-day-picker** - Selector de fechas accesible y responsive
- **date-fns** - Librería moderna para manejo de fechas


## ✨ Características

- ✅ Diseño elegante y moderno
- ✅ Animaciones fluidas siguiendo los 12 principios de animación
- ✅ Hero section impactante
- ✅ Sección "Quiénes Somos" con información del negocio
- ✅ Carrusel de barberos con efecto 3D
- ✅ Formulario de contacto
- ✅ **Sistema de agendamiento completo con calendario interactivo**
- ✅ **API REST para gestión de reservas**
- ✅ **Modal multi-paso para reservas (barber → fecha → hora → detalles)**
- ✅ Botón flotante de agendamiento
- ✅ Totalmente responsive
- ✅ Optimización de imágenes con Next.js
- ✅ SEO optimizado
- ✅ Accesibilidad WCAG (contraste, focus states, navegación por teclado)


## 🏃 Desarrollo

Primero, instala las dependencias:

```bash
npm install
```

Luego, ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## 🏗️ Build

Para crear una versión de producción:

```bash
npm run build
```

Para ejecutar la versión de producción:

```bash
npm start
```

## 📝 Estructura del Proyecto

```
neo-barberia/
├── app/                    # App Router de Next.js
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página de inicio
├── components/            # Componentes React
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── WhoWeAre.tsx
│   ├── BarberCarousel.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── FloatingBookingButton.tsx
├── data/                  # Datos estáticos
│   └── barbers.ts         # Información de barberos
├── public/               # Archivos estáticos
└── package.json
```

## 🎨 Principios de Animación Aplicados

1. **Elasticidad** - Animaciones con spring physics
2. **Anticipación** - Movimientos previos a acciones principales
3. **Escena** - Focus en elementos importantes
4. **Acción** - Transiciones suaves frame a frame
5. **Continuidad** - Sin paradas bruscas
6. **Suavidad** - Easing functions naturales
7. **Arcos** - Movimientos curvos
8. **Contexto** - Detalles de apoyo
9. **Tiempo** - Duraciones apropiadas
10. **Exageración** - Énfasis en interacciones
11. **Volumen** - Profundidad y realismo
12. **Atractivo** - Personalidad memorable

## ♿ Accesibilidad y Responsive

Se han aplicado mejoras para asegurar legibilidad y usabilidad:

### Colores y Contraste
- Paleta basada en variables CSS: `--background`, `--surface`, `--foreground`, `--muted`, `--primary`, `--accent`.
- Contraste texto normal >= 4.5:1 (foreground sobre background/surface).
- Títulos grandes (>=24px) cumplen >= 3:1.
- Botones usan fondo sólido `bg-primary` con texto negro (#000) para ratio > 7:1.
- Gradientes tienen fallback `text-gradient-fallback`.
- Estados hover y focus mantienen contraste suficiente.

### Focus y Navegación por Teclado
- `:focus-visible` con anillo accesible (`ring-accent`).
- Todos los links y botones tienen indicadores de foco visibles.

### Responsividad
- Tipografías fluidas con escalado por breakpoints (`text-sm`→`text-lg`, etc.).
- Espaciados adaptados: secciones `py-16 sm:py-20 md:py-32`.
- Componentes clave probados en anchos: <640px, 768px, 1024px+.
- Carrusel Swiper con `breakpoints` para slides per view.

### Animaciones
- Respeto a `prefers-reduced-motion`: animaciones reducidas en ese modo.

### Checklist WCAG (Resumen)
| Elemento | Contraste | Estado |
|----------|-----------|--------|
| Texto principal | > 12:1 | ✅ |
| Texto secundario (muted) | ~4.9:1 sobre fondo oscuro | ✅ |
| Botón primario (dorado + texto negro) | > 7:1 | ✅ |
| Links hover (accent sobre fondo oscuro) | > 4.5:1 | ✅ |
| Gradiente con fallback | Sí | ✅ |
| Indicadores de foco | Visible (2px) | ✅ |

### Cómo Ajustar Paleta
Editar variables en `app/globals.css` y extender en `tailwind.config.ts`.

### Próximos Pasos Sugeridos
- Implementar tema claro completo.
- Añadir tests automáticos de contraste.
- Auditar tamaños táctiles (mínimo 44px) con herramientas.

## 📅 Sistema de Agendamiento

El sitio ahora incluye un sistema completo de reservas/agendamiento integrado:

### Características del Sistema de Reservas

- **Interfaz Multi-Paso**: Proceso guiado en 4 pasos para una experiencia de usuario intuitiva
  1. Selección de barbero
  2. Selección de fecha (calendario interactivo)
  3. Selección de horario (slots de 30 minutos)
  4. Detalles del cliente y confirmación

- **Calendario Interactivo**: Integración con `react-day-picker` para selección de fechas
  - Localizado en español
  - Deshabilita fechas pasadas
  - Rango de 60 días hacia adelante
  - Diseño responsive y accesible

- **Gestión de Disponibilidad**: 
  - Horario de negocio: 11:00 AM - 8:30 PM
  - Slots de 30 minutos
  - Verificación en tiempo real de disponibilidad
  - Prevención de reservas duplicadas

- **API REST**: Endpoints para gestión de reservas
  - `GET /api/bookings?date=YYYY-MM-DD&barberID=N` - Obtener slots disponibles
  - `POST /api/bookings` - Crear nueva reserva

- **Almacenamiento**: Sistema en memoria (Map) para MVP
  - Fácilmente reemplazable por base de datos (Prisma + PostgreSQL)
  - Estructura de datos lista para persistencia

- **Validaciones**:
  - Validación de email
  - Campos requeridos
  - Verificación de disponibilidad del slot
  - Mensajes de error claros

### Tecnologías Utilizadas

- **react-day-picker**: Calendario accesible y bien mantenido
- **date-fns**: Manejo eficiente de fechas con localización
- **Next.js API Routes**: Backend serverless integrado
- **TypeScript**: Tipado fuerte para modelos de datos

### Estructura de Archivos del Sistema de Reservas

```
neo-barberia/
├── app/api/bookings/
│   └── route.ts              # API endpoints para reservas
├── components/
│   ├── BookingModal.tsx      # Modal de agendamiento multi-paso
│   └── FloatingBookingButton.tsx  # Botón flotante actualizado
├── lib/
│   └── bookings.ts           # Lógica de negocio y utilidades
├── types/
│   └── booking.ts            # Interfaces TypeScript
└── app/globals.css           # Estilos del calendario
```

### Modelo de Datos

```typescript
interface Booking {
  id: string;              // ID único generado
  barberID: number;        // ID del barbero seleccionado
  date: string;            // Fecha en formato ISO (YYYY-MM-DD)
  timeSlot: string;        // Hora en formato HH:MM
  customerName: string;    // Nombre del cliente
  customerEmail: string;   // Email del cliente
  customerPhone: string;   // Teléfono del cliente
  service: string;         // Servicio solicitado
  createdAt: string;       // Timestamp de creación
}
```

### Personalización

Para modificar el horario de operación, editar en `/lib/bookings.ts`:

```typescript
const BUSINESS_START_HOUR = 11;    // Hora de apertura
const BUSINESS_END_HOUR = 20;      // Hora de cierre
const BUSINESS_END_MINUTE = 30;    // Minuto de cierre
const SLOT_DURATION = 30;          // Duración de cada slot en minutos
```

### Migración a Base de Datos

Para implementar persistencia con base de datos:

1. Instalar Prisma: `npm install @prisma/client`
2. Configurar esquema en `prisma/schema.prisma`
3. Reemplazar funciones en `/lib/bookings.ts` con queries de Prisma
4. Los endpoints API ya están preparados para trabajar con async/await

## 📧 Contacto

- **Email**: contacto@neobarberia.cl
- **Instagram**: [@neobarberia](https://instagram.com/neobarberia)
- **Ubicación**: Quilicura, Santiago, Chile

## 📄 Licencia

Copyright © 2024 Neo Barbería. Todos los derechos reservados.
