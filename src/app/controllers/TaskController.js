import { uuid } from 'uuidv4';
import * as Yup from 'yup';
import { Op } from 'sequelize';
import {
  endOfDay,
  parseISO,
  startOfDay,
  differenceInMinutes,
  isValid,
} from 'date-fns';
import Task from '../models/Task';
import User from '../models/User';

class TaskController {
  async create(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      status: Yup.string().required(),
      responsible_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation Fails' });
    }

    const userExists = await User.findByPk(req.body.responsible_id);

    if (!userExists) {
      return res.status(400).json({ message: 'User not found' });
    }

    const taskExists = await Task.findOne({
      where: { description: req.body.description },
    });

    if (taskExists) {
      return res
        .status(400)
        .json({ message: 'Task Description already exists' });
    }

    const {
      id,
      description,
      date_begin,
      date_finish,
      responsible_id,
    } = await Task.create({
      id: uuid(),
      description: req.body.description,
      status: req.body.status,
      date_begin: req.body.status === 'doing' ? new Date() : null,
      date_finish: req.body.status === 'done' ? new Date() : null,
      responsible_id: req.body.responsible_id,
    });

    return res
      .status(200)
      .json({ id, description, date_begin, date_finish, responsible_id });
  }

  async updateStatus(req, res) {
    const schema = Yup.object().shape({
      task_id: Yup.string().required(),
      status: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation Fails' });
    }

    const taskExists = await Task.findByPk(req.body.task_id);

    if (!taskExists) {
      return res.status(400).json({ message: 'Task not exists' });
    }

    if (req.body.status === 'doing') {
      await taskExists.update({
        status: req.body.status,
        date_begin: new Date(),
        date_finish: null,
      });
    } else if (req.body.status === 'done') {
      if (!taskExists.date_begin) {
        return res.status(400).json({ message: 'The task has not started' });
      }
      await taskExists.update({
        status: req.body.status,
        date_finish: new Date(),
      });
    } else if (req.body.status === 'open') {
      await taskExists.update({
        status: req.body.status,
        date_begin: null,
        date_finish: null,
      });
    } else {
      return res.status(400).json({ message: 'Invalid status' });
    }

    return res.status(200).json(taskExists);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      task_id: Yup.string().required(),
      responsible_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation Fails' });
    }

    const taskExists = await Task.findByPk(req.body.task_id);

    if (!taskExists) {
      return res.status(400).json({ message: 'Task not exists' });
    }

    const userExists = await User.findByPk(req.body.responsible_id);

    if (!userExists) {
      return res.status(400).json({ message: 'User responsible not found' });
    }

    await taskExists.update({
      description: req.body.description
        ? req.body.description
        : taskExists.description,
      responsible_id: req.body.responsible_id
        ? req.body.responsible_id
        : taskExists.responsible_id,
    });

    return res.status(200).json(taskExists);
  }

  async findAll(req, res) {
    const responsibleFields = ['id', 'name', 'email', 'role'];
    const filters = [
      req.query.description
        ? {
            description: {
              [Op.iLike]: `%${req.query.description}%`,
            },
          }
        : {},
      req.query.status
        ? {
            status: {
              [Op.iLike]: `%${req.query.status}%`,
            },
          }
        : {},
    ];

    const orderOptions = req.query.order
      ? req.query.order.split(':')
      : ['description', 'asc'];

    if (orderOptions.length === 2) {
      if (orderOptions[1] !== 'asc' && orderOptions[1] !== 'desc') {
        return res.status(400).json({ message: 'Invalid order option' });
      }
    } else if (orderOptions.length > 2) {
      if (orderOptions[0] !== 'responsible') {
        return res.status(400).json({ message: 'Invalid order option' });
      }
      if (!responsibleFields.includes(orderOptions[1])) {
        return res.status(400).json({ message: 'Invalid order option' });
      }

      if (orderOptions[2] !== 'asc' && orderOptions[2] !== 'desc') {
        return res.status(400).json({ message: 'Invalid order option' });
      }
    }

    const tasks = await Task.findAll({
      attributes: ['id', 'description', 'status', 'date_begin', 'date_finish'],
      include: {
        association: 'responsible',
        attributes: responsibleFields,
      },
      where: filters,
      order: [orderOptions],
    });

    if (!tasks || tasks.length === 0) {
      return res.status(200).json({ message: 'No tasks found' });
    }

    return res.status(200).json(tasks);
  }

  async indicators(req, res) {
    if (
      !isValid(parseISO(req.query.from)) ||
      !isValid(parseISO(req.query.until))
    ) {
      return res.status(400).json({ message: 'Invalid Date' });
    }
    const dates = [
      req.query.from ? startOfDay(parseISO(req.query.from)) : new Date(),
      req.query.until ? endOfDay(parseISO(req.query.until)) : new Date(),
    ];

    const tasksCompleted = await Task.findAll({
      where: {
        created_at: {
          [Op.between]: dates,
        },
        status: {
          [Op.like]: 'done',
        },
      },
    });

    if (!tasksCompleted || tasksCompleted.length === 0) {
      return res.status(200).json({ message: 'No tasks found' });
    }

    let mediaHoursOpenBegin = 0;
    let mediaHoursBeginFinished = 0;

    tasksCompleted.forEach(task => {
      mediaHoursOpenBegin +=
        differenceInMinutes(task.date_begin, task.createdAt) /
        60 /
        tasksCompleted.length;

      mediaHoursBeginFinished +=
        differenceInMinutes(task.date_finish, task.date_begin) /
        60 /
        tasksCompleted.length;
    });

    const users = await User.findAll();

    return res.json({
      'total tasks completed': tasksCompleted.length,
      'media tasks/users': tasksCompleted.length / users.length,
      'media hours open/begin': Number(mediaHoursOpenBegin.toFixed(2)),
      'media hours begin/finish': Number(mediaHoursBeginFinished.toFixed(2)),
      tasks: tasksCompleted,
    });
  }
}

export default new TaskController();
