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
  async findByUserId(userId, skip, take) {
    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take
      }),
      prisma.task.count({ where: { userId } })
    ]);
    return { tasks, total };
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

  // Atualiza título ou status de uma tarefa específica do usuário
  async update(id, userId, updateData) {
    // Usamos updateMany porque o Prisma não permite filtrar por dois campos 
    // não-únicos no 'update' padrão, a menos que tenhamos uma chave composta.
    // updateMany resolve isso perfeitamente garantindo o ID e o UserID.
    const result = await prisma.task.updateMany({
      where: { 
        id: id,
        userId: userId 
      },
      data: updateData
    });
    
    return result.count > 0; // Retorna true se algo foi atualizado
  }

  // Deleta uma tarefa específica do usuário
  async delete(id, userId) {
    const result = await prisma.task.deleteMany({
      where: { 
        id: id,
        userId: userId 
      }
    });

    return result.count > 0; // Retorna true se foi deletado
  }
}

module.exports = new TaskDAO();