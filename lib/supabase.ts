export interface ReservationPayload {
  name: string;
  email: string;
  phone: string;
  barber: string;
  preferredDate: string;
  service?: string;
  message?: string;
  leadSource?: string;
}

interface SupabaseError extends Error {
  status?: number;
}

const getSupabaseConfig = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    const error: SupabaseError = new Error(
      'Supabase no está configurado. Agrega SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en las variables de entorno.'
    );
    error.status = 500;
    throw error;
  }

  return { supabaseUrl, supabaseServiceRoleKey };
};

export const saveReservation = async (payload: ReservationPayload) => {
  const { supabaseUrl, supabaseServiceRoleKey } = getSupabaseConfig();

  const response = await fetch(`${supabaseUrl}/rest/v1/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      Prefer: 'return=representation',
    },
    body: JSON.stringify([
      {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        barber: payload.barber,
        preferred_date: payload.preferredDate,
        service: payload.service ?? 'No especificado',
        message: payload.message ?? '',
        lead_source: payload.leadSource ?? 'website',
      },
    ]),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    const error: SupabaseError = new Error(
      errorDetails || 'No se pudo guardar la reserva en Supabase.'
    );
    error.status = response.status;
    throw error;
  }

  return response.json();
};
