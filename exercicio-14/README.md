# Exercício 14: Relacionamentos 1:N e N:M

## 🎯 Objetivo
Aprender a criar e trabalhar com relacionamentos entre models no Sequelize, incluindo relacionamentos um-para-muitos (1:N) e muitos-para-muitos (N:M).

## 📚 Conceitos Abordados
- Relacionamento 1:N (Um para Muitos) - hasMany/belongsTo
- Relacionamento N:M (Muitos para Muitos) - belongsToMany
- Eager Loading (include)
- Lazy Loading
- Tabelas de junção (junction tables)
- Queries com associações

## 🔧 Tecnologias
- Sequelize
- SQLite
- Jest

## 📝 Tarefas

### 1. Criar Models com Relacionamentos

**User hasMany Posts (1:N)**
- Um usuário pode ter vários posts
- Um post pertence a um usuário
- Chave estrangeira `userId` em Post

**Post belongsToMany Tags (N:M)**
- Um post pode ter várias tags
- Uma tag pode estar em vários posts
- Tabela de junção `PostTags`

### 2. Estrutura dos Models

**User**
- id, name, email

**Post**
- id, title, content, userId (FK)

**Tag**
- id, name

**PostTags** (tabela de junção automática)
- postId, tagId

### 3. Implementar Queries

**Eager Loading:**
- Buscar usuário com todos os seus posts
- Buscar post com usuário e tags
- Queries aninhadas (user → posts → tags)

**Lazy Loading:**
- Buscar usuário primeiro
- Buscar posts do usuário depois
- Comparar performance

### 4. Operações com Relacionamentos
- Criar post associado a usuário
- Adicionar tags a um post
- Remover tag de um post
- Listar posts com suas tags
- Contar posts por usuário

## 🚀 Como Executar

```bash
npm install
npm test
```

## ✅ Critérios de Aceite
- [ ] Relacionamento 1:N (User → Posts) funcionando
- [ ] Relacionamento N:M (Posts ↔ Tags) funcionando
- [ ] Eager loading com `include` implementado
- [ ] Lazy loading implementado e comparado
- [ ] Queries aninhadas funcionando
- [ ] Todos os testes passando

## 📖 Recursos
- [Sequelize Associations](https://sequelize.org/docs/v6/core-concepts/assocs/)
- [Eager Loading](https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/)

## 🎓 Dicas
- Use `hasMany` e `belongsTo` para 1:N
- Use `belongsToMany` com `through` para N:M
- `include` carrega relacionamentos de uma vez (eager)
- `.getPosts()` carrega sob demanda (lazy)
- Cuidado com N+1 problem - use eager loading quando possível
