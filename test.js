const prisma = require('./src/config/prisma');
const userService = require('./src/services/UserService');
const taskService = require('./src/services/TaskService');
const sessionService = require('./src/services/SessionService');

async function runTests() {
  try {
    console.log('--- Iniciando Testes de Integração (Camada de Negócio) ---');

    // 1. Simulação do Front-end gerando um UUID
    const mockUUID = '123e4567-e89b-12d3-a456-426614174000'; 
    
    console.log('\n1. Testando criação/busca de Ghost User...');
    const user = await userService.ensureGhostUserExists(mockUUID);
    console.log('✅ Usuário validado no banco:', user.id);

    // 2. Simulação do usuário criando uma tarefa na UI
    console.log('\n2. Testando criação de Tarefa...');
    const task = await taskService.createTask('Estruturar API do Pomodoro', user.id);
    console.log('✅ Tarefa criada:', task.title);

    // 3. Simulação do timer chegando a zero no Vue.js
    console.log('\n3. Registrando um Pomodoro concluído...');
    const session = await sessionService.registerSession({
      userId: user.id,
      taskId: task.id,
      title: 'Foco inicial na arquitetura',
      duration: 25,
      status: 'COMPLETED'
    });
    console.log('✅ Sessão de Pomodoro salva com sucesso:', session.id);

    // 4. Simulação do carregamento inicial da página (Buscar histórico)
    console.log('\n4. Buscando histórico de sessões de hoje...');
    const todayHistory = await sessionService.getTodayHistory(user.id);
    console.log(`✅ Histórico recuperado. Total de sessões hoje: ${todayHistory.length}`);
    console.log('Detalhes da última sessão:', todayHistory[0].title, '- Duração:', todayHistory[0].duration, 'minutos');

  } catch (error) {
    console.error('❌ Erro durante os testes:', error.message);
  } finally {
    // Desconecta o Prisma do banco para o script Node.js poder encerrar no terminal
    await prisma.$disconnect();
    console.log('\n--- Fim dos Testes ---');
  }
}

// Executa a função assíncrona
runTests();