import { Request, Response } from 'express';
import { prisma } from '../services/prisma.js';

export async function listServices(_req: Request, res: Response) {
  const services = await prisma.service.findMany({ where: { active: true } });
  res.json(services);
}
