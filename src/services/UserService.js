const userDAO = require('../daos/UserDAO');

class UserService {
  /**
   * Garante a existência de um usuário fantasma.
   * Se não existir no banco, cria um novo usando o UUID fornecido.
   */
  async ensureGhostUserExists(uuid) {
    // Regra de negócio: Não podemos operar sem um UUID
    if (!uuid) {
      throw new Error('O UUID é obrigatório para autenticação fantasma.');
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