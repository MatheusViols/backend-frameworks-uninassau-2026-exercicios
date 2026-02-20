# Exercício 17: Cache com Redis

## 🎯 Objetivo
Implementar cache com Redis para melhorar performance de listagens, reduzindo consultas ao banco de dados.

## 📚 Conceitos Abordados
- Redis como cache
- TTL (Time To Live)
- Cache invalidation
- Cache strategies (Cache-aside)
- Hit vs Miss rate

## 🔧 Tecnologias
- Redis
- ioredis (cliente Node.js)
- Express.js
- Sequelize

## 📝 Tarefas

### 1. Configurar Redis
- Instalar Redis localmente ou usar Docker
- Conectar ao Redis com ioredis

### 2. Implementar Cache de Produtos
- Endpoint GET /products com cache
- TTL de 60 segundos
- Retornar header `X-Cache: HIT` ou `MISS`

### 3. Invalidar Cache
- Ao criar produto (POST): invalidar cache
- Ao atualizar produto (PUT): invalidar cache
- Ao deletar produto (DELETE): invalidar cache

### 4. Estratégia Cache-Aside
1. Verificar se dado está no cache
2. Se SIM: retornar do cache (HIT)
3. Se NÃO: buscar no banco, salvar no cache, retornar (MISS)

## 🚀 Como Executar

```bash
# Instalar Redis
# macOS: brew install redis
# Ubuntu: sudo apt install redis-server
# Docker: docker run -d -p 6379:6379 redis

npm install
npm test
```

## ✅ Critérios de Aceite
- [ ] Cache funcionando corretamente
- [ ] TTL de 60s configurado
- [ ] Invalidação ao criar/atualizar/deletar
- [ ] Headers X-Cache corretos
- [ ] Todos os testes passando

## 📖 Recursos
- [Redis Documentation](https://redis.io/docs/)
- [ioredis](https://github.com/redis/ioredis)

## 🎓 Dicas
- Use `redis.get()` para buscar cache
- Use `redis.setex()` para salvar com TTL
- Use `redis.del()` para invalidar
- JSON.stringify/parse para objetos
