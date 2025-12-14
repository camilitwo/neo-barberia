# Neo Barbería API

Servicio backend en Node.js + Express que expone un API REST seguro para el flujo de agendamiento y catálogo de barberos/servicios.

## Arquitectura
- **Express + TypeScript** para controladores y routing.
- **Prisma + SQLite** para el modelo de datos relacional.
- **Zod** para validación de payloads.
- **Helmet, CORS, rate limiting y API key** para reforzar la seguridad entre frontend y backend.

## Modelos principales
- **Barber**: datos del barbero y sus servicios.
- **Service**: catálogo de servicios con duración y precio.
- **Booking**: reservas con cliente, barbero, servicio, horario, estado y notas.

## Endpoints
- `GET /api/health` — chequeo de estado.
- `GET /api/barbers` — lista barberos con servicios activos.
- `GET /api/services` — lista servicios activos.
- `GET /api/bookings/availability?date=YYYY-MM-DD&barberId=ID` — disponibilidad por fecha/barbero.
- `POST /api/bookings` — crea una reserva confirmada.

Todos los endpoints requieren el header `x-api-key` configurado en `API_KEY`.

## Seguridad
- **CORS restringido** a dominios definidos en `ALLOWED_ORIGINS`.
- **Helmet** para cabeceras seguras.
- **Rate limiting** 100 requests cada 15 minutos por IP.
- **Validación Zod** de cuerpo y query params.
- **API key** obligatoria en cada request.

## Configuración y uso
1. Copiar variables: `cp .env.example .env` y ajustar valores.
2. Instalar dependencias: `npm install`.
3. Generar cliente Prisma y base de datos: `npm run prisma:generate && npm run prisma:migrate -- --name init`.
4. Poblar datos: `npm run prisma:seed`.
5. Ejecutar en desarrollo: `npm run dev`.

El servidor escucha en el puerto definido en `PORT` (por defecto 4000).
