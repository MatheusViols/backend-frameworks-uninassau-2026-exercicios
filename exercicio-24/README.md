# Exercício 24: GraphQL Avançado

## 🎯 Objetivo
Implementar recursos avançados de GraphQL incluindo queries aninhadas, DataLoader para resolver N+1 problem, input types e opcionalmente subscriptions.

## 📚 Conceitos Abordados
- Queries aninhadas (nested)
- N+1 Problem
- DataLoader (batching + caching)
- Input types
- Subscriptions (real-time)
- GraphQL performance

## 🔧 Tecnologias
- Apollo Server
- DataLoader
- GraphQL Subscriptions (opcional)

## 📝 Tarefas

### 1. Queries Aninhadas
```graphql
query {
  user(id: "1") {
    name
    posts {
      title
      comments {
        content
        author {
          name
        }
      }
    }
  }
}
```

### 2. Resolver N+1 Problem com DataLoader
```javascript
// Sem DataLoader: 1 + N queries
// Com DataLoader: 2 queries (batch)

const userLoader = new DataLoader(async (ids) => {
  const users = await User.findAll({ where: { id: ids } });
  return ids.map(id => users.find(u => u.id === id));
});
```

### 3. Input Types
```graphql
input CreateUserInput {
  name: String!
  email: String!
  age: Int
}

mutation {
  createUser(input: { name: "João", email: "joao@example.com" }) {
    id
  }
}
```

### 4. Subscriptions (Opcional)
```graphql
subscription {
  userCreated {
    id
    name
  }
}
```

## 🚀 Como Executar

```bash
npm install
npm start
```

## ✅ Critérios de Aceite
- [ ] Queries aninhadas funcionando (user → posts → comments)
- [ ] DataLoader implementado para evitar N+1
- [ ] Input types para mutations
- [ ] Validações customizadas
- [ ] Subscriptions (opcional)
- [ ] Todos os testes passando

## 📖 Recursos
- [DataLoader](https://github.com/graphql/dataloader)
- [GraphQL Subscriptions](https://www.apollographql.com/docs/apollo-server/data/subscriptions/)

## 🎓 Dicas
- Use DataLoader para relacionamentos
- Batch requests do mesmo tipo
- Cache automático por request
- Input types organizam mutations complexas
