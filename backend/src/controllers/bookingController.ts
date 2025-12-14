import { Request, Response } from 'express';
import { z } from 'zod';
import { createBooking, getAvailability } from '../services/bookingService.js';

const availabilityQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  barberId: z.coerce.number().int().positive(),
});

const createBookingSchema = z.object({
  barberId: z.coerce.number().int().positive(),
  serviceId: z.coerce.number().int().positive(),
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(6),
  notes: z.string().optional(),
  startTime: z.string().datetime(),
});

export async function getAvailabilityController(req: Request, res: Response) {
  const { date, barberId } = availabilityQuerySchema.parse(req.query);
  const slots = await getAvailability({ date, barberId });
  res.json({ date, barberId, slots });
}

export async function createBookingController(req: Request, res: Response) {
  try {
    const payload = createBookingSchema.parse(req.body);
    const booking = await createBooking(payload);
    res.status(201).json({ booking });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Error al crear reserva' });
  }
}
