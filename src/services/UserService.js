const userDAO = require('../daos/UserDAO');
const AppError = require('../utils/AppError');

class UserService {
  /**
   * Garante a existência de um usuário fantasma.
   * Se não existir no banco, cria um novo usando o UUID fornecido.
   */
  async ensureGhostUserExists(uuid) {
    // Regra de negócio: Não podemos operar sem um UUID
    if (!uuid) {
      throw new AppError('O UUID é obrigatório para autenticação fantasma.', 401);
    }

    // Tenta encontrar o usuário
    let user = await userDAO.findById(uuid);

    // Se não encontrou, cria a Ghost Account silenciosamente
    if (!user) {
      user = await userDAO.createGhostUser(uuid);
    }

    return user;
  }
}

module.exports = new UserService();