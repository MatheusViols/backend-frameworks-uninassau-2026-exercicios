# Solução: Exercício 09 - JWT

## src/controllers/AuthController.js
```javascript
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = 'meu-super-secret-key-2026';
let users = [];
let nextId = 1;

class AuthController {
  async register(req, res) {
    const { email, password } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: nextId++, email, password: hashedPassword };
    users.push(user);
    
    res.status(201).json({ message: 'Usuário criado', userId: user.id });
  }

  async login(req, res) {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Credenciais inválidas' });
    
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
    
    res.json({ token });
  }

  profile(req, res) {
    res.json({ user: req.user });
  }
}

module.exports = new AuthController();
```

## src/middlewares/authJWT.js
```javascript
const jwt = require('jsonwebtoken');
const SECRET = 'meu-super-secret-key-2026';

function authJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  
  const token = authHeader.split(' ')[1]; // Bearer TOKEN
  
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = authJWT;
```

## src/server.js
```javascript
const express = require('express');
const AuthController = require('./controllers/AuthController');
const authJWT = require('./middlewares/authJWT');

const app = express();
app.use(express.json());

app.post('/register', AuthController.register);
app.post('/login', AuthController.login);
app.get('/profile', authJWT, AuthController.profile);

if (require.main === module) {
  app.listen(3000, () => console.log('Servidor na porta 3000'));
}

module.exports = app;
```
