const AppError = require('../utils/AppError');
const { ZodError } = require('zod');

function errorHandler(err, req, res, next) {
  // 1. Erros de validação do Zod
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map(e => ({
      campo: e.path.join('.'),
      mensagem: e.message
    }));
    return res.status(400).json({
      status: 'error',
      message: 'Falha na validação dos dados',
      detalhes: formattedErrors
    });
  }

  // 2. Erros de Regra de Negócio
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  // 3. Erros do Prisma (Não encontrado)
  if (err.code === 'P2025') {
    return res.status(404).json({
      status: 'error',
      message: 'Registro não encontrado no banco de dados.'
    });
  }

  console.error('🔥 [Erro Interno Não Tratado]:', err);

  // 4. Erro Genérico 500
  return res.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor. Tente novamente mais tarde.'
  });
}

module.exports = errorHandler;