const prisma = require('../config/prisma');

class TaskDAO {
  // Cria uma nova tarefa vinculada a um usuário
  async create(title, userId) {
    return await prisma.task.create({
      data: {
        title,
        userId
      }
    });
  }

  // Lista todas as tarefas de um usuário específico ordenadas por data de criação
  async findByUserId(userId) {
    return await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Atualiza o status (concluída/pendente) de uma tarefa
  async updateStatus(id, isDone) {
    return await prisma.task.update({
      where: { id },
      data: { isDone }
    });
  }

  // Busca uma tarefa por ID (útil para validações de segurança posteriores)
  async findById(id) {
    return await prisma.task.findUnique({
      where: { id }
    });
  }
}

module.exports = new TaskDAO();