export interface TimeSlot {
  hour: number;
  minute: number;
  label: string;
  available: boolean;
}

export interface Booking {
  id: string;
  barberID: number;
  date: string; // ISO date string
  timeSlot: string; // "HH:MM" format
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service?: string;
  serviceId?: number;
  createdAt: string;
}

export interface BookingRequest {
  barberID: number;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service: string;
}

export interface AvailabilitySlot {
  startTime: string;
  available: boolean;
}

export interface AvailabilityResponse {
  date: string;
  barberId: number;
  slots: AvailabilitySlot[];
}

export interface CreateBookingInput {
  barberId: number;
  serviceId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string | null;
  startTime: string;
}
