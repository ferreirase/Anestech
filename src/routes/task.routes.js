import { Router } from 'express';
import TaskController from '../app/controllers/TaskController';
import AuthMiddleware from '../app/middlewares/auth';

const taskRoutes = new Router();

taskRoutes.get('/tasks', AuthMiddleware, TaskController.findAll);
taskRoutes.post('/tasks', AuthMiddleware, TaskController.create);
taskRoutes.patch('/tasks', AuthMiddleware, TaskController.updateStatus);
taskRoutes.put('/tasks', AuthMiddleware, TaskController.update);
taskRoutes.get('/tasks/indicators', AuthMiddleware, TaskController.indicators);

export default taskRoutes;
