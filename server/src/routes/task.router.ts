import * as express from 'express';
import { httpGetAllTasks, httpGetTask, httpDeleteTask, httpAddTask, httpUpdateTask } from '../controllers/task.controller';
import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401); // No token provided
  }

  jwt.verify(token, 'testSecretKey', (err, user) => {
    if (err) {
      return res.sendStatus(403); // Invalid token
    }

    req.user = user;
    next();
  });
}

const tasksRouter = express.Router();

tasksRouter.get('/', authenticateToken, httpGetAllTasks);
tasksRouter.get('/:id', authenticateToken, httpGetTask);
tasksRouter.delete('/:id', authenticateToken, httpDeleteTask);
tasksRouter.post('/', authenticateToken, httpAddTask);
tasksRouter.post('/:id', authenticateToken, httpUpdateTask);

export default tasksRouter;