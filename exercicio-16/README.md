# Exercício 16: Paginação e Filtros

## 🎯 Objetivo
Implementar paginação offset-based e filtros dinâmicos em endpoints REST para lidar com grandes volumes de dados de forma eficiente.

## 📚 Conceitos Abordados
- Paginação offset-based
- Query parameters
- Filtros dinâmicos
- Ordenação
- Sequelize Op (operators)
- Performance em listagens

## 🔧 Tecnologias
- Express.js
- Sequelize
- Jest + Supertest

## 📝 Tarefas

### 1. Criar Endpoint GET /posts

**Query Parameters:**
- `page` - Número da página (default: 1)
- `limit` - Itens por página (default: 10, max: 100)
- `search` - Buscar no título
- `sort` - Campo para ordenar (title, createdAt)
- `order` - Direção (asc, desc)

**Exemplo de URL:**
```
GET /posts?page=2&limit=20&search=node&sort=createdAt&order=desc
```

### 2. Implementar Filtros

- **Search:** Busca parcial no título (LIKE/ILIKE)
- **Paginação:** offset e limit
- **Ordenação:** Por qualquer campo, ascendente ou descendente

### 3. Formato de Resposta

```json
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 20,
    "total": 150,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": true
  }
}
```

## 🚀 Como Executar

```bash
npm install
npm test
```

## ✅ Critérios de Aceite
- [ ] Paginação funcionando corretamente
- [ ] Filtro de busca implementado
- [ ] Ordenação por múltiplos campos
- [ ] Metadados de paginação corretos
- [ ] Validação de parâmetros
- [ ] Todos os testes passando

## 📖 Recursos
- [Sequelize Pagination](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#limits-and-pagination)
- [Sequelize Operators](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators)

## 🎓 Dicas
- Use `offset = (page - 1) * limit` para calcular offset
- `Op.like` para busca parcial (SQLite usa LIKE, Postgres usa ILIKE)
- `findAndCountAll()` retorna dados + total
- Valide `limit` para evitar sobrecarga (max 100)
