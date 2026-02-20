# Exercício 23: GraphQL Básico

## 🎯 Objetivo
Criar uma API GraphQL básica com Apollo Server, implementando queries e mutations para operações CRUD.

## 📚 Conceitos Abordados
- GraphQL vs REST
- Schema Definition Language (SDL)
- Queries e Mutations
- Resolvers
- GraphQL Playground
- Type system

## 🔧 Tecnologias
- Apollo Server
- GraphQL
- Sequelize

## 📝 Tarefas

### 1. Configurar Apollo Server
```javascript
const { ApolloServer } = require('apollo-server');
```

### 2. Definir Schema
```graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post]
}

type Query {
  users: [User]
  user(id: ID!): User
}

type Mutation {
  createUser(name: String!, email: String!): User
  updateUser(id: ID!, name: String, email: String): User
  deleteUser(id: ID!): Boolean
}
```

### 3. Implementar Resolvers
```javascript
const resolvers = {
  Query: {
    users: () => User.findAll(),
    user: (_, { id }) => User.findByPk(id)
  },
  Mutation: {
    createUser: (_, { name, email }) => User.create({ name, email })
  }
};
```

### 4. GraphQL Playground
- Acessar em http://localhost:4000/graphql
- Testar queries interativamente

## 🚀 Como Executar

```bash
npm install
npm start
# Abrir http://localhost:4000/graphql
```

## ✅ Critérios de Aceite
- [ ] Apollo Server configurado
- [ ] Schema GraphQL definido
- [ ] Queries funcionando (users, user)
- [ ] Mutations funcionando (create, update, delete)
- [ ] GraphQL Playground acessível
- [ ] Todos os testes passando

## 📖 Recursos
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [GraphQL](https://graphql.org/learn/)

## 🎓 Dicas
- Use `!` para campos obrigatórios
- Resolvers retornam Promises automaticamente
- Playground inclui documentação automática
- GraphQL é fortemente tipado
