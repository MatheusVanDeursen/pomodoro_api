const categoryDAO = require('../daos/CategoryDAO');
const AppError = require('../utils/AppError');

class CategoryService {
  async createCategory(name, userId) {
    return await categoryDAO.create(name, userId);
  }

  async getUserCategories(userId) {
    return await categoryDAO.findByUserId(userId);
  }

  async updateCategory(id, userId, name) {
    const wasUpdated = await categoryDAO.update(id, userId, name);
    if (!wasUpdated) throw new AppError('Categoria não encontrada ou não autorizada.', 404);
    return { message: 'Categoria atualizada com sucesso.' };
  }

  async deleteCategory(id, userId) {
    const wasDeleted = await categoryDAO.delete(id, userId);
    if (!wasDeleted) throw new AppError('Categoria não encontrada ou não autorizada.', 404);
    return { message: 'Categoria deletada com sucesso.' };
  }
}
module.exports = new CategoryService();