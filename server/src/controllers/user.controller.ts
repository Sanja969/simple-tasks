import users from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export function httpGetUser(req, res) {
  const userReq = req.body;

  if (!userReq.name) {
    return res.status(400).json({
        error: 'Missing required user name'
    });
  }

  if (!userReq.password) {
    return res.status(400).json({
        error: 'Missing required user password'
    });
  }

  const foundedUser = users.find(user => user.name === userReq.name && user.password === userReq.password);
  if (!foundedUser) {
      return res.status(404).json({ message: `User not found` });
  }
  const token = jwt.sign({ id: foundedUser.id, name: foundedUser.name }, 'testSecretKey', { expiresIn: '1h' });

  return res.status(200).json({user: foundedUser.name, token});
}

export function httpCreateUser(req, res) {
  const user = req.body;

  if (!user.name) {
      return res.status(400).json({
          error: 'Missing required user name'
      });
  }

  if (!user.password) {
    return res.status(400).json({
        error: 'Missing required user password'
    });
  }

  user.id = users.length + 1;
  users.push(user);

  const token = jwt.sign({ id: user.id, name: user.name }, 'yourSecretKey', { expiresIn: '1h' });

  return res.status(200).json({user: user.name, token});
}


