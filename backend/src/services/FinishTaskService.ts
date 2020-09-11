/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import { isUuid } from 'uuidv4';
import Task from '../models/Task';
import AppError from '../errors/AppError';

interface Request {
  taskID: string;
  finished_at: Date;
}

class FinishTask {
  public async execute({ taskID, finished_at }: Request): Promise<Task> {
    const taskRepository = getRepository(Task);

    if (!isUuid(taskID)) {
      throw new AppError({
        message: 'Task ID is invalid',
        statusCode: 400,
      });
    }

    const task = await taskRepository.findOne({
      where: {
        id: taskID,
      },
    });

    if (!task) {
      throw new AppError({
        message: 'Task not found',
        statusCode: 400,
      });
    }

    task.finished_at = finished_at;

    await taskRepository.save(task);

    return task;
  }
}

export default FinishTask;
