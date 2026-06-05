const { z } = require('zod');

const createPresetSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'O nome do preset é obrigatório.' }).trim().min(1, 'O nome não pode estar vazio.').max(50),
    focusTime: z.number({ required_error: 'O tempo de foco é obrigatório.' }).int().positive('O tempo de foco deve ser maior que zero.'),
    shortBreak: z.number().int().nonnegative('O tempo de pausa curta não pode ser negativo.').default(5),
    longBreak: z.number().int().nonnegative('O tempo de pausa longa não pode ser negativo.').default(15),
  }).strict()
});

const updatePresetSchema = z.object({
  params: z.object({
    id: z.string().uuid('O ID do preset enviado na URL é inválido.'),
  }),
  body: z.object({
    name: z.string().trim().min(1).max(50).optional(),
    focusTime: z.number().int().positive().optional(),
    shortBreak: z.number().int().nonnegative().optional(),
    longBreak: z.number().int().nonnegative().optional(),
  }).strict()
});

module.exports = {
  createPresetSchema,
  updatePresetSchema
};