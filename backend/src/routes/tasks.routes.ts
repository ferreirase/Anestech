/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import * as yup from 'yup';
import { getRepository } from 'typeorm';
import { isUuid } from 'uuidv4';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import AppError from '../errors/AppError';
import CreateTaskService from '../services/CreateTaskService';
import FinishTaskService from '../services/FinishTaskService';
import Task from '../models/Task';

const tasksRoutes = Router();

// rota de criação de nova tarefa
tasksRoutes.post('/', ensureAuthenticated, async (request, response) => {
  const createTaskService = new CreateTaskService();

  const taskSchema = yup.object().shape({
    description: yup.string().required('Description is required'),
    responsible: yup.string().required('Responsible is required'),
  });

  if (!(await taskSchema.isValid(request.body))) {
    throw new AppError({
      message: 'Incomplete information',
      statusCode: 400,
    });
  }

  const newTask = await createTaskService.execute({
    description: request.body.description,
    responsible: request.body.responsible,
    finished_at: request.body.finished_at ? request.body.finished_at : null,
  });

  return response.json(newTask);
});

tasksRoutes.patch('/', ensureAuthenticated, async (request, response) => {
  const finishTaskService = new FinishTaskService();
  const taskRepository = getRepository(Task);

  const taskSchema = yup.object().shape({
    taskID: yup.string().required('Task ID is required'),
  });

  if (!(await taskSchema.isValid(request.body))) {
    throw new AppError({
      message: 'Incomplete information',
      statusCode: 400,
    });
  }

  if (!isUuid(request.body.taskID)) {
    throw new AppError({
      message: 'Task ID is invalid',
      statusCode: 400,
    });
  }

  const taskExists = await taskRepository.findOne({
    where: {
      id: request.body.taskID,
    },
  });

  if (!taskExists) {
    throw new AppError({
      message: 'Task not found',
      statusCode: 400,
    });
  }

  const taskFinished = await finishTaskService.execute({
    taskID: taskExists.id,
    finished_at: new Date(),
  });

  return response.status(200).json(taskFinished);
});

tasksRoutes.get('/', ensureAuthenticated, async (_request, response) => {
  const taskRepository = getRepository(Task);
  const tasks = await taskRepository.find({});

  return response.status(200).json(tasks);
});

export default tasksRoutes;
