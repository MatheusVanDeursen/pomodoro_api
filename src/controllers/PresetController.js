const presetService = require('../services/PresetService');

class PresetController {
  async create(req, res) {
    const preset = await presetService.createPreset(req.body, req.userId);
    return res.status(201).json(preset);
  }

  async list(req, res) {
    const presets = await presetService.getPresets(req.userId);
    return res.status(200).json(presets);
  }

  async update(req, res) {
    const result = await presetService.updatePreset(req.params.id, req.userId, req.body);
    return res.status(200).json(result);
  }

  async delete(req, res) {
    const result = await presetService.deletePreset(req.params.id, req.userId);
    return res.status(200).json(result);
  }
}
module.exports = new PresetController();