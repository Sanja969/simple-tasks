import * as express from 'express';
import { httpGetAllTasks, httpGetTask, httpDeleteTask, httpAddTask, httpUpdateTask } from '../controllers/task.controller';

const tasksRouter = express.Router();

tasksRouter.get('/', httpGetAllTasks);
tasksRouter.get('/:id', httpGetTask);
tasksRouter.delete('/:id', httpDeleteTask);
tasksRouter.post('/', httpAddTask);
tasksRouter.post('/:id', httpUpdateTask);

export default tasksRouter;