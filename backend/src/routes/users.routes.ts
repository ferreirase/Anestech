/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';
import User from '../models/User';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

// rota de criação de novo usuário
usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();
  const newUser = await createUser.execute({ name, email, password });

  delete newUser.password;

  return response.status(201).json(newUser);
});

usersRouter.get('/', ensureAuthenticated, async (_, response) => {
  const usersRepository = getRepository(User);

  const users = await usersRepository.find();

  if (!users || users.length === 0) {
    return response.status(200).json({ message: 'No registered users' });
  }

  // retirando a informação de password de cada usuário
  users.forEach(user => {
    // eslint-disable-next-line no-param-reassign
    delete user.password;
  });

  return response.status(200).json(users);
});

export default usersRouter;
