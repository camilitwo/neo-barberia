import { Request, Response } from 'express';
import { prisma } from '../services/prisma.js';

export async function listBarbers(_req: Request, res: Response) {
  const barbers = await prisma.barber.findMany({
    where: { active: true },
    include: { services: true },
  });
  res.json(barbers);
}
