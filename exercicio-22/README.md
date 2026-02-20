# Exercício 22: Versionamento de API

## 🎯 Objetivo
Implementar versionamento de API para permitir mudanças breaking sem quebrar clientes antigos.

## 📚 Conceitos Abordados
- API versioning strategies
- Backward compatibility
- Deprecation warnings
- Migration path
- Semantic versioning

## 🔧 Tecnologias
- Express.js
- Sequelize

## 📝 Tarefas

### 1. Criar Duas Versões da API

**v1 (antiga):**
```json
GET /api/v1/users
{
  "name": "João Silva",
  "email": "joao@example.com"
}
```

**v2 (nova - breaking changes):**
```json
GET /api/v2/users
{
  "fullName": "João Silva",  // name → fullName
  "emailAddress": "joao@example.com",  // email → emailAddress
  "createdAt": "2024-01-01T10:00:00Z"  // novo campo
}
```

### 2. Implementar Deprecation Warnings em v1
```javascript
res.setHeader('X-API-Warn', 'This API version is deprecated. Please migrate to /api/v2');
```

### 3. Estratégias de Versionamento
- **URL Path:** /api/v1, /api/v2 (recomendado)
- Header: Accept: application/vnd.api.v2+json
- Query param: /api/users?version=2

### 4. Ambas Versões Funcionando
- v1 continua funcionando (backward compatibility)
- v2 com novos campos/estrutura
- Warnings em v1

## 🚀 Como Executar

```bash
npm install
npm test
```

## ✅ Critérios de Aceite
- [ ] v1 e v2 funcionando simultaneamente
- [ ] Deprecation warnings em v1
- [ ] Breaking changes em v2 documentados
- [ ] Backward compatibility mantida
- [ ] Todos os testes passando

## 📖 Recursos
- [API Versioning](https://restfulapi.net/versioning/)
- [Semantic Versioning](https://semver.org/)

## 🎓 Dicas
- Use routers separados para cada versão
- Mantenha v1 funcionando por período de transição
- Documente breaking changes claramente
- Use headers para deprecation warnings
