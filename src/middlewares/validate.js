// Este middleware recebe um schema do Zod e valida a requisição contra ele
const validate = (schema) => (req, res, next) => {
  // safeParse não joga exceções. Ele retorna sucesso ou erro de forma estruturada.
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!result.success) {
    // Formata os erros do Zod para um JSON limpo e legível para o Front-end
    const formattedErrors = result.error.issues.map((err) => ({
      campo: (err.path && err.path.length > 0) ? err.path[err.path.length - 1] : 'desconhecido',
      mensagem: err.message
    }));

    return res.status(400).json({
      erro: 'Falha na validação dos dados',
      detalhes: formattedErrors
    });
  }

  // Atualiza apenas as chaves que foram validadas e retornadas pelo schema
  if (result.data.body !== undefined) req.body = result.data.body;
  if (result.data.query !== undefined) req.query = result.data.query;
  if (result.data.params !== undefined) req.params = result.data.params;

  next(); // Se passar, segue para o Controller
};

module.exports = validate;