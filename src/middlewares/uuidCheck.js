const userService = require('../services/UserService');

async function uuidCheck(req, res, next) {
  // Vamos convencionar que o Vue enviará o UUID neste header customizado
  const uuid = req.headers['x-ghost-uuid'];

  if (!uuid) {
    return res.status(401).json({ error: 'Acesso negado. UUID não fornecido no cabeçalho.' });
  }

  try {
    // Garante que o usuário existe no banco (cria se for a primeira vez)
    const user = await userService.ensureGhostUserExists(uuid);
    
    // Injeta o ID do usuário na requisição para que os Controllers possam usá-lo
    req.userId = user.id;
    next(); // Passa a bola para o Controller
  } catch (error) {
    console.error('Erro no middleware de UUID:', error);
    return res.status(500).json({ error: 'Erro interno de autenticação.' });
  }
}

module.exports = uuidCheck;