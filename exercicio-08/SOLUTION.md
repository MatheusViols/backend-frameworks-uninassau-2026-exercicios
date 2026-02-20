# Solução: Exercício 08

## src/models/Book.js
```javascript
let books = [];
let nextId = 1;

class Book {
  static validate(data) {
    const errors = [];
    if (!data.title) errors.push('Título é obrigatório');
    if (!data.author) errors.push('Autor é obrigatório');
    if (data.year && (data.year < 1000 || data.year > 2100)) {
      errors.push('Ano inválido');
    }
    return errors;
  }

  static findAll() { return books; }
  
  static findById(id) { return books.find(b => b.id === id) || null; }
  
  static create(data) {
    const errors = this.validate(data);
    if (errors.length > 0) return { valid: false, errors };
    
    const book = { id: nextId++, ...data };
    books.push(book);
    return { valid: true, book };
  }
  
  static update(id, data) {
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return { valid: false, errors: ['Livro não encontrado'] };
    
    const errors = this.validate(data);
    if (errors.length > 0) return { valid: false, errors };
    
    books[index] = { id, ...data };
    return { valid: true, book: books[index] };
  }
  
  static delete(id) {
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return false;
    books.splice(index, 1);
    return true;
  }
}

module.exports = Book;
```

## src/controllers/BookController.js
```javascript
const Book = require('../models/Book');

class BookController {
  index(req, res) {
    res.json(Book.findAll());
  }

  show(req, res) {
    const book = Book.findById(parseInt(req.params.id));
    if (!book) return res.status(404).json({ error: 'Livro não encontrado' });
    res.json(book);
  }

  store(req, res) {
    const result = Book.create(req.body);
    if (!result.valid) return res.status(400).json({ errors: result.errors });
    res.status(201).json(result.book);
  }

  update(req, res) {
    const result = Book.update(parseInt(req.params.id), req.body);
    if (!result.valid) {
      const status = result.errors.includes('Livro não encontrado') ? 404 : 400;
      return res.status(status).json({ errors: result.errors });
    }
    res.json(result.book);
  }

  destroy(req, res) {
    const deleted = Book.delete(parseInt(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Livro não encontrado' });
    res.json({ message: 'Livro deletado' });
  }
}

module.exports = new BookController();
```

## src/server.js
```javascript
const express = require('express');
const BookController = require('./controllers/BookController');

const app = express();
app.use(express.json());

app.get('/books', BookController.index);
app.get('/books/:id', BookController.show);
app.post('/books', BookController.store);
app.put('/books/:id', BookController.update);
app.delete('/books/:id', BookController.destroy);

if (require.main === module) {
  app.listen(3000, () => console.log('Servidor na porta 3000'));
}

module.exports = app;
```
