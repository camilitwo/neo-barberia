import { addMinutes, set } from 'date-fns';
import { BookingStatus } from '@prisma/client';
import { prisma } from './prisma.js';

const BUSINESS_START_HOUR = 11;
const BUSINESS_END_HOUR = 20;
const BUSINESS_END_MINUTE = 30;
const SLOT_DURATION = 30;

export type AvailabilityInput = {
  date: string; // YYYY-MM-DD
  barberId: number;
};

export function generateTimeSlots(date: Date) {
  const slots: { startTime: Date; endTime: Date }[] = [];
  for (let hour = BUSINESS_START_HOUR; hour <= BUSINESS_END_HOUR; hour++) {
    for (let minute = 0; minute < 60; minute += SLOT_DURATION) {
      if (hour === BUSINESS_END_HOUR && minute > BUSINESS_END_MINUTE) {
        break;
      }
      const startTime = set(date, { hours: hour, minutes: minute, seconds: 0, milliseconds: 0 });
      const endTime = addMinutes(startTime, SLOT_DURATION);
      slots.push({ startTime, endTime });
    }
  }
  return slots;
}

export async function getAvailability({ date, barberId }: AvailabilityInput) {
  const targetDate = new Date(date);
  const slots = generateTimeSlots(targetDate);

  const bookings = await prisma.booking.findMany({
    where: {
      barberId,
      startTime: {
        gte: set(targetDate, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }),
        lt: set(targetDate, { hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }),
      },
      status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
    },
  });

  return slots.map(slot => {
    const occupied = bookings.some(booking => booking.startTime.getTime() === slot.startTime.getTime());
    const upcoming = slot.startTime.getTime() >= Date.now();
    return {
      label: slot.startTime.toISOString(),
      startTime: slot.startTime,
      endTime: slot.endTime,
      available: !occupied && upcoming,
    };
  });
}

export type CreateBookingInput = {
  barberId: number;
  serviceId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  startTime: string;
};

export async function createBooking(input: CreateBookingInput) {
  const requestedStart = new Date(input.startTime);
  const availabilityDate = requestedStart.toISOString().slice(0, 10);
  const availability = await getAvailability({ date: availabilityDate, barberId: input.barberId });
  const slotAvailable = availability.some(slot => slot.startTime.getTime() === requestedStart.getTime() && slot.available);

  if (!slotAvailable) {
    throw new Error('El horario solicitado no está disponible');
  }

  const service = await prisma.service.findUnique({ where: { id: input.serviceId } });
  if (!service) {
    throw new Error('Servicio no encontrado');
  }

  const endTime = addMinutes(requestedStart, service.duration);

  return prisma.booking.create({
    data: {
      barberId: input.barberId,
      serviceId: input.serviceId,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone,
      notes: input.notes,
      startTime: requestedStart,
      endTime,
      status: BookingStatus.CONFIRMED,
    },
    include: {
      barber: true,
      service: true,
    },
  });
}
