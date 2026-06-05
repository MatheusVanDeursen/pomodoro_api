const taskDAO = require('../daos/TaskDAO');
const AppError = require('../utils/AppError');

class TaskService {
  async createTask(title, userId) {
    return await taskDAO.create(title, userId);
  }

  async getUserTasks(userId, page, limit) {
    const skip = (page - 1) * limit;
    
    const { tasks, total } = await taskDAO.findByUserId(userId, skip, limit);
    const totalPages = Math.ceil(total / limit);

    return {
      data: tasks,
      meta: {
        total,
        page,
        limit,
        totalPages
      }
    };
  }

  async updateTask(taskId, userId, updateData) {
    const wasUpdated = await taskDAO.update(taskId, userId, updateData);
    
    if (!wasUpdated) {
      throw new AppError('Tarefa não encontrada ou não pertence a este usuário.', 404);
    }

    return { message: 'Tarefa atualizada com sucesso.' };
  }

  async deleteTask(taskId, userId) {
    const wasDeleted = await taskDAO.delete(taskId, userId);
    
    if (!wasDeleted) {
      throw new AppError('Tarefa não encontrada ou não pertence a este usuário.', 404);
    }

    return { message: 'Tarefa deletada com sucesso.' };
  }
}

module.exports = new TaskService();