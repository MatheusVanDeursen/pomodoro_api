const categoryService = require('../services/CategoryService');

class CategoryController {
  async create(req, res) {
    const category = await categoryService.createCategory(req.body.name, req.userId);
    return res.status(201).json(category);
  }

  async list(req, res) {
    const categories = await categoryService.getUserCategories(req.userId);
    return res.status(200).json(categories);
  }

  async update(req, res) {
    const result = await categoryService.updateCategory(req.params.id, req.userId, req.body.name);
    return res.status(200).json(result);
  }

  async delete(req, res) {
    const result = await categoryService.deleteCategory(req.params.id, req.userId);
    return res.status(200).json(result);
  }
}
module.exports = new CategoryController();