import type { CreateBookingInput } from '@/types/booking';

// Según el OpenAPI, AvailabilityResponse.slots es string[] (date-time)
export interface ExternalAvailabilityResponse {
  date: string; // YYYY-MM-DD
  barberId: number;
  slots: string[]; // ISO date-time strings
}

export interface ExternalCreateBookingResponse {
  booking: {
    id: string;
    startTime: string;
    endTime: string;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    notes?: string | null;
    barberId: number;
    serviceId: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ExternalService {
  id: number;
  name: string;
  description: string | null;
  duration: number;
  price: number;
  isPremium: boolean;
  active: boolean;
  barberId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ExternalPackService {
  id: number;
  packId: number;
  serviceId: number;
  quantity: number | null;
  service: ExternalService;
}

export interface ExternalBarberBase {
  id: number;
  name: string;
  email?: string | null;
  phone?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  tiktok?: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExternalPack {
  id: number;
  name: string;
  description: string | null;
  price: number;
  active: boolean;
  barberId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExternalPackWithRelations extends ExternalPack {
  barber: ExternalBarberBase;
  services: ExternalPackService[];
}

export interface ExternalBarberWithRelations extends ExternalBarberBase {
  services: ExternalService[];
  packs: ExternalPackWithRelations[];
}

const BASE_URL = process.env.GROOMING_PLATFORM_BASE_URL || 'https://grooming-platform-production.up.railway.app';
const API_KEY = process.env.GROOMING_PLATFORM_API_KEY;

if (!API_KEY) {
  console.warn('[groomingPlatformClient] GROOMING_PLATFORM_API_KEY no está definido en el entorno.');
}

async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${path}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(init.headers || {}),
    'x-api-key': API_KEY || 'change-me',
  };

  const response = await fetch(url, {
    ...init,
    headers,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`API request failed: ${response.status} ${response.statusText} - ${text}`);
  }

  return (await response.json()) as T;
}

export async function fetchExternalAvailability(
  barberId: number,
  date: string
): Promise<ExternalAvailabilityResponse> {
  return apiRequest<ExternalAvailabilityResponse>(
    `/api/bookings/availability?barberId=${barberId}&date=${encodeURIComponent(date)}`
  );
}

export async function createExternalBooking(
  input: CreateBookingInput
): Promise<ExternalCreateBookingResponse> {
  return apiRequest<ExternalCreateBookingResponse>(
    '/api/bookings',
    {
      method: 'POST',
      body: JSON.stringify(input),
    }
  );
}

export async function fetchExternalBarbers(): Promise<ExternalBarberWithRelations[]> {
  return apiRequest<ExternalBarberWithRelations[]>('/api/barbers');
}

export async function fetchExternalServices(barberId?: number): Promise<ExternalService[]> {
  const query = barberId ? `?barberId=${barberId}` : '';
  return apiRequest<ExternalService[]>(`/api/services${query}`);
}

export async function fetchExternalPacks(barberId?: number): Promise<ExternalPackWithRelations[]> {
  const query = barberId ? `?barberId=${barberId}` : '';
  return apiRequest<ExternalPackWithRelations[]>(`/api/packs${query}`);
}
