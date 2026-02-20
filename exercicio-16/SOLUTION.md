# Solução: Exercício 16 - Paginação e Filtros

## 📝 Implementação Completa

### 1. Model Post

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
  author: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Post;
```

### 2. Rota com Paginação e Filtros

**src/routes/posts.js**
```javascript
const express = require('express');
const { Op } = require('sequelize');
const Post = require('../models/Post');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // 1. Extrair e validar query params
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const search = req.query.search || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    // 2. Construir filtros (where)
    const where = {};
    if (search) {
      where.title = {
        [Op.like]: `%${search}%` // Busca parcial case-insensitive
      };
    }

    // 3. Construir ordenação
    const orderBy = [[sort, order]];

    // 4. Calcular offset para paginação
    const offset = (page - 1) * limit;

    // 5. Buscar dados + contagem total
    const { count, rows } = await Post.findAndCountAll({
      where,
      order: orderBy,
      limit,
      offset
    });

    // 6. Calcular metadados de paginação
    const totalPages = Math.ceil(count / limit);

    // 7. Retornar resposta formatada
    res.json({
      data: rows,
      pagination: {
        page,
        limit,
        total: count,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

## 🎯 Conceitos-Chave

### 1. Paginação Offset-Based

```javascript
// Fórmula: offset = (page - 1) * limit
const page = 2;
const limit = 10;
const offset = (2 - 1) * 10 = 10; // Pula os primeiros 10 registros

// SQL gerado:
// SELECT * FROM Posts LIMIT 10 OFFSET 10
```

**Prós:**
- Simples de implementar
- Permite pular para qualquer página
- URL amigável (?page=5)

**Contras:**
- Performance degrada com offsets grandes
- Resultados inconsistentes se dados mudarem durante navegação

### 2. Sequelize Operators

```javascript
const { Op } = require('sequelize');

// LIKE - Busca parcial
where: {
  title: { [Op.like]: '%node%' } // SQL: title LIKE '%node%'
}

// ILIKE - Case-insensitive (Postgres)
where: {
  title: { [Op.iLike]: '%node%' }
}

// AND
where: {
  [Op.and]: [
    { status: 'active' },
    { views: { [Op.gt]: 100 } }
  ]
}

// OR
where: {
  [Op.or]: [
    { title: { [Op.like]: '%node%' } },
    { content: { [Op.like]: '%node%' } }
  ]
}
```

### 3. findAndCountAll()

```javascript
// Retorna { count, rows }
const result = await Model.findAndCountAll({
  where: { status: 'active' },
  limit: 10,
  offset: 20
});

console.log(result.count); // Total de registros (sem limit)
console.log(result.rows);  // Registros da página atual
```

### 4. Metadados de Paginação

```javascript
const totalPages = Math.ceil(count / limit);

const pagination = {
  page,                      // Página atual
  limit,                     // Itens por página
  total: count,              // Total de itens
  totalPages,                // Total de páginas
  hasNext: page < totalPages, // Tem próxima página?
  hasPrev: page > 1           // Tem página anterior?
};
```

## ⚠️ Erros Comuns

### 1. Não validar parâmetros

```javascript
// RUIM: Aceita valores negativos/inválidos
const page = parseInt(req.query.page);
const limit = parseInt(req.query.limit);

// BOM: Valida e usa defaults
const page = Math.max(1, parseInt(req.query.page) || 1);
const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
```

### 2. Esquecer de limitar o máximo de itens

```javascript
// PERIGOSO: Usuário pode pedir 1 milhão de itens
const limit = parseInt(req.query.limit) || 10;

// SEGURO: Limita a 100 itens
const limit = Math.min(100, parseInt(req.query.limit) || 10);
```

### 3. SQL Injection em busca

```javascript
// VULNERÁVEL: Concatenação direta
where: {
  title: `%${req.query.search}%` // NUNCA FAÇA ISSO!
}

// SEGURO: Usar Op.like
where: {
  title: { [Op.like]: `%${search}%` } // Sequelize escapa automaticamente
}
```

### 4. Não usar findAndCountAll

```javascript
// INEFICIENTE: Duas queries
const posts = await Post.findAll({ limit, offset });
const total = await Post.count();

// EFICIENTE: Uma query com JOIN
const { count, rows } = await Post.findAndCountAll({ limit, offset });
```

## 🎨 Melhorias Avançadas

### 1. Cursor-Based Pagination (para grandes volumes)

```javascript
// Melhor performance que offset para grandes datasets
router.get('/', async (req, res) => {
  const { cursor, limit = 10 } = req.query;
  
  const where = {};
  if (cursor) {
    where.id = { [Op.gt]: cursor }; // Busca IDs maiores que o cursor
  }
  
  const posts = await Post.findAll({
    where,
    order: [['id', 'ASC']],
    limit: parseInt(limit) + 1 // +1 para detectar hasNext
  });
  
  const hasNext = posts.length > limit;
  const data = hasNext ? posts.slice(0, -1) : posts;
  const nextCursor = hasNext ? data[data.length - 1].id : null;
  
  res.json({
    data,
    pagination: {
      nextCursor,
      hasNext
    }
  });
});
```

### 2. Busca Full-Text

```javascript
// Para busca mais avançada, considere:
// - PostgreSQL Full-Text Search
// - ElasticSearch
// - Algolia

// Exemplo PostgreSQL:
where: sequelize.literal(
  "to_tsvector('english', title || ' ' || content) @@ plainto_tsquery('english', :search)",
  { search }
)
```

### 3. Cache de Contagem

```javascript
// Contagem é cara em tabelas grandes
// Cache o total por alguns minutos
const redis = require('redis');
const client = redis.createClient();

const cacheKey = `posts:count:${JSON.stringify(where)}`;
let count = await client.get(cacheKey);

if (!count) {
  count = await Post.count({ where });
  await client.setex(cacheKey, 300, count); // Cache 5 min
}
```

## 🧪 Estratégia de Testes

### Testar Paginação
```javascript
test('deve retornar página correta', async () => {
  const response = await request(app).get('/posts?page=2&limit=5');
  
  expect(response.body.data).toHaveLength(5);
  expect(response.body.pagination.page).toBe(2);
});
```

### Testar Filtros
```javascript
test('deve filtrar por busca', async () => {
  const response = await request(app).get('/posts?search=node');
  
  expect(response.body.data.every(p => 
    p.title.toLowerCase().includes('node')
  )).toBe(true);
});
```

### Testar Metadados
```javascript
test('deve calcular totalPages corretamente', async () => {
  // 25 posts / 10 per page = 3 pages
  const response = await request(app).get('/posts?limit=10');
  
  expect(response.body.pagination.totalPages).toBe(3);
  expect(response.body.pagination.hasNext).toBe(true);
});
```

## 📊 Performance Tips

1. **Índices:** Adicione índices em colunas de busca e ordenação
```javascript
title: {
  type: DataTypes.STRING,
  allowNull: false
},
indexes: [{ fields: ['title'] }]
```

2. **Limite Attributes:** Retorne apenas campos necessários
```javascript
const posts = await Post.findAll({
  attributes: ['id', 'title', 'createdAt'], // Sem 'content' pesado
  limit,
  offset
});
```

3. **Evite Offsets Grandes:** Para grandes datasets, use cursor-based

## 🚀 Próximos Passos

1. **Exercício 17:** Adicionar cache com Redis
2. **Cursor Pagination:** Implementar para melhor performance
3. **Faceted Search:** Adicionar filtros múltiplos (categoria, data, etc.)
4. **ElasticSearch:** Busca full-text avançada

## 📚 Recursos Adicionais

- [Sequelize Querying](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)
- [Offset vs Cursor Pagination](https://blog.appsignal.com/2018/11/20/pagination-techniques.html)
