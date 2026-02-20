# Solução: Exercício 04 - Middlewares

## src/middlewares/logger.js
```javascript
function logger(req, res, next) {
  const start = Date.now();
  const timestamp = new Date().toISOString();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${timestamp}] ${req.method} ${req.url} - ${duration}ms`);
  });
  
  next();
}

module.exports = logger;
```

## src/middlewares/auth.js
```javascript
const API_KEY = 'minha-chave-secreta-123';

function auth(req, res, next) {
  const apiKey = req.get('x-api-key');
  
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
}

module.exports = auth;
```

## src/middlewares/errorHandler.js
```javascript
function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  
  const response = {
    error: err.message || 'Internal Server Error'
  };
  
  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }
  
  res.status(status).json(response);
}

module.exports = errorHandler;
```

## src/server.js
```javascript
const express = require('express');
const logger = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.json({ message: 'Home pública' });
});

app.get('/protected', auth, (req, res) => {
  res.json({ message: 'Área protegida', secret: 'dados secretos' });
});

app.get('/error', (req, res) => {
  throw new Error('Erro proposital');
});

app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;
```

## Conceitos Principais

### Ordem dos Middlewares
A ordem importa! Express executa middlewares na ordem que foram definidos:
1. Logger (primeiro - registra tudo)
2. Rotas
3. Error handler (último - captura erros)

### Middleware com 3 parâmetros
```javascript
function middleware(req, res, next) { }
```

### Error Handler com 4 parâmetros
```javascript
function errorHandler(err, req, res, next) { }
```
Express identifica pela assinatura de 4 parâmetros!
