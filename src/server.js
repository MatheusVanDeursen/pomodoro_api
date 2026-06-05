const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler'); // Corrigido caminho relativo

const app = express();

// Middlewares globais
app.use(cors()); // Permite requisições do Vue.js
app.use(express.json()); // Permite que o Express entenda JSON no body

// Registra as rotas
app.use('/api', routes);

// O middleware de erro deve ser registrado APÓS as rotas
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`Testando: Faça um GET em http://localhost:${PORT}/api/pomodoros/today com o header x-ghost-uuid`);
});