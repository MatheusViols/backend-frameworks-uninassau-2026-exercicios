# Solução: Exercício 24 - GraphQL Avançado

## Schema com Queries Aninhadas

**src/schema/typeDefs.js**
```javascript
const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User
    comments: [Comment]
  }

  type Comment {
    id: ID!
    content: String!
    post: Post
    author: User
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input UpdateUserInput {
    name: String
    email: String
  }

  type Query {
    user(id: ID!): User
    users: [User]
    post(id: ID!): Post
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
  }

  type Subscription {
    userCreated: User
  }
`;

module.exports = typeDefs;
```

## DataLoader para N+1 Problem

**src/dataloaders/userLoader.js**
```javascript
const DataLoader = require('dataloader');
const User = require('../models/User');

// Batch function: recebe array de IDs, retorna array de Users
const batchUsers = async (userIds) => {
  console.log('🔍 Batching user IDs:', userIds);
  
  // Uma única query para todos os IDs
  const users = await User.findAll({
    where: { id: userIds }
  });
  
  // Retornar na ordem correta dos IDs
  const userMap = {};
  users.forEach(user => {
    userMap[user.id] = user;
  });
  
  return userIds.map(id => userMap[id] || null);
};

const createUserLoader = () => new DataLoader(batchUsers);

module.exports = createUserLoader;
```

**src/dataloaders/postLoader.js**
```javascript
const DataLoader = require('dataloader');
const Post = require('../models/Post');

const batchPostsByUserId = async (userIds) => {
  const posts = await Post.findAll({
    where: { authorId: userIds }
  });
  
  // Agrupar posts por userId
  const postsByUser = {};
  userIds.forEach(id => {
    postsByUser[id] = [];
  });
  
  posts.forEach(post => {
    if (postsByUser[post.authorId]) {
      postsByUser[post.authorId].push(post);
    }
  });
  
  return userIds.map(id => postsByUser[id]);
};

const createPostLoader = () => new DataLoader(batchPostsByUserId);

module.exports = createPostLoader;
```

## Resolvers com DataLoader

**src/resolvers/index.js**
```javascript
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();
const USER_CREATED = 'USER_CREATED';

const resolvers = {
  Query: {
    user: async (_, { id }, { loaders }) => {
      return await loaders.userLoader.load(id);
    },
    users: async () => {
      return await User.findAll();
    },
    post: async (_, { id }) => {
      return await Post.findByPk(id);
    }
  },
  
  Mutation: {
    createUser: async (_, { input }) => {
      const user = await User.create(input);
      
      // Publicar para subscriptions
      pubsub.publish(USER_CREATED, { userCreated: user });
      
      return user;
    },
    
    updateUser: async (_, { id, input }) => {
      const user = await User.findByPk(id);
      if (!user) throw new Error('User not found');
      
      await user.update(input);
      return user;
    }
  },
  
  // Resolvers de campos aninhados
  User: {
    posts: async (user, _, { loaders }) => {
      // Usa DataLoader para batch loading
      return await loaders.postLoader.load(user.id);
    }
  },
  
  Post: {
    author: async (post, _, { loaders }) => {
      return await loaders.userLoader.load(post.authorId);
    },
    
    comments: async (post) => {
      return await Comment.findAll({
        where: { postId: post.id }
      });
    }
  },
  
  Comment: {
    author: async (comment, _, { loaders }) => {
      return await loaders.userLoader.load(comment.authorId);
    },
    
    post: async (comment) => {
      return await Post.findByPk(comment.postId);
    }
  },
  
  Subscription: {
    userCreated: {
      subscribe: () => pubsub.asyncIterator([USER_CREATED])
    }
  }
};

module.exports = resolvers;
```

## Context com DataLoaders

**src/index.js**
```javascript
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const sequelize = require('./config/database');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');
const createUserLoader = require('./dataloaders/userLoader');
const createPostLoader = require('./dataloaders/postLoader');

async function startServer() {
  await sequelize.sync();

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => {
      // Criar novos loaders para cada request
      return {
        loaders: {
          userLoader: createUserLoader(),
          postLoader: createPostLoader()
        }
      };
    }
  });

  console.log(`🚀 Server ready at ${url}`);
}

startServer();
```

## 🎯 N+1 Problem Explicado

**Sem DataLoader:**
```
Query: user(id: 1) { posts { author { name } } }

1. SELECT * FROM users WHERE id = 1
2. SELECT * FROM posts WHERE userId = 1  (retorna 10 posts)
3. SELECT * FROM users WHERE id = 5   // Para post 1
4. SELECT * FROM users WHERE id = 5   // Para post 2 (duplicado!)
5. SELECT * FROM users WHERE id = 8   // Para post 3
... 10 queries adicionais!
Total: 12 queries
```

**Com DataLoader:**
```
1. SELECT * FROM users WHERE id = 1
2. SELECT * FROM posts WHERE userId = 1  (retorna 10 posts)
3. SELECT * FROM users WHERE id IN (5, 8, 12)  // Batch!
Total: 3 queries
```

## Input Types

```graphql
# Organizam inputs complexos
input CreateUserInput {
  name: String!
  email: String!
  age: Int
  address: AddressInput
}

input AddressInput {
  street: String
  city: String
}

mutation {
  createUser(input: {
    name: "João"
    email: "joao@example.com"
    address: {
      street: "Rua A"
      city: "Recife"
    }
  }) {
    id
  }
}
```

## Subscriptions

```graphql
subscription {
  userCreated {
    id
    name
    email
  }
}
```

Cliente recebe notificação real-time quando usuário é criado.

## 📊 Performance Comparison

| Métrica | Sem DataLoader | Com DataLoader |
|---------|----------------|----------------|
| Queries | 1 + N | ~2 |
| Latência | Alta | Baixa |
| Duplicação | Sim | Não |

## 📚 Recursos
- [DataLoader GitHub](https://github.com/graphql/dataloader)
- [Solving N+1 Problem](https://www.apollographql.com/blog/backend/data-sources/solving-the-n1-problem/)
- [GraphQL Subscriptions](https://www.apollographql.com/docs/apollo-server/data/subscriptions/)
