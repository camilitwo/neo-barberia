import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from '@/lib/apiAuth';
import type { BookingRequest, CreateBookingInput } from '@/types/booking';
import { buildStartTime, parseStartTime } from '@/lib/bookings';
import {
  createExternalBooking,
  fetchExternalAvailability,
  fetchExternalServices,
  type ExternalAvailabilityResponse,
} from '@/lib/groomingPlatformClient';

/**
 * GET /api/bookings
 * Get available time slots for a specific date and barber (proxy a grooming-platform)
 */
export async function GET(request: NextRequest) {
  const apiKeyError = validateApiKey(request);
  if (apiKeyError) {
    return apiKeyError;
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    const barberID = searchParams.get('barberID') ?? searchParams.get('barberId');

    if (!date || !barberID) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos: date y barberID' },
        { status: 400 }
      );
    }

    const barberIdNumber = parseInt(barberID, 10);

    const externalAvailability: ExternalAvailabilityResponse = await fetchExternalAvailability(barberIdNumber, date);

    // Adaptamos string[] de slots de la API externa a AvailabilityResponse local-
    // Para mantenerlo simple, devolvemos tal cual el objeto externo.
    return NextResponse.json(externalAvailability);
  } catch (error) {
    console.error('Error fetching availability (proxy):', error);
    return NextResponse.json(
      { error: 'Error al obtener disponibilidad' },
      { status: 500 }
    );
  }
}

async function mapLegacyBookingToCreateInput(
  legacy: BookingRequest,
): Promise<CreateBookingInput | NextResponse> {
  const {
    barberID,
    date,
    timeSlot,
    customerName,
    customerEmail,
    customerPhone,
    service,
  } = legacy;

  if (
    !barberID ||
    !date ||
    !timeSlot ||
    !customerName ||
    !customerEmail ||
    !customerPhone ||
    !service
  ) {
    return NextResponse.json(
      { error: 'Todos los campos son requeridos' },
      { status: 400 },
    );
  }

  try {
    // Obtenemos servicios asociados al barbero desde grooming-platform
    const services = await fetchExternalServices(barberID);

    // Normalizamos para hacer match aunque cambien acentos/mayúsculas/espacios
    const normalized = (value: string) =>
      value
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .replace(/\s+/g, ' ')
        .trim();

    const targetName = normalized(service);

    const matchedService = services.find(
      (s) => normalized(s.name) === targetName,
    );

    if (!matchedService) {
      return NextResponse.json(
        {
          error: `No se encontró un servicio con nombre "${service}" para el barbero ${barberID}. Revisa el catálogo en grooming-platform.`,
        },
        { status: 400 },
      );
    }

    // Si el frontend envía un timeSlot como date-time ISO, lo usamos directo;
    // si no, construimos un date-time desde date + HH:MM
    const startTime = timeSlot.includes('T')
      ? timeSlot
      : buildStartTime(date, timeSlot);

    const createInput: CreateBookingInput = {
      barberId: barberID,
      serviceId: matchedService.id,
      customerName,
      customerEmail,
      customerPhone,
      startTime,
    };

    return createInput;
  } catch (error) {
    console.error('Error resolviendo serviceId desde servicios externos:', error);
    return NextResponse.json(
      {
        error:
          'No se pudieron obtener los servicios desde el sistema de reservas',
      },
      { status: 500 },
    );
  }
}

/**
 * POST /api/bookings
 * Crea una nueva reserva en grooming-platform.
 * Acepta tanto el payload legacy (BookingRequest) como el nuevo (CreateBookingInput).
 */
export async function POST(request: NextRequest) {
  const apiKeyError = validateApiKey(request);
  if (apiKeyError) {
    return apiKeyError;
  }

  try {
    const body = (await request.json()) as BookingRequest | CreateBookingInput;
    const isCreateBookingInput = 'startTime' in body;

    let createInput: CreateBookingInput | NextResponse;

    if (isCreateBookingInput) {
      const typed = body as CreateBookingInput;

      if (
        !typed.barberId ||
        !typed.serviceId ||
        !typed.customerName ||
        !typed.customerEmail ||
        !typed.customerPhone ||
        !typed.startTime
      ) {
        return NextResponse.json(
          { error: 'Todos los campos son requeridos' },
          { status: 400 },
        );
      }

      if (!parseStartTime(typed.startTime)) {
        return NextResponse.json(
          { error: 'startTime inválido' },
          { status: 400 },
        );
      }

      createInput = typed;
    } else {
      // Frontend actual: payload legacy con barberID + date + timeSlot + service (nombre)
      createInput = await mapLegacyBookingToCreateInput(body as BookingRequest);
    }

    if (createInput instanceof NextResponse) {
      return createInput;
    }

    // Validamos email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(createInput.customerEmail)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 },
      );
    }

    const externalResponse = await createExternalBooking(createInput);

    return NextResponse.json(
      {
        success: true,
        message: 'Reserva creada exitosamente',
        booking: externalResponse.booking,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating booking (proxy):', error);
    return NextResponse.json(
      { error: 'Error al crear la reserva' },
      { status: 500 },
    );
  }
}
