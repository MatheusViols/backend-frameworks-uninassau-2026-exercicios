# Exercício 13: Sequelize ORM (SQL)

## 🎯 Objetivo
Aprender a usar o Sequelize ORM para operações de banco de dados SQL com SQLite, incluindo models, migrations e operações CRUD.

## 📚 Conceitos Abordados
- Configuração do Sequelize
- Models do Sequelize
- Migrations
- Operações CRUD (Create, Read, Update, Delete)
- Consultas SQL abstraídas

## 🔧 Tecnologias
- Node.js
- Sequelize (ORM)
- SQLite (banco de dados)
- Jest (testes)

## 📝 Tarefas

### 1. Configurar Sequelize
- Instalar dependências: `sequelize`, `sequelize-cli`, `sqlite3`
- Criar arquivo de configuração `src/config/database.js`
- Inicializar conexão com SQLite

### 2. Criar Model User
- Criar model `User` com os campos:
  - `id` (auto-incremento, chave primária)
  - `name` (string, obrigatório)
  - `email` (string, obrigatório, único)
  - `age` (integer, opcional)
  - `createdAt` e `updatedAt` (timestamps automáticos)

### 3. Criar Migration
- Usar Sequelize CLI para gerar migration
- Migration deve criar a tabela `users`
- Executar migration para criar tabela

### 4. Implementar CRUD
No arquivo `src/userService.js`:
- `createUser(data)` - Criar novo usuário
- `getAllUsers()` - Listar todos os usuários
- `getUserById(id)` - Buscar usuário por ID
- `updateUser(id, data)` - Atualizar usuário
- `deleteUser(id)` - Deletar usuário

### 5. Escrever Testes
- Testar criação de usuário
- Testar listagem de usuários
- Testar busca por ID
- Testar atualização de usuário
- Testar deleção de usuário
- Testar validações (email único, campos obrigatórios)

## 🚀 Como Executar

### Instalar dependências
```bash
npm install
```

### Executar migrations
```bash
npx sequelize-cli db:migrate
```

### Rodar testes
```bash
npm test
```

## ✅ Critérios de Aceite
- [ ] Sequelize configurado corretamente com SQLite
- [ ] Model User criado com validações
- [ ] Migration criada e executável
- [ ] Todas as operações CRUD funcionando
- [ ] Todos os testes passando
- [ ] Validações de campo sendo respeitadas

## 📖 Recursos
- [Documentação Sequelize](https://sequelize.org/docs/v6/)
- [Sequelize Models](https://sequelize.org/docs/v6/core-concepts/model-basics/)
- [Sequelize Migrations](https://sequelize.org/docs/v6/other-topics/migrations/)

## 🎓 Dicas
- Use `sync({ force: true })` apenas em desenvolvimento para recriar tabelas
- Em produção, sempre use migrations
- Sequelize CLI facilita a criação de models e migrations
- O SQLite cria um arquivo `.sqlite` no diretório raiz
- Validações do Sequelize são executadas antes de salvar no banco
