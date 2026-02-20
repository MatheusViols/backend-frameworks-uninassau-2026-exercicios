# Solução Completa: Exercício 17 - Cache com Redis

## Implementação

**src/config/redis.js**
```javascript
const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  retryStrategy: (times) => Math.min(times * 50, 2000)
});

module.exports = redis;
```

**src/services/productService.js**
```javascript
const redis = require('../config/redis');
const Product = require('../models/Product');

const CACHE_KEY = 'products:all';
const CACHE_TTL = 60;

class ProductService {
  async getAllProducts() {
    // 1. Tentar buscar do cache
    const cached = await redis.get(CACHE_KEY);
    
    if (cached) {
      // Cache HIT
      return {
        data: JSON.parse(cached),
        cached: true
      };
    }

    // Cache MISS - buscar do banco
    const products = await Product.findAll();

    // Salvar no cache com TTL
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(products));

    return {
      data: products,
      cached: false
    };
  }

  async createProduct(data) {
    const product = await Product.create(data);
    await this.invalidateCache();
    return product;
  }

  async updateProduct(id, data) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    
    await product.update(data);
    await this.invalidateCache();
    return product;
  }

  async deleteProduct(id) {
    const product = await Product.findByPk(id);
    if (!product) return false;
    
    await product.destroy();
    await this.invalidateCache();
    return true;
  }

  async invalidateCache() {
    await redis.del(CACHE_KEY);
  }
}

module.exports = new ProductService();
```

## 🎯 Conceitos-Chave

### Cache-Aside Pattern
```
1. Request → 2. Check Cache → 3a. HIT: Return cached data
                           ↓
                     3b. MISS: Query DB → Save to Cache → Return data
```

### TTL (Time To Live)
```javascript
// Expira após 60 segundos
await redis.setex(key, 60, value);

// Verificar TTL restante
const ttl = await redis.ttl(key); // Retorna segundos
```

### Cache Invalidation
```javascript
// Estratégias:
// 1. Time-based: TTL automático
// 2. Event-based: Invalidar ao modificar dados
// 3. Manual: Endpoint para limpar cache

// Invalidar chave específica
await redis.del('products:all');

// Invalidar por padrão
await redis.del(await redis.keys('products:*'));
```

## ⚠️ Erros Comuns

1. **Esquecer de serializar objetos**
```javascript
// ERRADO
await redis.set(key, products); // [object Object]

// CERTO
await redis.set(key, JSON.stringify(products));
```

2. **Não invalidar cache**
```javascript
// Dados ficam desatualizados!
await Product.create(data); // Esqueceu de invalidar
```

3. **Cache em cascata**
```javascript
// Pode causar thundering herd
// Use lock ou TTL aleatório
```

## 📚 Recursos
- [Redis Commands](https://redis.io/commands/)
- [Cache Patterns](https://docs.aws.amazon.com/whitepapers/latest/database-caching-strategies-using-redis/caching-patterns.html)
