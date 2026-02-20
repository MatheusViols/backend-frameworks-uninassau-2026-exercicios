# Solução: Exercício 20 - Swagger Documentation

A solução completa está nos arquivos criados. A estrutura usa:

- **swagger-jsdoc**: Gera spec OpenAPI a partir de anotações JSDoc
- **swagger-ui-express**: Renderiza UI interativo

## Acessar Documentação
```
http://localhost:3000/api-docs
```

## Estrutura de Anotação
```javascript
/**
 * @swagger
 * /endpoint:
 *   method:
 *     summary: Descrição
 *     tags: [Tag]
 *     parameters: [...]
 *     requestBody: {...}
 *     responses:
 *       200:
 *         description: Sucesso
 */
```

## Componentes Reutilizáveis
```javascript
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 */
```

## 📚 Recursos
- [OpenAPI Specification](https://swagger.io/specification/)
- [swagger-jsdoc Examples](https://github.com/Surnet/swagger-jsdoc/tree/master/example)
