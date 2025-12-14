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
  service: string;
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

export interface AvailabilityResponse {
  date: string;
  slots: TimeSlot[];
}
