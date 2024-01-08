import * as express from 'express';
import userRouter from './userRouter';
import tasksRouter from './task.router';

const api = express.Router();

api.use('/tasks', tasksRouter);
api.use('/', userRouter);

export default api;