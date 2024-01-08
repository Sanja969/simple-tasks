import tasks from '../models/task.model.js';
function filterTasks(tasks, res, id) {
    res.status(200).json(tasks.filter(task => task.userId === id));
}
export function httpGetAllTasks(req, res) {
    const user = req.user;
    return filterTasks(tasks, res, user.id);
    ;
}
export function httpGetTask(req, res) {
    const { id } = req.params;
    const task = tasks.find(task => task.id === Number(id));
    if (!task) {
        return res.status(404).json({ message: `Task with id = ${id} not found` });
    }
    return res.status(200).json(task);
}
export function httpAddTask(req, res) {
    const task = req.body;
    const user = req.user;
    if (!task.title) {
        return res.status(400).json({
            error: 'Missing required task title'
        });
    }
    if (!task.completed) {
        task.completed = false;
    }
    task.id = tasks.length + 1;
    task.userId = user.id;
    tasks.push(task);
    return filterTasks(tasks, res, user.id);
}
export function httpDeleteTask(req, res) {
    const user = req.user;
    const { id } = req.params;
    const taskIndex = tasks.findIndex(task => task.id === Number(id));
    if (taskIndex === -1) {
        return res.status(404).json({ message: `Task with id = ${id} not found` });
    }
    tasks.splice(taskIndex, 1);
    return filterTasks(tasks, res, user.id);
}
export function httpUpdateTask(req, res) {
    const user = req.user;
    const { id } = req.params;
    const updatedProperties = req.body;
    const taskIndex = tasks.findIndex(task => task.id === Number(id));
    if (taskIndex === -1) {
        return res.status(404).json({ message: `Task with id = ${id} not found` });
    }
    tasks[taskIndex] = Object.assign(Object.assign({}, tasks[taskIndex]), updatedProperties);
    return filterTasks(tasks, res, user.id);
}
