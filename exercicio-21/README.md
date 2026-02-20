# Exercício 21: API RESTful Completa

## 🎯 Objetivo
Implementar uma API RESTful completa de biblioteca seguindo princípios REST, status codes corretos e opcionalmente HATEOAS.

## 📚 Conceitos Abordados
- Princípios REST
- Recursos e sub-recursos
- Status codes HTTP corretos
- HATEOAS (opcional)
- Verbos HTTP apropriados
- Relacionamentos na API

## 🔧 Tecnologias
- Express.js
- Sequelize
- Jest + Supertest

## 📝 Tarefas

### 1. Recursos (Resources)
- **Books** (Livros)
- **Authors** (Autores)
- **Loans** (Empréstimos)

### 2. Endpoints REST

**Books:**
- GET /books - Listar livros
- GET /books/:id - Buscar livro
- POST /books - Criar livro
- PUT /books/:id - Atualizar livro
- DELETE /books/:id - Deletar livro

**Authors:**
- GET /authors - Listar autores
- GET /authors/:id - Buscar autor
- GET /authors/:id/books - Livros do autor
- POST /authors - Criar autor
- PUT /authors/:id - Atualizar autor
- DELETE /authors/:id - Deletar autor

**Loans:**
- POST /books/:id/loans - Emprestar livro
- PUT /loans/:id/return - Devolver livro
- GET /loans - Listar empréstimos

### 3. Status Codes Corretos
- 200: GET/PUT bem-sucedido
- 201: POST bem-sucedido (Created)
- 204: DELETE bem-sucedido (No Content)
- 400: Bad Request (validação)
- 404: Not Found
- 409: Conflict (livro já emprestado)
- 422: Unprocessable Entity

### 4. HATEOAS (Opcional)
```json
{
  "id": 1,
  "title": "Clean Code",
  "_links": {
    "self": { "href": "/books/1" },
    "author": { "href": "/authors/5" },
    "loan": { "href": "/books/1/loans" }
  }
}
```

## 🚀 Como Executar

```bash
npm install
npm test
```

## ✅ Critérios de Aceite
- [ ] Todos os recursos implementados
- [ ] Relacionamentos funcionando
- [ ] Status codes corretos
- [ ] Validações apropriadas
- [ ] Princípios REST seguidos
- [ ] Todos os testes passando

## 📖 Recursos
- [REST API Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)

## 🎓 Dicas
- Use substantivos nos endpoints, não verbos
- Plural para coleções (/books, não /book)
- Relacionamentos aninhados quando faz sentido
- Validar antes de processar
