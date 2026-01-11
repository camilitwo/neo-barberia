import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { TimeSlot, Booking, AvailabilitySlot } from '@/types/booking';

// Business hours: 11:00 AM - 8:30 PM
const BUSINESS_START_HOUR = 11;
const BUSINESS_END_HOUR = 20;
const BUSINESS_END_MINUTE = 30;
const SLOT_DURATION = 30; // minutes

// In-memory storage (replace with database in production)
const bookingsStore = new Map<string, Booking>();

/**
 * Generate all available time slots for a business day
 */
export function generateTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  
  for (let hour = BUSINESS_START_HOUR; hour <= BUSINESS_END_HOUR; hour++) {
    for (let minute = 0; minute < 60; minute += SLOT_DURATION) {
      // Stop at 8:30 PM
      if (hour === BUSINESS_END_HOUR && minute > BUSINESS_END_MINUTE) {
        break;
      }
      
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push({
        hour,
        minute,
        label: timeString,
        available: true,
      });
    }
  }
  
  return slots;
}

/**
 * Get bookings for a specific date and barber
 */
export function getBookingsForDate(date: string, barberID: number): Booking[] {
  const bookings: Booking[] = [];
  
  for (const booking of bookingsStore.values()) {
    if (booking.date === date && booking.barberID === barberID) {
      bookings.push(booking);
    }
  }
  
  return bookings;
}

/**
 * Check if a time slot is available
 */
export function isSlotAvailable(date: string, timeSlot: string, barberID: number): boolean {
  const key = `${date}-${timeSlot}-${barberID}`;
  
  for (const booking of bookingsStore.values()) {
    if (booking.date === date && booking.timeSlot === timeSlot && booking.barberID === barberID) {
      return false;
    }
  }
  
  return true;
}

/**
 * Get available time slots for a specific date and barber
 */
export function getAvailableSlots(date: string, barberID: number): TimeSlot[] {
  const allSlots = generateTimeSlots();
  
  return allSlots.map(slot => ({
    ...slot,
    available: isSlotAvailable(date, slot.label, barberID),
  }));
}

/**
 * Build an ISO-like start time string for a date and slot label.
 */
export function buildStartTime(date: string, timeSlot: string): string {
  return `${date}T${timeSlot}:00`;
}

/**
 * Parse a startTime string into date and slot label.
 */
export function parseStartTime(startTime: string): { date: string; timeSlot: string } | null {
  const [date, time] = startTime.split('T');
  if (!date || !time) {
    return null;
  }

  const timeSlot = time.slice(0, 5);
  if (!/^\d{2}:\d{2}$/.test(timeSlot)) {
    return null;
  }

  return { date, timeSlot };
}

/**
 * Get availability slots with start times and availability flags.
 */
export function getAvailabilitySlots(date: string, barberID: number): AvailabilitySlot[] {
  const allSlots = generateTimeSlots();

  return allSlots.map(slot => ({
    startTime: buildStartTime(date, slot.label),
    available: isSlotAvailable(date, slot.label, barberID),
  }));
}

/**
 * Create a new booking
 */
export function createBooking(booking: Booking): { success: boolean; message: string; booking?: Booking } {
  // Validate slot availability
  if (!isSlotAvailable(booking.date, booking.timeSlot, booking.barberID)) {
    return {
      success: false,
      message: 'Este horario ya no está disponible',
    };
  }
  
  // Store booking
  bookingsStore.set(booking.id, booking);
  
  return {
    success: true,
    message: 'Reserva creada exitosamente',
    booking,
  };
}

/**
 * Get all bookings (for admin purposes)
 */
export function getAllBookings(): Booking[] {
  return Array.from(bookingsStore.values());
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return format(date, "d 'de' MMMM, yyyy", { locale: es });
}

/**
 * Generate unique booking ID
 */
export function generateBookingID(): string {
  return `booking-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
