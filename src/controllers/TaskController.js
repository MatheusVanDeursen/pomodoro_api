const taskService = require('../services/TaskService');

class TaskController {
  async create(req, res) {
    const { title } = req.body;
    const userId = req.userId;

    const task = await taskService.createTask(title, userId);
    return res.status(201).json(task);
  }

  async list(req, res) {
    // Garantimos o cast para Number aqui. 
    // O Express mantém os atributos do req.query originalmente como strings.
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const result = await taskService.getUserTasks(req.userId, page, limit);
    return res.status(200).json(result);
  }

  async update(req, res) {
    const taskId = req.params.id;
    const userId = req.userId;
    const { title, isDone } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (isDone !== undefined) updateData.isDone = isDone;

    const result = await taskService.updateTask(taskId, userId, updateData);
    return res.status(200).json(result);
  }

  async delete(req, res) {
    const taskId = req.params.id;
    const userId = req.userId;

    const result = await taskService.deleteTask(taskId, userId);
    return res.status(200).json(result);
  }
}

module.exports = new TaskController();