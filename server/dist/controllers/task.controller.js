import tasks from '../models/task.model.js';
export function httpGetAllTasks(req, res) {
    return res.status(200).json(tasks);
}
