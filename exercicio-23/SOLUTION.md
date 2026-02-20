# Solução: Exercício 23 - GraphQL Básico

**src/schema/typeDefs.js**
```javascript
const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String
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
`;

module.exports = typeDefs;
```

**src/resolvers/userResolvers.js**
```javascript
const User = require('../models/User');

const resolvers = {
  Query: {
    users: async () => {
      return await User.findAll();
    },
    user: async (_, { id }) => {
      return await User.findByPk(id);
    }
  },
  
  Mutation: {
    createUser: async (_, { name, email }) => {
      return await User.create({ name, email });
    },
    
    updateUser: async (_, { id, name, email }) => {
      const user = await User.findByPk(id);
      if (!user) throw new Error('User not found');
      
      await user.update({ name, email });
      return user;
    },
    
    deleteUser: async (_, { id }) => {
      const user = await User.findByPk(id);
      if (!user) return false;
      
      await user.destroy();
      return true;
    }
  }
};

module.exports = resolvers;
```

**src/index.js**
```javascript
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const sequelize = require('./config/database');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers/userResolvers');

async function startServer() {
  await sequelize.sync();

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
  });

  console.log(`🚀 Server ready at ${url}`);
}

startServer();
```

## 🎯 GraphQL vs REST

| GraphQL | REST |
|---------|------|
| Uma endpoint | Múltiplos endpoints |
| Cliente define campos | Servidor define response |
| Evita over/under-fetching | Pode ter dados extras |
| Fortemente tipado | Depende de docs |

## Exemplo de Query
```graphql
# Buscar apenas campos necessários
query {
  user(id: "1") {
    name
    email
  }
}

# Buscar relacionamentos
query {
  users {
    name
    posts {
      title
    }
  }
}
```

## Exemplo de Mutation
```graphql
mutation {
  createUser(name: "João", email: "joao@example.com") {
    id
    name
    email
  }
}
```

## 📚 Recursos
- [GraphQL Introduction](https://graphql.org/learn/)
- [Apollo Server Docs](https://www.apollographql.com/docs/apollo-server/)
