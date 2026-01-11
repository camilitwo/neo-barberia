import type { AvailabilityResponse, AvailabilitySlot, CreateBookingInput } from '@/types/booking';

export interface RequestDescriptor<TBody = undefined> {
  method: 'GET' | 'POST';
  url: string;
  headers: Record<string, string>;
  body?: TBody;
}

export interface BookingFlowInput {
  baseUrl: string;
  apiKey: string;
  date: string;
  barberId: number;
  timePreference?: string;
  serviceId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string | null;
}

export interface BookingFlowResult {
  availabilityRequest: RequestDescriptor;
  selectedSlot?: AvailabilitySlot;
  createBookingRequest?: RequestDescriptor<CreateBookingInput>;
  alternatives?: AvailabilitySlot[];
}

function normalizeAvailabilitySlots(slots: AvailabilityResponse['slots']): AvailabilitySlot[] {
  return slots.map(slot =>
    typeof slot === 'string'
      ? { startTime: slot, available: true }
      : slot
  );
}

function selectPreferredSlot(
  slots: AvailabilitySlot[],
  timePreference?: string
): AvailabilitySlot | undefined {
  if (!slots.length) {
    return undefined;
  }

  if (timePreference) {
    const preferredSlot = slots.find(slot => slot.startTime === timePreference);
    if (preferredSlot) {
      return preferredSlot;
    }
  }

  return slots[0];
}

export async function createBookingFromAvailability(
  input: BookingFlowInput
): Promise<BookingFlowResult> {
  const availabilityUrl = new URL('/api/bookings/availability', input.baseUrl);
  availabilityUrl.searchParams.set('date', input.date);
  availabilityUrl.searchParams.set('barberId', String(input.barberId));

  const availabilityRequest: RequestDescriptor = {
    method: 'GET',
    url: availabilityUrl.toString(),
    headers: {
      'x-api-key': input.apiKey,
    },
  };

  const availabilityResponse = await fetch(availabilityUrl.toString(), {
    headers: availabilityRequest.headers,
  });

  if (!availabilityResponse.ok) {
    throw new Error('Availability request failed');
  }

  const availabilityData = (await availabilityResponse.json()) as AvailabilityResponse;
  const normalizedSlots = normalizeAvailabilitySlots(availabilityData.slots ?? []);
  const availableSlots = normalizedSlots.filter(slot => slot.available);
  const selectedSlot = selectPreferredSlot(availableSlots, input.timePreference);

  if (!selectedSlot) {
    return {
      availabilityRequest,
      alternatives: normalizedSlots,
    };
  }

  const createBookingBody: CreateBookingInput = {
    barberId: input.barberId,
    serviceId: input.serviceId,
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    customerPhone: input.customerPhone,
    startTime: selectedSlot.startTime,
    ...(input.notes !== undefined ? { notes: input.notes } : {}),
  };

  const createBookingRequest: RequestDescriptor<CreateBookingInput> = {
    method: 'POST',
    url: new URL('/api/bookings', input.baseUrl).toString(),
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': input.apiKey,
    },
    body: createBookingBody,
  };

  const createBookingResponse = await fetch(createBookingRequest.url, {
    method: createBookingRequest.method,
    headers: createBookingRequest.headers,
    body: JSON.stringify(createBookingBody),
  });

  if (!createBookingResponse.ok) {
    throw new Error('Create booking request failed');
  }

  return {
    availabilityRequest,
    selectedSlot,
    createBookingRequest,
  };
}
