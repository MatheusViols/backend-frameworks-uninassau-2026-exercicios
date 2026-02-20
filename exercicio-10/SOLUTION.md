# Solução: Exercício 10 - RBAC

## src/middlewares/authorize.js
```javascript
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Não autenticado' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Sem permissão para esta ação' });
    }
    
    next();
  };
}

module.exports = authorize;
```

Uso no server.js:
```javascript
const authJWT = require('./middlewares/authJWT');
const authorize = require('./middlewares/authorize');

// Apenas admin pode deletar
app.delete('/users/:id', authJWT, authorize('admin'), (req, res) => {
  // lógica de deletar
});

// Ambos podem acessar
app.get('/profile', authJWT, authorize('admin', 'user'), (req, res) => {
  // lógica
});
```
