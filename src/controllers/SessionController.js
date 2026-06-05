const sessionService = require('../services/SessionService');

class SessionController {
  async register(req, res) {
    const { taskId, title, duration, status } = req.body;
    
    const session = await sessionService.registerSession({
      userId: req.userId,
      taskId,
      title,
      duration,
      status
    });
    
    return res.status(201).json(session);
  }

  async getToday(req, res) {
    const history = await sessionService.getTodayHistory(req.userId);
    return res.status(200).json(history);
  }

  async update(req, res) {
    const result = await sessionService.updateSession(req.params.id, req.userId, req.body);
    return res.status(200).json(result);
  }

  async delete(req, res) {
    const result = await sessionService.deleteSession(req.params.id, req.userId);
    return res.status(200).json(result);
  }
}

module.exports = new SessionController();