const { z } = require('zod');

// Schema para a criação (POST)
const createTaskSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'O título da tarefa é obrigatório.',
      invalid_type_error: 'O título deve ser um texto.',
    })
    .trim()
    .min(1, 'O título não pode estar vazio.')
    .max(100, 'O título não pode ter mais de 100 caracteres.'),
  }).strict() // Adicionado .strict() para bloquear chaves extras
});

// Schema para atualização (PUT)
const updateTaskSchema = z.object({
  params: z.object({
    id: z.string().uuid('O ID da tarefa enviado na URL é inválido.'),
  }),
  body: z.object({
    title: z.string().trim().min(1, 'O título não pode estar vazio.').max(100).optional(),
    isDone: z.boolean({
      invalid_type_error: 'O status deve ser um valor booleano (true/false).'
    }).optional(),
  }).strict() // Evita que o front-end envie campos extras que não pedimos
});

// Schema para listagem com paginação (GET)
const paginationSchema = z.object({
  query: z.object({
    // Usamos .catch() para que se o usuário enviar "?page=abc" ou undefined, 
    // ele caia silenciosamente para o valor padrão sem quebrar a requisição.
    page: z.coerce.number().int().positive('A página deve ser maior que zero.').catch(1),
    limit: z.coerce.number().int().positive().max(100, 'O limite máximo é 100 itens.').catch(20),
  }).optional().default({}) // Garante que req.query exista mesmo se vazio
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  paginationSchema
};