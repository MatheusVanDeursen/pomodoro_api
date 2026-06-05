const sessionDAO = require('../daos/SessionDAO');
const AppError = require('../utils/AppError');

class SessionService {
  async registerSession(sessionData) {
    const { userId } = sessionData;

    if (!userId) throw new AppError('O ID do usuário é obrigatório.', 401);

    return await sessionDAO.create(sessionData);
  }

  /**
   * Retorna apenas as sessões realizadas no dia atual (fuso horário local/servidor)
   */
  async getTodayHistory(userId) {
    if (!userId) throw new AppError('O ID do usuário é obrigatório.', 401);

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    return await sessionDAO.findByUserIdAndDateRange(userId, startOfToday, endOfToday);
  }

  async updateSession(id, userId, updateData) {
    const wasUpdated = await sessionDAO.update(id, userId, updateData);
    if (!wasUpdated) throw new AppError('Sessão não encontrada ou não autorizada.', 404);
    return { message: 'Sessão atualizada com sucesso.' };
  }

  async deleteSession(id, userId) {
    const wasDeleted = await sessionDAO.delete(id, userId);
    if (!wasDeleted) throw new AppError('Sessão não encontrada ou não autorizada.', 404);
    return { message: 'Sessão deletada com sucesso.' };
  }
}

module.exports = new SessionService();