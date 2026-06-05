const { z } = require('zod');

const createSessionSchema = z.object({
  body: z.object({
    taskId: z.string().uuid('O ID da tarefa é inválido.').optional().nullable(),
    categoryId: z.string().uuid('O ID da categoria é inválido.').optional().nullable(),
    title: z.string().trim().max(100).optional(),
    description: z.string().trim().max(255).optional(),
    duration: z.number({ required_error: 'A duração é obrigatória.' }).int().nonnegative('A duração não pode ser negativa.'),
    status: z.enum(['COMPLETED', 'INTERRUPTED'], {
      required_error: 'O status da sessão é obrigatório.',
      invalid_type_error: 'O status deve ser COMPLETED ou INTERRUPTED.'
    }),
  }).strict()
});

const updateSessionSchema = z.object({
  params: z.object({
    id: z.string().uuid('O ID da sessão enviado na URL é inválido.'),
  }),
  body: z.object({
    taskId: z.string().uuid().optional().nullable(),
    categoryId: z.string().uuid().optional().nullable(),
    title: z.string().trim().max(100).optional(),
    description: z.string().trim().max(255).optional(),
    duration: z.number().int().nonnegative().optional(),
    status: z.enum(['COMPLETED', 'INTERRUPTED']).optional(),
  }).strict()
});

module.exports = { createSessionSchema, updateSessionSchema };