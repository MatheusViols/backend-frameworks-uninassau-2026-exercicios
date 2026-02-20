# Solução: Exercício 22 - Versionamento de API

**src/v1/users.js (v1 - deprecated)**
```javascript
const express = require('express');
const router = express.Router();

// Middleware de deprecation warning
router.use((req, res, next) => {
  res.setHeader('X-API-Warn', 'v1 is deprecated. Migrate to /api/v2 by 2025-12-31');
  res.setHeader('X-API-Sunset', '2025-12-31');
  next();
});

router.get('/', (req, res) => {
  // Formato antigo
  const users = [
    { id: 1, name: 'João Silva', email: 'joao@example.com' }
  ];
  res.json(users);
});

module.exports = router;
```

**src/v2/users.js (v2 - nova versão)**
```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Formato novo com breaking changes
  const users = [
    {
      id: 1,
      fullName: 'João Silva',  // name → fullName
      emailAddress: 'joao@example.com',  // email → emailAddress
      createdAt: new Date().toISOString()  // novo campo
    }
  ];
  res.json(users);
});

module.exports = router;
```

**src/index.js**
```javascript
const express = require('express');
const v1Users = require('./v1/users');
const v2Users = require('./v2/users');

const app = express();
app.use(express.json());

// Montar versões
app.use('/api/v1/users', v1Users);
app.use('/api/v2/users', v2Users);

// Redirecionar /api/users para versão mais recente
app.use('/api/users', v2Users);

module.exports = app;
```

## 🎯 Estratégias de Versionamento

### 1. URL Path (Recomendado)
```
/api/v1/users
/api/v2/users
```
**Prós:** Claro, simples, cacheable
**Contras:** Duplicação de código

### 2. Header
```
GET /api/users
Accept: application/vnd.api.v2+json
```
**Prós:** URL limpa
**Contras:** Menos visível

### 3. Query Parameter
```
/api/users?version=2
```
**Prós:** Fácil de testar
**Contras:** Pode poluir URLs

## Deprecation Strategy

```javascript
// Headers de deprecation
'X-API-Warn': 'v1 deprecated'
'X-API-Sunset': '2025-12-31'  // Data de remoção
'X-API-Migration': 'https://docs.api.com/migration'
```

## Breaking Changes

Documentar claramente:
```markdown
## v2 Breaking Changes
- `name` → `fullName`
- `email` → `emailAddress`
- Novo campo: `createdAt`
```

## 📚 Recursos
- [API Evolution Patterns](https://nordicapis.com/api-evolution-patterns/)
- [Sunset HTTP Header](https://datatracker.ietf.org/doc/html/rfc8594)
