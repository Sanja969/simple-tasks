import * as express from 'express';
import { httpGetAllTasks } from '../controllers/task.controller';

const tasksRouter = express.Router();

tasksRouter.get('/', httpGetAllTasks);

export default tasksRouter;