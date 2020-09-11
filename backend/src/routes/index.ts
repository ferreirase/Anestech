import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRoutes from './sessions.routes';
import tasksRoutes from './tasks.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRoutes);
routes.use('/tasks', tasksRoutes);

export default routes;
