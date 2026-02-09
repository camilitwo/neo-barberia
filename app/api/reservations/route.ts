import { NextResponse } from 'next/server';
import { saveReservation } from '@/lib/supabase';

const requiredFields = ['name', 'email', 'phone', 'barber', 'preferredDate'] as const;

type ReservationBody = {
  name?: string;
  email?: string;
  phone?: string;
  barber?: string;
  preferredDate?: string;
  service?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body: ReservationBody = await request.json();

    const missing = requiredFields.filter((field) => !body[field] || body[field]?.trim() === '');

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Faltan campos requeridos: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    await saveReservation({
      name: body.name!.trim(),
      email: body.email!.trim(),
      phone: body.phone!.trim(),
      barber: body.barber!.trim(),
      preferredDate: body.preferredDate!,
      service: body.service?.trim() || 'Corte/servicio a definir',
      message: body.message?.trim() || '',
      leadSource: 'website',
    });

    return NextResponse.json(
      { message: 'Reserva almacenada correctamente en Supabase.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al registrar reserva:', error);

    const status =
      typeof error === 'object' && error && 'status' in error && typeof error.status === 'number'
        ? error.status
        : 500;

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Ocurrió un error al procesar la reserva. Intenta nuevamente.',
      },
      { status }
    );
  }
}
