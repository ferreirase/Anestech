import { Router } from 'express';
import UserController from '../app/controllers/UserController';
// import SessionController from '../app/controllers/SessionController';
import AuthMiddleware from '../app/middlewares/auth';

const userRoutes = new Router();

userRoutes.post('/users', AuthMiddleware, UserController.create);
userRoutes.get('/users', AuthMiddleware, UserController.findAll);
userRoutes.delete('/users/:id', AuthMiddleware, UserController.delete);
userRoutes.put('/users/:id', AuthMiddleware, UserController.update);

export default userRoutes;
