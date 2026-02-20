# Solução: Exercício 26 - Rate Limiting & Segurança

## 📝 Implementação Completa

### src/server.js

```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const { body, query, validationResult } = require('express-validator');

const app = express();

// Configurar Helmet para headers de segurança
app.use(helmet());

// Configurar CORS - apenas origens permitidas
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));

// Middleware para JSON
app.use(express.json());

// Configurar Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo de 100 requisições por windowMs
  message: {
    error: 'Muitas requisições deste IP, tente novamente mais tarde.'
  },
  standardHeaders: true, // Retorna info no header `RateLimit-*`
  legacyHeaders: false, // Desabilita headers `X-RateLimit-*`
});

// Aplicar rate limiter em todas as rotas
app.use(limiter);

// Rotas
app.get('/', (req, res) => {
  res.json({ message: 'API segura funcionando!' });
});

// Rota POST /api/users com validação completa
app.post('/api/users', [
  body('name')
    .notEmpty().withMessage('Nome é obrigatório')
    .trim()
    .escape()
    .isLength({ min: 2, max: 100 }).withMessage('Nome deve ter entre 2 e 100 caracteres'),
  
  body('email')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),
  
  body('age')
    .isInt({ min: 18, max: 120 }).withMessage('Idade deve ser entre 18 e 120')
    .toInt()
], (req, res) => {
  // Verificar erros de validação
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Retornar usuário criado (já sanitizado)
  res.status(201).json({
    message: 'Usuário criado com sucesso',
    user: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    }
  });
});

// Rota GET /api/search com proteção XSS
app.get('/api/search', [
  query('q')
    .optional()
    .trim()
    .escape()
], (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const query = req.query.q || '';
  
  res.json({
    query,
    results: [],
    message: 'Busca realizada com sucesso'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    security: {
      helmet: true,
      cors: true,
      rateLimit: true,
      validation: true
    }
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
```

### tests/security.test.js

```javascript
const request = require('supertest');
const app = require('../src/server');

describe('Security & Rate Limiting Tests', () => {
  
  describe('Helmet Headers', () => {
    test('Deve incluir headers de segurança', async () => {
      const response = await request(app).get('/');
      
      // Helmet adiciona vários headers de segurança
      expect(response.headers).toHaveProperty('x-content-type-options', 'nosniff');
      expect(response.headers).toHaveProperty('x-frame-options');
      expect(response.headers).not.toHaveProperty('x-powered-by'); // Express header removido
    });
  });

  describe('CORS', () => {
    test('Deve permitir origem permitida', async () => {
      const response = await request(app)
        .get('/')
        .set('Origin', 'http://localhost:3000');
      
      expect(response.headers['access-control-allow-origin']).toBe('http://localhost:3000');
    });

    test('Deve bloquear origem não permitida', async () => {
      const response = await request(app)
        .get('/')
        .set('Origin', 'http://malicious-site.com');
      
      // CORS não deve retornar header para origem não permitida
      expect(response.headers['access-control-allow-origin']).toBeUndefined();
    });
  });

  describe('Rate Limiting', () => {
    test('Deve permitir requisições dentro do limite', async () => {
      for (let i = 0; i < 10; i++) {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
      }
    });

    test('Deve incluir headers de rate limit', async () => {
      const response = await request(app).get('/');
      
      expect(response.headers).toHaveProperty('ratelimit-limit');
      expect(response.headers).toHaveProperty('ratelimit-remaining');
      expect(response.headers).toHaveProperty('ratelimit-reset');
    });

    // Nota: Teste de bloqueio após 100 requisições seria muito lento
    // Em produção, considere criar um rate limiter específico para testes
  });

  describe('Validação de Input', () => {
    test('Deve aceitar dados válidos', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          name: 'João Silva',
          email: 'joao@example.com',
          age: 25
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message');
      expect(response.body.user).toHaveProperty('name', 'João Silva');
      expect(response.body.user).toHaveProperty('email', 'joao@example.com');
      expect(response.body.user).toHaveProperty('age', 25);
    });

    test('Deve rejeitar email inválido', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          name: 'João Silva',
          email: 'email-invalido',
          age: 25
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors[0].msg).toContain('Email');
    });

    test('Deve rejeitar idade fora do range', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          name: 'João Silva',
          email: 'joao@example.com',
          age: 15
        });

      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toContain('18');
    });

    test('Deve rejeitar idade acima de 120', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          name: 'João Silva',
          email: 'joao@example.com',
          age: 150
        });

      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toContain('120');
    });

    test('Deve sanitizar HTML/scripts no nome', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          name: '<script>alert("xss")</script>João',
          email: 'joao@example.com',
          age: 25
        });

      expect(response.status).toBe(201);
      // escape() converte < para &lt; e > para &gt;
      expect(response.body.user.name).not.toContain('<script>');
      expect(response.body.user.name).not.toContain('</script>');
    });

    test('Deve rejeitar nome vazio', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          name: '',
          email: 'joao@example.com',
          age: 25
        });

      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toContain('obrigatório');
    });
  });

  describe('XSS Protection', () => {
    test('Deve sanitizar query params', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ q: '<script>alert("xss")</script>' });

      expect(response.status).toBe(200);
      expect(response.body.query).not.toContain('<script>');
      expect(response.body.query).not.toContain('</script>');
    });

    test('Deve permitir busca normal', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ q: 'nodejs tutorial' });

      expect(response.status).toBe(200);
      expect(response.body.query).toBe('nodejs tutorial');
    });
  });

  describe('Health Check', () => {
    test('Deve retornar status de segurança', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body.security).toEqual({
        helmet: true,
        cors: true,
        rateLimit: true,
        validation: true
      });
    });
  });
});
```

## 🎓 Conceitos Aplicados

### 1. **Helmet - Headers de Segurança**
```javascript
app.use(helmet());
// Configura automaticamente vários headers:
// - X-Content-Type-Options: nosniff
// - X-Frame-Options: DENY
// - X-Download-Options: noopen
// - Remove X-Powered-By
```

### 2. **CORS - Cross-Origin Resource Sharing**
```javascript
const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true
};
app.use(cors(corsOptions));
```

### 3. **Rate Limiting**
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true
});
```

### 4. **Validação e Sanitização**
```javascript
body('name').trim().escape()
body('email').isEmail().normalizeEmail()
query('q').trim().escape()
```

## 🔒 Camadas de Segurança

1. **Headers** (Helmet)
2. **CORS** (Origens permitidas)
3. **Rate Limiting** (Prevenção de DDoS)
4. **Validação** (Dados corretos)
5. **Sanitização** (Prevenção XSS)

## 🚀 Melhorias Possíveis

1. **Rate Limiting por Rota**: Limites diferentes para endpoints
2. **IP Whitelist**: Permitir IPs específicos sem limite
3. **JWT Rate Limit**: Limitar por usuário autenticado
4. **Redis Store**: Compartilhar limites entre servidores
5. **CSP**: Content Security Policy headers
6. **Input Schema**: JSON Schema validation
7. **SQL Injection**: Prepared statements (se usar DB)

## 📚 Recursos Adicionais

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Helmet.js](https://helmetjs.github.io/)
