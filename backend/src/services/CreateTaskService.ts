/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
// import { isUuid } from 'uuidv4';
import Task from '../models/Task';
// import User from '../models/User';
// import AppError from '../errors/AppError';

interface Request {
  description: string;
  finished_at: Date;
  responsible: string;
}

class CreateTaskService {
  public async execute({
    description,
    finished_at,
    responsible,
  }: Request): Promise<Task> {
    const taskRepository = getRepository(Task);

    const newTask = taskRepository.create({
      description,
      responsible,
      finished_at: finished_at || null,
    });

    await taskRepository.save(newTask);

    return newTask;
  }
}

export default CreateTaskService;
