import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.js';

export const securityHeaders = helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
});

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin || env.allowedOrigins.includes(origin)) {
      callback(null, origin);
      return;
    }
    callback(new Error('Origin not allowed by CORS'));
  },
  credentials: true,
});

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

export function apiKeyGuard(req: Request, res: Response, next: NextFunction) {
  const apiKeyHeader = req.headers['x-api-key'];
  const apiKey = Array.isArray(apiKeyHeader) ? apiKeyHeader[0] : apiKeyHeader;
  if (apiKey !== env.apiKey) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
}
