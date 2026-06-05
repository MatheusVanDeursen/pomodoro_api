const prisma = require('../config/prisma');

class SessionDAO {
  // Salva o ciclo finalizado (seja COMPLETED ou INTERRUPTED)
  async create(sessionData) {
    const { title, description, duration, status, userId, taskId, categoryId } = sessionData;
    
    return await prisma.pomodoroSession.create({
      data: {
        title,
        description,
        duration,
        status,
        userId,
        taskId,       // Opcional: vincula o foco a uma tarefa específica
        categoryId   // Opcional: vincula a uma categoria
      }
    });
  }

  // Busca o histórico de sessões de um usuário dentro de um intervalo de datas
  async findByUserIdAndDateRange(userId, startDate, endDate) {
    return await prisma.pomodoroSession.findMany({
      where: {
        userId,
        startTime: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        task: true // Já traz os dados da tarefa associada, se houver
      },
      orderBy: { startTime: 'desc' }
    });
  }

  async update(id, userId, updateData) {
    const result = await prisma.pomodoroSession.updateMany({
      where: { id, userId },
      data: updateData
    });
    return result.count > 0;
  }

  async delete(id, userId) {
    const result = await prisma.pomodoroSession.deleteMany({
      where: { id, userId }
    });
    return result.count > 0;
  }
}

module.exports = new SessionDAO();