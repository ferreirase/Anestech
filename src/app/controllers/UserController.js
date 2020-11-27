import { uuid } from 'uuidv4';
import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async create(req, res) {
    if (req.user_role !== 'admin') {
      return res
        .status(401)
        .json({ message: 'Unauthorized: Only Administrators!' });
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
      role: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation Fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const { id, name, email, role } = await User.create({
      id: uuid(),
      ...req.body,
    });

    return res.status(200).json({ id, name, email, role });
  }

  async update(req, res) {
    if (req.user_role !== 'admin') {
      return res
        .status(401)
        .json({ message: 'Unauthorized: Only Administrators!' });
    }

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      old_password: Yup.string().min(6),
      password: Yup.string().when('old_password', (old_password, field) =>
        old_password ? field.required() : field
      ),
      confirm_password: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
      role: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation fails' });
    }

    const { old_password } = req.body;
    const user = await User.findByPk(req.params.id);

    if (req.body.email && req.body.email !== user.email) {
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists) {
        return res
          .status(400)
          .json({ message: 'This email was already registered' });
      }
    }

    if (!(await user.checkPassword(old_password))) {
      return res.status(401).json({ message: 'Old password does not match' });
    }

    const { id, name, email, role } = await user.update(req.body);

    return res.json({ id, name, email, role });
  }

  async delete(req, res) {
    if (req.user_role !== 'admin') {
      return res
        .status(401)
        .json({ message: 'Unauthorized: Only Administrators!' });
    }

    const { id } = req.params;
    const user = await User.findByPk(req.params.id);

    await User.destroy({ where: { id } });

    if (!user) {
      return res.status(400).json({ message: 'User does not exists.' });
    }

    return res.status(200).json(user);
  }

  async findAll(req, res) {
    if (req.user_role !== 'admin') {
      return res
        .status(401)
        .json({ message: 'Unauthorized: Only Administrators!' });
    }

    const user = await User.findAll({
      attributes: ['id', 'name', 'email', 'role'],
      order: [['name', 'asc']],
      include: { association: 'tasks' },
    });

    return res.json(user);
  }
}

export default new UserController();
