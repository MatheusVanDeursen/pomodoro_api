# Pomodoro App 🍅👻

Um aplicativo web de Pomodoro focado em produtividade individual, desenhado com uma arquitetura de baixo atrito baseada em "Ghost Accounts" (contas anônimas via UUID).

## 🚀 O Projeto

Este sistema está sendo projetado com uma abordagem estruturada (N-Tier / DAO) para garantir a separação de responsabilidades e facilitar a manutenção. O grande diferencial da aplicação é a resiliência do timer no front-end: utilizando a estratégia de estados baseados em *timestamps* no `localStorage`, o cronômetro sobrevive a recarregamentos de página sem sobrecarregar a API com requisições contínuas. O back-end é acionado estritamente para consolidação de histórico e consolidação de tarefas.

## 🛠️ Stack Tecnológica

* **Back-end:** Node.js, Express
* **Banco de Dados:** PostgreSQL
* **ORM:** Prisma
* **Front-end:** Vue.js *(Em desenvolvimento)*

## ✨ Funcionalidades planejadas (MVP - Versão 1.0)

* **Ghost Accounts:** Uso imediato da plataforma sem necessidade de formulários de cadastro, atrelando o progresso a um UUID.
* **Resiliência de Estado:** Recuperação exata do tempo de foco mesmo se o navegador for fechado acidentalmente.
* **Gestão de Tarefas:** Criação de *To-Dos* e vinculação direta dos ciclos de foco às tarefas ativas.
* **Histórico de Sessões:** Registro detalhado de ciclos concluídos com sucesso ou interrompidos.
* **Modelos Customizados:** Suporte a parametrização de tempos (Foco, Pausa Curta, Pausa Longa).

## 📂 Arquitetura do Back-end

A API RESTful adota o padrão de repositório (DAO) combinado com uma camada de serviços:
* **Routes:** Mapeamento de endpoints REST.
* **Middlewares:** Interceptação e validação de segurança (ex: verificação do Header `x-ghost-uuid`).
* **Controllers:** Orquestração de requisições e formatação de respostas HTTP.
* **Services:** Isolamento das regras de negócio e lógicas de validação.
* **DAOs (Data Access Objects):** Comunicação exclusiva com o PostgreSQL através do Prisma.