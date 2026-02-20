# Exercício 20: Documentação com Swagger

## 🎯 Objetivo
Documentar API REST automaticamente usando Swagger/OpenAPI com anotações JSDoc.

## 📚 Conceitos Abordados
- OpenAPI/Swagger
- JSDoc annotations
- Swagger UI
- API specification
- Schemas e responses

## 🔧 Tecnologias
- swagger-jsdoc
- swagger-ui-express
- Express.js

## 📝 Tarefas

### 1. Configurar Swagger
- Instalar dependências
- Criar configuração swagger-jsdoc
- Montar Swagger UI em /api-docs

### 2. Documentar Rotas com JSDoc
```javascript
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
```

### 3. Definir Schemas
- Schema User
- Schema Error
- Respostas para cada endpoint

### 4. Acessar Documentação
- GET /api-docs - Swagger UI interativo
- GET /api-docs.json - Spec OpenAPI

## 🚀 Como Executar

```bash
npm install
npm start
# Abrir http://localhost:3000/api-docs
```

## ✅ Critérios de Aceite
- [ ] Swagger UI acessível em /api-docs
- [ ] Todas as rotas documentadas
- [ ] Schemas definidos
- [ ] Exemplos de requests/responses
- [ ] Documentação completa e clara

## 📖 Recursos
- [Swagger/OpenAPI](https://swagger.io/specification/)
- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)

## 🎓 Dicas
- Use @swagger para anotar rotas
- Defina components/schemas reutilizáveis
- Inclua exemplos de payload
- Documente validações e erros
