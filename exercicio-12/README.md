# Exercício 12: MongoDB + Mongoose

## Objetivo
Conectar ao MongoDB e implementar CRUD com Mongoose.

## Requisitos
- Conectar ao MongoDB (local ou Atlas)
- Schema Post: { title, content, author, createdAt }
- CRUD completo com Mongoose
- Populate para relacionamentos (author referencia User)

## Dependências
```bash
npm install mongoose
```

## Configuração MongoDB
Crie `.env`:
```
MONGODB_URI=mongodb://localhost:27017/exercicio12
```

Ou use MongoDB Atlas (cloud gratuito).

## Endpoints
- GET /posts
- GET /posts/:id
- POST /posts
- PUT /posts/:id
- DELETE /posts/:id

## Teste
```bash
# Certifique-se de ter MongoDB rodando
npm start
npm test
```
