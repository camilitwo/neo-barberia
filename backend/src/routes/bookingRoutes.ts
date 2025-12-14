import { Router } from 'express';
import { createBookingController, getAvailabilityController } from '../controllers/bookingController.js';

export const bookingRouter = Router();

bookingRouter.get('/availability', getAvailabilityController);
bookingRouter.post('/', createBookingController);
