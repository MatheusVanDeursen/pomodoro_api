const taskDAO = require('../daos/TaskDAO');

class TaskService {
  async createTask(title, userId) {
    if (!title || title.trim() === '') {
      throw new Error('O título da tarefa não pode estar vazio.');
    }
    if (!userId) {
      throw new Error('ID do usuário é obrigatório para criar uma tarefa.');
    }

    return await taskDAO.create(title.trim(), userId);
  }

  async getUserTasks(userId) {
    if (!userId) {
      throw new Error('ID do usuário é obrigatório para buscar tarefas.');
    }
    return await taskDAO.findByUserId(userId);
  }

  async toggleTaskStatus(taskId, isDone) {
    if (!taskId) {
      throw new Error('O ID da tarefa é obrigatório para atualizar o status.');
    }
    
    // Poderíamos adicionar uma validação aqui para checar se a tarefa existe antes
    return await taskDAO.updateStatus(taskId, !!isDone);
  }
}

module.exports = new TaskService();