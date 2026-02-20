# Solução: Exercício 07

## src/server.js
```javascript
const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

let products = [];
let nextId = 1;

app.get('/', (req, res) => {
  res.render('index', { products });
});

app.get('/create', (req, res) => {
  res.render('create');
});

app.post('/products', (req, res) => {
  const { name, price } = req.body;
  products.push({ id: nextId++, name, price: parseFloat(price) });
  res.redirect('/');
});

if (require.main === module) {
  app.listen(3000, () => console.log('Servidor na porta 3000'));
}

module.exports = app;
```

Views: header.ejs, footer.ejs, index.ejs, create.ejs (já criados)
