const sessionService = require('../services/SessionService');

class SessionController {
  async register(req, res) {
    try {
      const { taskId, title, duration, status } = req.body;
      
      const session = await sessionService.registerSession({
        userId: req.userId,
        taskId,
        title,
        duration,
        status
      });
      
      return res.status(201).json(session);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getToday(req, res) {
    try {
      const history = await sessionService.getTodayHistory(req.userId);
      return res.status(200).json(history);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new SessionController();