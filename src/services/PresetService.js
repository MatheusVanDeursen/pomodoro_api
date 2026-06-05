const presetDAO = require('../daos/PresetDAO');
const AppError = require('../utils/AppError');

class PresetService {
  async createPreset(data, userId) {
    const { name, focusTime, shortBreak, longBreak } = data;
    
    return await presetDAO.createCustom({
      name, focusTime, shortBreak, longBreak, userId, isGlobal: false
    });
  }

  async getPresets(userId) {
    return await presetDAO.findAvailableForUser(userId);
  }

  async updatePreset(id, userId, data) {
    const wasUpdated = await presetDAO.updateCustom(id, userId, data);
    if (!wasUpdated) throw new AppError('Preset não encontrado, não autorizado, ou é um modelo global.', 404);
    return { message: 'Preset atualizado com sucesso.' };
  }

  async deletePreset(id, userId) {
    const wasDeleted = await presetDAO.deleteCustom(id, userId);
    if (!wasDeleted) throw new AppError('Preset não encontrado, não autorizado, ou é um modelo global.', 404);
    return { message: 'Preset deletado com sucesso.' };
  }
}
module.exports = new PresetService();