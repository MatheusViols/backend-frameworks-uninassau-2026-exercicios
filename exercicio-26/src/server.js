const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const { body, validationResult } = require('express-validator');

const app = express();

// TODO: Configurar Helmet
// Adicione helmet() ao app

// TODO: Configurar CORS
// Permitir apenas origens específicas:
// - http://localhost:3000
// - http://localhost:3001

// Middleware para JSON
app.use(express.json());

// TODO: Configurar Rate Limiter
// windowMs: 15 minutos
// max: 100 requisições
// message: mensagem customizada
// standardHeaders: true
// legacyHeaders: false

// Rotas
app.get('/', (req, res) => {
  res.json({ message: 'API segura funcionando!' });
});

// TODO: Rota POST /api/users com validação
// Validar e sanitizar:
// - name: não vazio, trim, escape
// - email: email válido, normalizeEmail
// - age: número inteiro, min 18, max 120

app.post('/api/users', [
  // Adicionar validações aqui
], (req, res) => {
  // TODO: Verificar erros de validação
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // TODO: Retornar usuário criado (sanitizado)
  res.status(201).json({
    message: 'Usuário criado com sucesso',
    user: req.body
  });
});

// TODO: Rota GET /api/search com proteção XSS
// Query param: q (search query)
// Sanitizar antes de usar

app.get('/api/search', (req, res) => {
  // TODO: Sanitizar query
  const query = req.query.q || '';
  
  res.json({
    query,
    results: []
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
