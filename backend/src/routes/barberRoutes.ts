import { Router } from 'express';
import { listBarbers } from '../controllers/barberController.js';

export const barberRouter = Router();

barberRouter.get('/', listBarbers);
