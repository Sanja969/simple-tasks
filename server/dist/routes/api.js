import * as express from 'express';
import userRouter from './userRouter.js';
import tasksRouter from './task.router.js';
const api = express.Router();
api.use('/tasks', tasksRouter);
api.use('/', userRouter);
export default api;
