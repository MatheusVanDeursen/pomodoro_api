const prisma = require('../config/prisma');

class PresetDAO {
  async createCustom(data) {
    return await prisma.timePreset.create({ data });
  }

  // Busca os templates globais do sistema + os customizados do usuário
  async findAvailableForUser(userId) {
    return await prisma.timePreset.findMany({
      where: {
        OR: [
          { isGlobal: true },
          { userId: userId }
        ]
      }
    });
  }

  async updateCustom(id, userId, data) {
    const result = await prisma.timePreset.updateMany({
      where: { id, userId, isGlobal: false }, // Protege os templates globais no banco
      data
    });
    return result.count > 0;
  }

  async deleteCustom(id, userId) {
    const result = await prisma.timePreset.deleteMany({
      where: { id, userId, isGlobal: false }
    });
    return result.count > 0;
  }
}
module.exports = new PresetDAO();