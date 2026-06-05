const prisma = require('../config/prisma');

class UserDAO {
  // Busca um usuário pelo UUID
  async findById(id) {
    return await prisma.user.findUnique({
      where: { id }
    });
  }

  // Cria um novo usuário (recebe o UUID gerado pelo Vue.js)
  async createGhostUser(id) {
    return await prisma.user.create({
      data: { id }
    });
  }
}

module.exports = new UserDAO();