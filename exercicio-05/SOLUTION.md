# Solução: Exercício 05

## src/server.js
```javascript
const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

app.post('/register',
  body('name').notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
  (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    res.status(201).json({
      message: 'Usuário registrado',
      user: req.body
    });
  }
);

if (require.main === module) {
  app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
}

module.exports = app;
```
