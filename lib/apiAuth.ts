import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function validateApiKey(request: NextRequest): NextResponse | null {
  const expectedKey = process.env.API_KEY;

  if (!expectedKey) {
    return null;
  }

  const providedKey = request.headers.get('x-api-key');
  if (providedKey !== expectedKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return null;
}
