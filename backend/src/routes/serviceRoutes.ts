import { Router } from 'express';
import { listServices } from '../controllers/serviceController.js';

export const serviceRouter = Router();

serviceRouter.get('/', listServices);
