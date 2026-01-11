import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from '@/lib/apiAuth';
import { fetchExternalAvailability } from '@/lib/groomingPlatformClient';

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
    const barberIdParam = searchParams.get('barberId') ?? searchParams.get('barberID');

    if (!date || !barberIdParam) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos: date y barberId' },
        { status: 400 }
      );
    }

    const barberId = parseInt(barberIdParam, 10);

    const externalAvailability = await fetchExternalAvailability(barberId, date);

    return NextResponse.json(externalAvailability);
  } catch (error) {
    console.error('Error fetching availability from external API:', error);
    return NextResponse.json(
      { error: 'Error al obtener disponibilidad' },
      { status: 500 }
    );
  }
}
