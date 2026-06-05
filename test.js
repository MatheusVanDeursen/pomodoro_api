const API_URL = 'http://localhost:3001/api';
const GHOST_UUID = '999e4567-e89b-12d3-a456-426614174999';

async function apiFetch(endpoint, method = 'GET', body = null, customHeaders = null) {
  const headers = customHeaders || {
    'Content-Type': 'application/json',
    'x-ghost-uuid': GHOST_UUID
  };

  const options = {
    method,
    headers
  };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${API_URL}${endpoint}`, options);
  // Evita crash no json() se a API retornar 204 No Content ou vazio
  const data = await response.text().then(text => text ? JSON.parse(text) : {});
  
  return { status: response.status, data };
}

function printResult(success, message, data = null) {
  if (success) {
    console.log(`✅ ${message}`);
  } else {
    console.log(`❌ FALHA: ${message}`);
    if (data) console.log('Detalhes:', data);
  }
}

async function runApiTests() {
  console.log('🚀 Iniciando Bateria PROFUNDA de Testes da API...\n');

  try {
    /* --- 1. SEGURANÇA E MIDDLEWARE --- */
    console.log('🛡️  1. Testando Autenticação e Segurança');
    const authTest = await apiFetch('/tasks', 'GET', null, { 'Content-Type': 'application/json' }); // Sem x-ghost-uuid
    printResult(authTest.status === 401, 'Bloqueio de acesso sem UUID (401 Unauthorized)');

    /* --- 2. ZOD - SCHEMAS E VALIDAÇÃO --- */
    console.log('\n🧩 2. Testando Zod (Schema Validation)');
    const emptyTitleTest = await apiFetch('/tasks', 'POST', { title: '' });
    printResult(emptyTitleTest.status === 400 && emptyTitleTest.data.detalhes, 'Bloqueio de campos vazios (.min)', emptyTitleTest.data);

    const strictTest = await apiFetch('/tasks', 'POST', { title: 'Tarefa', lixo: 'teste' });
    printResult(strictTest.status === 400, 'Bloqueio de chaves não esperadas no payload (.strict)');

    const badUuidTest = await apiFetch('/tasks/uuid-invalido', 'PUT', { title: 'Teste' });
    printResult(badUuidTest.status === 400, 'Identificação de UUID inválido nos Parâmetros (.uuid)');

    /* --- 3. CATEGORIAS (CRUD) --- */
    console.log('\n📂 3. Testando Categorias (CRUD Completo)');
    const catCreate = await apiFetch('/categories', 'POST', { name: 'Dev Backend' });
    printResult(catCreate.status === 201, `Create: Categoria "${catCreate.data.name}" gerada.`);
    const catId = catCreate.data.id;

    const catList = await apiFetch('/categories', 'GET');
    printResult(catList.status === 200 && Array.isArray(catList.data), 'Read: Lista de categorias retornada com sucesso.');

    const catUpdate = await apiFetch(`/categories/${catId}`, 'PUT', { name: 'Dev Fullstack' });
    printResult(catUpdate.status === 200, 'Update: Categoria renomeada com sucesso.');

    const catDelete = await apiFetch(`/categories/${catId}`, 'DELETE');
    printResult(catDelete.status === 200, 'Delete: Categoria removida com sucesso.');

    const catNotFound = await apiFetch(`/categories/${catId}`, 'DELETE');
    printResult(catNotFound.status === 404, 'Regra de Negócio: Erro 404 ao tentar deletar categoria inexistente.');

    /* --- 4. PRESETS (CRUD) --- */
    console.log('\n⏱️  4. Testando Presets Customizados (CRUD Completo)');
    const presetCreate = await apiFetch('/presets', 'POST', { name: 'Estudo Intenso', focusTime: 50, shortBreak: 10 });
    printResult(presetCreate.status === 201, `Create: Preset "${presetCreate.data.name}" gerado.`);
    const presetId = presetCreate.data.id;

    const presetList = await apiFetch('/presets', 'GET');
    printResult(presetList.status === 200 && presetList.data.length > 0, 'Read: Presets customizados + globais retornados.');

    const presetUpdate = await apiFetch(`/presets/${presetId}`, 'PUT', { focusTime: 60 });
    printResult(presetUpdate.status === 200, 'Update: Tempo de foco do preset alterado.');

    const presetDelete = await apiFetch(`/presets/${presetId}`, 'DELETE');
    printResult(presetDelete.status === 200, 'Delete: Preset removido com sucesso.');

    /* --- 5. TAREFAS E PAGINAÇÃO (CRUD) --- */
    console.log('\n📝 5. Testando Tarefas e Paginação');
    // Populando banco para paginar
    await apiFetch('/tasks', 'POST', { title: 'Tarefa A' });
    await apiFetch('/tasks', 'POST', { title: 'Tarefa B' });
    const taskCreate = await apiFetch('/tasks', 'POST', { title: 'Tarefa C' });
    printResult(taskCreate.status === 201, 'Create: 3 tarefas criadas para teste de paginação.');
    const taskId = taskCreate.data.id;

    const pageTest = await apiFetch('/tasks?page=1&limit=2', 'GET');    
    if (pageTest.data.meta && pageTest.data.meta.limit === 2) {
      printResult(true, `Read/Paginação: Funcionou! Retornou ${pageTest.data.data.length} itens (Página: 1).`);
    } else {
      printResult(false, 'Falha na paginação.', pageTest.data);
    }

    const taskUpdate = await apiFetch(`/tasks/${taskId}`, 'PUT', { isDone: true });
    printResult(taskUpdate.status === 200, 'Update: Status isDone atualizado.');

    const taskDelete = await apiFetch(`/tasks/${taskId}`, 'DELETE');
    printResult(taskDelete.status === 200, 'Delete: Tarefa deletada com sucesso.');

    /* --- 6. SESSÕES DE POMODORO (SESSÃO) --- */
    console.log('\n🍅 6. Testando Histórico de Sessões Pomodoro');
    const sessionCreate = await apiFetch('/pomodoros', 'POST', { 
      duration: 1500, // 25 min
      status: 'COMPLETED',
      title: 'Foco Total',
      description: 'Testes da API'
    });
    printResult(sessionCreate.status === 201, `Create: Ciclo Pomodoro concluído salvo no histórico.`);
    const sessionId = sessionCreate.data.id;

    const sessionInterrupted = await apiFetch('/pomodoros', 'POST', { duration: 300, status: 'INTERRUPTED' });
    printResult(sessionInterrupted.status === 201, `Create: Ciclo Interrompido salvo no histórico.`);

    const sessionToday = await apiFetch('/pomodoros/today', 'GET');
    printResult(sessionToday.status === 200 && Array.isArray(sessionToday.data), `Read: Histórico de Hoje listou ${sessionToday.data?.length || 0} itens.`);

    const sessionUpdate = await apiFetch(`/pomodoros/${sessionId}`, 'PUT', { description: 'Atualizando os testes' });
    printResult(sessionUpdate.status === 200, 'Update: Descrição da Sessão alterada com sucesso.');

    const sessionDelete = await apiFetch(`/pomodoros/${sessionId}`, 'DELETE');
    printResult(sessionDelete.status === 200, 'Delete: Sessão deletada do histórico com sucesso.');

  } catch (error) {
    console.error('\n❌ Erro crítico no script de teste:', error);
  }

  console.log('\n🏁 Bateria de testes concluída!');
}

runApiTests();