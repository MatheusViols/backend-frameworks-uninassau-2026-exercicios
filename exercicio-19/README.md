# Exercício 19: Testes de Integração

## 🎯 Objetivo
Escrever testes de integração end-to-end que testam a API completa com banco de dados real.

## 📚 Conceitos Abordados
- Testes E2E (End-to-End)
- Supertest para HTTP
- Setup e teardown de banco
- Test fixtures
- Test database

## 🔧 Tecnologias
- Jest + Supertest
- Express
- Sequelize + SQLite

## 📝 Tarefas

### 1. Criar API REST de Tarefas (TODO)
- POST /tasks - Criar tarefa
- GET /tasks - Listar tarefas
- GET /tasks/:id - Buscar tarefa
- PUT /tasks/:id - Atualizar tarefa
- DELETE /tasks/:id - Deletar tarefa

### 2. Setup de Banco de Teste
- Banco SQLite separado para testes
- Sincronizar antes dos testes
- Limpar dados entre testes
- Fechar conexão após testes

### 3. Testes de Rotas HTTP
- Testar status codes corretos
- Testar validações de input
- Testar fluxo completo CRUD
- Testar casos de erro (404, 400, etc)

## 🚀 Como Executar

```bash
npm install
npm test
```

## ✅ Critérios de Aceite
- [ ] Todas as rotas testadas
- [ ] Status codes corretos
- [ ] Validações testadas
- [ ] Setup/teardown funcionando
- [ ] Banco isolado para testes
- [ ] Todos os testes passando

## 📖 Recursos
- [Supertest](https://github.com/ladjs/supertest)
- [Jest Setup/Teardown](https://jestjs.io/docs/setup-teardown)

## 🎓 Dicas
- Use banco de teste separado (test.sqlite)
- beforeAll: setup banco
- afterAll: fechar conexão
- beforeEach: limpar dados
