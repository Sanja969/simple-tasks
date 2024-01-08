import tasks from '../models/task.model';

export function httpGetAllTasks(req, res) {
  return res.status(200).json(tasks);
}
