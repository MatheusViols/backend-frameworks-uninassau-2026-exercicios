# Solução: Exercício 13 - Sequelize ORM

## 📝 Implementação Completa

### 1. Configuração do Banco de Dados

**src/config/database.js**
```javascript
const { Sequelize } = require('sequelize');

// Configuração do Sequelize com SQLite
// dialect: 'sqlite' especifica o banco de dados
// storage: caminho do arquivo SQLite
// logging: false desabilita logs SQL (útil em testes)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false // Desabilita logs SQL
});

module.exports = sequelize;
```

**Explicação:**
- `dialect: 'sqlite'` - Define SQLite como banco de dados
- `storage` - Caminho onde o arquivo SQLite será criado
- `logging: false` - Evita poluição de logs durante testes

### 2. Model User

**src/models/User.js**
```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define o model User com seus campos e validações
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // Campo obrigatório
    validate: {
      notEmpty: {
        msg: 'Nome não pode ser vazio'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Email deve ser único
    validate: {
      isEmail: {
        msg: 'Email inválido'
      },
      notEmpty: {
        msg: 'Email não pode ser vazio'
      }
    }
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true, // Campo opcional
    validate: {
      min: {
        args: [0],
        msg: 'Idade deve ser maior que 0'
      }
    }
  }
}, {
  timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  tableName: 'users' // Nome da tabela no banco
});

module.exports = User;
```

**Validações Implementadas:**
- `name`: obrigatório, não pode ser vazio
- `email`: obrigatório, deve ser email válido, único
- `age`: opcional, deve ser maior que 0
- Timestamps automáticos (createdAt, updatedAt)

### 3. Serviço CRUD

**src/userService.js**
```javascript
const User = require('./models/User');

class UserService {
  // CREATE - Cria novo usuário
  async createUser(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      // Sequelize lança erros de validação automaticamente
      throw error;
    }
  }

  // READ ALL - Lista todos os usuários
  async getAllUsers() {
    return await User.findAll({
      order: [['createdAt', 'DESC']] // Ordena por data de criação
    });
  }

  // READ ONE - Busca usuário por ID
  async getUserById(id) {
    return await User.findByPk(id); // findByPk = find by primary key
  }

  // UPDATE - Atualiza usuário
  async updateUser(id, data) {
    const user = await User.findByPk(id);
    
    if (!user) {
      return null; // Usuário não encontrado
    }

    // update() atualiza apenas os campos fornecidos
    await user.update(data);
    return user;
  }

  // DELETE - Remove usuário
  async deleteUser(id) {
    const user = await User.findByPk(id);
    
    if (!user) {
      return false; // Usuário não encontrado
    }

    await user.destroy();
    return true;
  }
}

module.exports = new UserService();
```

**Padrões Utilizados:**
- Métodos assíncronos com async/await
- Retorno consistente (objeto, null, boolean)
- Tratamento de erros delegado ao Sequelize
- Singleton pattern (exporta instância única)

## 🎯 Conceitos-Chave

### 1. ORM (Object-Relational Mapping)
```javascript
// Sem ORM (SQL puro):
db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email])

// Com ORM (Sequelize):
User.create({ name, email })
```
**Vantagens:** abstração, validações, type safety, migrations

### 2. Validações do Sequelize
```javascript
{
  email: {
    type: DataTypes.STRING,
    allowNull: false,      // Validação de presença
    unique: true,          // Validação de unicidade
    validate: {
      isEmail: true        // Validação de formato
    }
  }
}
```

### 3. Métodos CRUD do Sequelize
- `Model.create(data)` - INSERT
- `Model.findAll()` - SELECT *
- `Model.findByPk(id)` - SELECT WHERE id
- `instance.update(data)` - UPDATE
- `instance.destroy()` - DELETE

### 4. Timestamps Automáticos
```javascript
{
  timestamps: true // Adiciona createdAt e updatedAt
}
```
Sequelize gerencia automaticamente essas colunas.

## ⚠️ Erros Comuns

### 1. Esquecer de sincronizar o banco
```javascript
// Necessário antes de usar os models
await sequelize.sync({ force: true }); // Em dev
```

### 2. Não tratar validações
```javascript
try {
  await User.create({ name: '' }); // Vai lançar erro
} catch (error) {
  console.error(error.errors); // Array de erros de validação
}
```

### 3. Confundir Model.method() vs instance.method()
```javascript
// ERRADO:
const user = User.findByPk(1);
User.update({ name: 'Novo' }); // Vai atualizar TODOS os usuários!

// CERTO:
const user = await User.findByPk(1);
await user.update({ name: 'Novo' }); // Atualiza apenas este usuário
```

## 🧪 Estratégia de Testes

### Setup/Teardown
```javascript
beforeAll(async () => {
  await sequelize.sync({ force: true }); // Cria tabelas
});

afterAll(async () => {
  await sequelize.close(); // Fecha conexão
});

beforeEach(async () => {
  await User.destroy({ where: {}, truncate: true }); // Limpa dados
});
```

### Testes de Validação
```javascript
test('deve falhar ao criar usuário sem email', async () => {
  await expect(userService.createUser({ name: 'João' }))
    .rejects.toThrow(); // Espera que lance erro
});
```

## 📊 Fluxo de Dados

```
Request → UserService → Sequelize Model → SQLite Database
         ↓
    Validações
         ↓
    SQL Query
         ↓
    Resultado
```

## 🚀 Próximos Passos

1. **Exercício 14:** Adicionar relacionamentos (1:N, N:M)
2. **Migrations:** Usar Sequelize CLI para versionamento do banco
3. **Seeders:** Popular banco com dados iniciais
4. **Scopes:** Criar queries reutilizáveis
5. **Hooks:** Adicionar lógica antes/depois de operações

## 📚 Recursos Adicionais

- [Sequelize Models](https://sequelize.org/docs/v6/core-concepts/model-basics/)
- [Validations](https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/)
- [Querying](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)
