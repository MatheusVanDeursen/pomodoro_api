const prisma = require('../config/prisma');

class CategoryDAO {
  async create(name, userId) {
    return await prisma.category.create({ data: { name, userId } });
  }

  async findByUserId(userId) {
    return await prisma.category.findMany({ where: { userId } });
  }

  async update(id, userId, name) {
    const result = await prisma.category.updateMany({
      where: { id, userId },
      data: { name }
    });
    return result.count > 0;
  }

  async delete(id, userId) {
    const result = await prisma.category.deleteMany({
      where: { id, userId }
    });
    return result.count > 0;
  }
}
module.exports = new CategoryDAO();