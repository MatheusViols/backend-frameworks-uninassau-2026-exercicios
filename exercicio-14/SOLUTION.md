# Solução: Exercício 14 - Relacionamentos 1:N e N:M

## 📝 Implementação Completa

### 1. Model User

**src/models/User.js**
```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
});

module.exports = User;
```

### 2. Model Post

**src/models/Post.js**
```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Nome da tabela referenciada
      key: 'id'
    }
  }
});

module.exports = Post;
```

### 3. Model Tag

**src/models/Tag.js**
```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tag = sequelize.define('Tag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Tag;
```

### 4. Configuração dos Relacionamentos

**src/models/index.js**
```javascript
const User = require('./User');
const Post = require('./Post');
const Tag = require('./Tag');

// Relacionamento 1:N - User hasMany Posts
// Um usuário pode ter muitos posts
User.hasMany(Post, {
  foreignKey: 'userId',
  as: 'Posts' // Alias para eager loading
});

// Relacionamento inverso - Post belongsTo User
// Um post pertence a um usuário
Post.belongsTo(User, {
  foreignKey: 'userId',
  as: 'User'
});

// Relacionamento N:M - Post belongsToMany Tags
// Um post pode ter muitas tags
Post.belongsToMany(Tag, {
  through: 'PostTags', // Nome da tabela de junção
  foreignKey: 'postId',
  otherKey: 'tagId',
  as: 'Tags'
});

// Relacionamento inverso - Tag belongsToMany Posts
// Uma tag pode estar em muitos posts
Tag.belongsToMany(Post, {
  through: 'PostTags',
  foreignKey: 'tagId',
  otherKey: 'postId',
  as: 'Posts'
});

module.exports = { User, Post, Tag };
```

**Explicação dos Relacionamentos:**

#### 1:N (User → Posts)
```javascript
// User.hasMany(Post) cria:
// - Método user.getPosts()
// - Método user.addPost(post)
// - Método user.createPost(data)
// - Coluna userId em Post

// Post.belongsTo(User) cria:
// - Método post.getUser()
// - Método post.setUser(user)
```

#### N:M (Post ↔ Tags)
```javascript
// Post.belongsToMany(Tag, { through: 'PostTags' }) cria:
// - Tabela PostTags com (postId, tagId)
// - Método post.getTags()
// - Método post.addTag(tag) / post.addTags([tags])
// - Método post.removeTag(tag)
// - Método post.hasTag(tag)

// Tag.belongsToMany(Post) cria métodos equivalentes
```

## 🎯 Conceitos-Chave

### 1. Eager Loading vs Lazy Loading

**Eager Loading (Carregamento Antecipado)**
```javascript
// Busca usuário E posts em uma única query
const user = await User.findByPk(1, {
  include: Post // Carrega posts junto
});

console.log(user.Posts); // Dados já estão aqui
```

**Lazy Loading (Carregamento Preguiçoso)**
```javascript
// Busca usuário primeiro
const user = await User.findByPk(1);

// Busca posts depois (segunda query)
const posts = await user.getPosts();
```

**Quando usar cada um:**
- **Eager:** Quando você sabe que vai precisar dos dados relacionados
- **Lazy:** Quando pode ou não precisar dos dados relacionados
- **Cuidado:** Lazy loading pode causar N+1 problem

### 2. N+1 Problem

```javascript
// RUIM: N+1 queries (1 + N)
const users = await User.findAll(); // 1 query
for (const user of users) {
  const posts = await user.getPosts(); // N queries (uma por usuário)
}

// BOM: 2 queries apenas
const users = await User.findAll({
  include: Post // Busca tudo de uma vez
});
```

### 3. Queries Aninhadas

```javascript
// Buscar usuário → posts → tags
const user = await User.findByPk(1, {
  include: {
    model: Post,
    include: Tag // Include dentro de include
  }
});

// Estrutura retornada:
// {
//   id: 1,
//   name: 'João',
//   Posts: [
//     {
//       id: 1,
//       title: 'Post 1',
//       Tags: [
//         { id: 1, name: 'nodejs' },
//         { id: 2, name: 'javascript' }
//       ]
//     }
//   ]
// }
```

