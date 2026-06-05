const taskService = require('../services/TaskService');

class TaskController {
  async create(req, res) {
    try {
      const { title } = req.body;
      const userId = req.userId; // Veio do middleware

      const task = await taskService.createTask(title, userId);
      return res.status(201).json(task);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async list(req, res) {
    try {
      const tasks = await taskService.getUserTasks(req.userId);
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new TaskController();