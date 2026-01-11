import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots, createBooking, generateBookingID, parseStartTime } from '@/lib/bookings';
import { validateApiKey } from '@/lib/apiAuth';
import type { BookingRequest, CreateBookingInput } from '@/types/booking';

/**
 * GET /api/bookings
 * Get available time slots for a specific date and barber
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
    
    const slots = getAvailableSlots(date, parseInt(barberID, 10));
    
    return NextResponse.json({
      date,
      barberID: parseInt(barberID, 10),
      slots,
    });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Error al obtener disponibilidad' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/bookings
 * Create a new booking
 */
export async function POST(request: NextRequest) {
  const apiKeyError = validateApiKey(request);
  if (apiKeyError) {
    return apiKeyError;
  }

  try {
    const body = (await request.json()) as BookingRequest | CreateBookingInput;
    const isCreateBookingInput = 'startTime' in body;

    let barberID: number;
    let date: string;
    let timeSlot: string;
    let customerName: string;
    let customerEmail: string;
    let customerPhone: string;
    let service: string | undefined;
    let serviceId: number | undefined;

    if (isCreateBookingInput) {
      const createInput = body as CreateBookingInput;
      const parsedStartTime = parseStartTime(createInput.startTime);

      if (!createInput.barberId || !createInput.serviceId || !createInput.customerName || !createInput.customerEmail || !createInput.customerPhone || !createInput.startTime) {
        return NextResponse.json(
          { error: 'Todos los campos son requeridos' },
          { status: 400 }
        );
      }

      if (!parsedStartTime) {
        return NextResponse.json(
          { error: 'startTime inválido' },
          { status: 400 }
        );
      }

      barberID = createInput.barberId;
      date = parsedStartTime.date;
      timeSlot = parsedStartTime.timeSlot;
      customerName = createInput.customerName;
      customerEmail = createInput.customerEmail;
      customerPhone = createInput.customerPhone;
      serviceId = createInput.serviceId;
    } else {
      const legacyInput = body as BookingRequest;
      const { barberID: legacyBarberID, date: legacyDate, timeSlot: legacyTimeSlot, customerName: legacyName, customerEmail: legacyEmail, customerPhone: legacyPhone, service: legacyService } = legacyInput;

      if (!legacyBarberID || !legacyDate || !legacyTimeSlot || !legacyName || !legacyEmail || !legacyPhone || !legacyService) {
        return NextResponse.json(
          { error: 'Todos los campos son requeridos' },
          { status: 400 }
        );
      }

      barberID = legacyBarberID;
      date = legacyDate;
      timeSlot = legacyTimeSlot;
      customerName = legacyName;
      customerEmail = legacyEmail;
      customerPhone = legacyPhone;
      service = legacyService;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }
    
    // Create booking
    const booking = {
      id: generateBookingID(),
      barberID,
      date,
      timeSlot,
      customerName,
      customerEmail,
      customerPhone,
      service,
      serviceId,
      createdAt: new Date().toISOString(),
    };
    
    const result = createBooking(booking);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { 
        success: true,
        message: result.message,
        booking: result.booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Error al crear la reserva' },
      { status: 500 }
    );
  }
}