### 4. Métodos Gerados Automaticamente

**hasMany/belongsTo:**
```javascript
// User hasMany Posts
user.getPosts()
user.addPost(post)
user.addPosts([post1, post2])
user.createPost({ title, content })
user.removePost(post)
user.hasPosts()

// Post belongsTo User
post.getUser()
post.setUser(user)
```

**belongsToMany:**
```javascript
// Post belongsToMany Tags
post.getTags()
post.addTag(tag)
post.addTags([tag1, tag2])
post.removeTag(tag)
post.hasTag(tag)
post.setTags([tag1, tag2]) // Substitui todas
```

## 📊 Estrutura do Banco de Dados

```sql
-- Tabela Users
CREATE TABLE Users (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE
);

-- Tabela Posts (com FK userId)
CREATE TABLE Posts (
  id INTEGER PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  userId INTEGER REFERENCES Users(id)
);

-- Tabela Tags
CREATE TABLE Tags (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) UNIQUE
);

-- Tabela de junção PostTags
CREATE TABLE PostTags (
  postId INTEGER REFERENCES Posts(id),
  tagId INTEGER REFERENCES Tags(id),
  PRIMARY KEY (postId, tagId)
);
```

## ⚠️ Erros Comuns

### 1. Esquecer de definir ambos os lados do relacionamento
```javascript
// INCOMPLETO:
User.hasMany(Post); // Faltou Post.belongsTo(User)

// CORRETO:
User.hasMany(Post);
Post.belongsTo(User);
```

### 2. Usar nomes inconsistentes
```javascript
// RUIM:
User.hasMany(Post, { as: 'posts' }); // minúsculo
Post.belongsTo(User, { as: 'Author' }); // Nome diferente

// BOM:
User.hasMany(Post, { as: 'Posts' }); // Consistente
Post.belongsTo(User, { as: 'User' }); // Consistente
```

### 3. Esquecer 'through' em belongsToMany
```javascript
// ERRADO:
Post.belongsToMany(Tag); // Faltou { through: 'PostTags' }

// CERTO:
Post.belongsToMany(Tag, { through: 'PostTags' });
```

### 4. Confundir métodos de instância vs modelo
```javascript
// ERRADO:
const posts = await Post.getPosts(); // Post é o modelo, não tem getPosts

// CERTO:
const user = await User.findByPk(1);
const posts = await user.getPosts(); // user é uma instância
```

## 🧪 Estratégia de Testes

### Testar Eager Loading
```javascript
test('deve buscar com include', async () => {
  const user = await User.findByPk(1, {
    include: Post
  });
  
  expect(user.Posts).toBeDefined();
  expect(user.Posts.length).toBeGreaterThan(0);
});
```

### Testar Lazy Loading
```javascript
test('deve buscar com lazy loading', async () => {
  const user = await User.findByPk(1);
  const posts = await user.getPosts(); // Segunda query
  
  expect(posts).toBeDefined();
});
```

### Testar Métodos de Associação
```javascript
test('deve adicionar tags', async () => {
  const post = await Post.findByPk(1);
  const tag = await Tag.create({ name: 'nodejs' });
  
  await post.addTag(tag);
  
  const tags = await post.getTags();
  expect(tags).toContainEqual(expect.objectContaining({ name: 'nodejs' }));
});
```

## 🚀 Próximos Passos

1. **Exercício 15:** Adicionar transações para operações complexas
2. **Scopes:** Criar queries reutilizáveis
3. **Paranoid:** Soft deletes em relacionamentos
4. **Hooks:** Ações automáticas em cascata

## 📚 Recursos Adicionais

- [Sequelize Associations](https://sequelize.org/docs/v6/core-concepts/assocs/)
- [Advanced M:N](https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/)
- [Eager Loading](https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/)
