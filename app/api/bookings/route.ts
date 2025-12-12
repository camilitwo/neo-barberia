import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots, createBooking, generateBookingID } from '@/lib/bookings';
import type { BookingRequest } from '@/types/booking';

/**
 * GET /api/bookings
 * Get available time slots for a specific date and barber
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    const barberID = searchParams.get('barberID');
    
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
  try {
    const body: BookingRequest = await request.json();
    
    // Validate required fields
    const { barberID, date, timeSlot, customerName, customerEmail, customerPhone, service } = body;
    
    if (!barberID || !date || !timeSlot || !customerName || !customerEmail || !customerPhone || !service) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
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
