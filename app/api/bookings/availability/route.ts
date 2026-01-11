import { NextRequest, NextResponse } from 'next/server';
import { getAvailabilitySlots } from '@/lib/bookings';
import { validateApiKey } from '@/lib/apiAuth';

/**
 * GET /api/bookings/availability
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
    const barberId = searchParams.get('barberId') ?? searchParams.get('barberID');

    if (!date || !barberId) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos: date y barberId' },
        { status: 400 }
      );
    }

    const slots = getAvailabilitySlots(date, parseInt(barberId, 10));

    return NextResponse.json({
      date,
      barberId: parseInt(barberId, 10),
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
