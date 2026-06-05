const express = require('express');
const router = express.Router();

const uuidCheck = require('../middlewares/uuidCheck');
const taskController = require('../controllers/TaskController');
const sessionController = require('../controllers/SessionController');

// Todas as rotas abaixo deste middleware exigirão o x-ghost-uuid
router.use(uuidCheck);

// Rotas de Tarefas
router.post('/tasks', taskController.create);
router.get('/tasks', taskController.list);

// Rotas de Pomodoro
router.post('/pomodoros', sessionController.register);
router.get('/pomodoros/today', sessionController.getToday);

module.exports = router;