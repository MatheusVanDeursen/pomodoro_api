const express = require('express');
const router = express.Router();

const uuidCheck = require('../middlewares/uuidCheck');
const taskController = require('../controllers/TaskController');
const sessionController = require('../controllers/SessionController');
const categoryController = require('../controllers/CategoryController');
const presetController = require('../controllers/PresetController');

const validate = require('../middlewares/validate');
const { createTaskSchema, updateTaskSchema, paginationSchema } = require('../schemas/taskSchema');
const { createSessionSchema, updateSessionSchema } = require('../schemas/sessionSchema');
const { createCategorySchema, updateCategorySchema } = require('../schemas/categorySchema');
const { createPresetSchema, updatePresetSchema } = require('../schemas/presetSchema');

// Todas as rotas abaixo deste middleware exigirão o x-ghost-uuid
router.use(uuidCheck);

// Rotas de Tarefas
router.post('/tasks', validate(createTaskSchema), taskController.create);
router.get('/tasks', validate(paginationSchema), taskController.list);
router.put('/tasks/:id', validate(updateTaskSchema), taskController.update);
router.delete('/tasks/:id', taskController.delete);

// Rotas de Pomodoro
router.post('/pomodoros', validate(createSessionSchema), sessionController.register);
router.get('/pomodoros/today', sessionController.getToday);
router.put('/pomodoros/:id', validate(updateSessionSchema), sessionController.update);
router.delete('/pomodoros/:id', sessionController.delete);

// Rotas de Categorias
router.post('/categories', validate(createCategorySchema), categoryController.create);
router.get('/categories', categoryController.list);
router.put('/categories/:id', validate(updateCategorySchema), categoryController.update);
router.delete('/categories/:id', categoryController.delete);

// Rotas de Presets de Tempo
router.post('/presets', validate(createPresetSchema), presetController.create);
router.get('/presets', presetController.list);
router.put('/presets/:id', validate(updatePresetSchema), presetController.update);
router.delete('/presets/:id', presetController.delete);

module.exports = router;