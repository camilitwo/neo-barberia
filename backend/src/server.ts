import express from 'express';
import { env } from './config/env.js';
import { securityHeaders, corsMiddleware, limiter, apiKeyGuard } from './middleware/security.js';
import { barberRouter } from './routes/barberRoutes.js';
import { serviceRouter } from './routes/serviceRoutes.js';
import { bookingRouter } from './routes/bookingRoutes.js';
import { prisma } from './services/prisma.js';

const app = express();

app.use(securityHeaders);
app.use(corsMiddleware);
app.use(express.json());
app.use(limiter);
app.use(apiKeyGuard);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/barbers', barberRouter);
app.use('/api/services', serviceRouter);
app.use('/api/bookings', bookingRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Unexpected server error' });
});

async function start() {
  try {
    await prisma.$connect();
    app.listen(env.port, () => {
      console.log(`API listening on port ${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

start();
