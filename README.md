# Pomodoro App API 🍅

Um aplicativo web de Pomodoro focado em produtividade individual, desenhado com uma arquitetura de baixo atrito baseada em "Ghost Accounts" (contas anônimas via UUID). 

**Status:** API v1.0 Finalizada e Funcional. Front-end (Vue.js) em desenvolvimento.

## 🚀 O Projeto

Este sistema foi projetado com uma abordagem rigorosamente estruturada (N-Tier / DAO) para garantir a separação de responsabilidades, testabilidade e facilidade de manutenção. O back-end atua como uma fonte da verdade segura e validada, acionado estritamente para consolidação de histórico de sessões e gerenciamento de tarefas, enquanto confia no *localStorage* do cliente para a resiliência do timer em tempo real.

## 🛠️ Stack Tecnológica

* **Back-end:** Node.js, Express 5 (Suporte nativo a Promises)
* **Banco de Dados:** PostgreSQL
* **ORM:** Prisma
* **Validação:** Zod
* **Front-end:** Vue.js *(Em desenvolvimento)*

## ✨ Funcionalidades (API v1.0)

* **Ghost Accounts:** Sistema de autenticação silenciosa atrelando o progresso a um UUID gerado pelo cliente, sem necessidade de cadastro prévio.
* **Gestão de Tarefas (CRUD Completo):** Criação, listagem, atualização e exclusão de *To-Dos* vinculados a ciclos de foco.
* **Histórico de Sessões:** Registro detalhado de ciclos concluídos com sucesso ou interrompidos, com métricas precisas de duração.
* **Modelos Customizados e Globais:** Suporte a parametrização de tempos de foco e pausas, protegendo modelos globais do sistema contra alterações de usuários.
* **Categorização:** Criação de *tags* personalizadas para organização das sessões.
* **Paginação Estruturada:** Listagem otimizada de recursos utilizando `skip` e `take` no banco de dados para garantir performance em larga escala.

## 📂 Arquitetura e Padrões

A API RESTful adota o padrão de repositório (DAO) com camadas de validação e tratamento de erros estritos:

* **Rotas (Routes):** Mapeamento de endpoints REST limpos.
* **Validação Declarativa (Schemas):** Interceptação de requisições com **Zod** para garantir a tipagem e integridade dos dados antes de atingirem a regra de negócio.
* **Tratamento Global de Erros:** Middleware centralizado que padroniza respostas de falhas (400 Bad Request, 404 Not Found, 500 Internal Error) e oculta *stack traces* do cliente.
* **Middlewares de Segurança:** Interceptação e validação de contexto (ex: exigência e validação do Header `x-ghost-uuid`).
* **Controllers:** Orquestração exclusiva de requisições HTTP e formatação de respostas.
* **Services:** Isolamento absoluto das regras de negócio.
* **DAOs (Data Access Objects):** Comunicação exclusiva e isolada com o PostgreSQL através do Prisma.