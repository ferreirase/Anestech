/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import CreateSessionService from '../services/CreateSessionService';

const sessionsRoutes = Router();

// rota de criação de novo agendamento
sessionsRoutes.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createSessionService = new CreateSessionService();

  const { user, token } = await createSessionService.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRoutes;
