import { Router } from 'express';
import SessionController from '../app/controllers/SessionController';

const sessionRoutes = new Router();

sessionRoutes.post('/session', SessionController.store);

export default sessionRoutes;
