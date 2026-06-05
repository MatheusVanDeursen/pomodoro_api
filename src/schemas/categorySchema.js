const { z } = require('zod');

const createCategorySchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'O nome da categoria é obrigatório.',
      invalid_type_error: 'O nome deve ser um texto.',
    }).trim().min(1, 'O nome não pode estar vazio.').max(50, 'O nome não pode ter mais de 50 caracteres.'),
  }).strict()
});

const updateCategorySchema = z.object({
  params: z.object({
    id: z.string().uuid('O ID da categoria enviado na URL é inválido.'),
  }),
  body: z.object({
    name: z.string().trim().min(1, 'O nome não pode estar vazio.').max(50).optional(),
  }).strict()
});

module.exports = { createCategorySchema, updateCategorySchema };