import { Router } from 'express';
import userRoutes from './user.routes';
import sessionRoutes from './session.routes';
import taskRoutes from './task.routes';

const routes = new Router();

routes.use([userRoutes, taskRoutes, sessionRoutes]);

export default routes;
