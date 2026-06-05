const sessionDAO = require('../daos/SessionDAO');

class SessionService {
  async registerSession(sessionData) {
    const { userId, duration, status } = sessionData;

    // Validações básicas de consistência
    if (!userId) throw new Error('O ID do usuário é obrigatório.');
    if (duration === undefined || duration < 0) throw new Error('Duração inválida.');
    if (!['COMPLETED', 'INTERRUPTED'].includes(status)) {
      throw new Error('Status de sessão inválido.');
    }

    return await sessionDAO.create(sessionData);
  }

  /**
   * Retorna apenas as sessões realizadas no dia atual (fuso horário local/servidor)
   */
  async getTodayHistory(userId) {
    if (!userId) throw new Error('O ID do usuário é obrigatório.');

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    return await sessionDAO.findByUserIdAndDateRange(userId, startOfToday, endOfToday);
  }
}

module.exports = new SessionService();