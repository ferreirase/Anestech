import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
import User from '../models/User';

export default async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  try {
    const [, token] = bearerToken.split(' ');

    const decodedToken = await promisify(jwt.verify)(token, authConfig.secret);

    const { id } = decodedToken;
    const userExists = await User.findByPk(id);

    req.user_id = id;

    if (userExists) {
      req.user_role = userExists.role;
    }

    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid Token' });
  }
};
