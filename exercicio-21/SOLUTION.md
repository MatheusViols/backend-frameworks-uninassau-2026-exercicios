# Solução: Exercício 21 - API RESTful Completa

## Models

**Author.js**
```javascript
const Author = sequelize.define('Author', {
  name: { type: DataTypes.STRING, allowNull: false },
  bio: DataTypes.TEXT
});
```

**Book.js**
```javascript
const Book = sequelize.define('Book', {
  title: { type: DataTypes.STRING, allowNull: false },
  isbn: { type: DataTypes.STRING, unique: true },
  authorId: DataTypes.INTEGER,
  available: { type: DataTypes.BOOLEAN, defaultValue: true }
});
```

**Loan.js**
```javascript
const Loan = sequelize.define('Loan', {
  bookId: DataTypes.INTEGER,
  borrower: { type: DataTypes.STRING, allowNull: false },
  loanDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  returnDate: DataTypes.DATE
});
```

## Relacionamentos
```javascript
Author.hasMany(Book, { foreignKey: 'authorId' });
Book.belongsTo(Author, { foreignKey: 'authorId' });
Book.hasMany(Loan, { foreignKey: 'bookId' });
Loan.belongsTo(Book, { foreignKey: 'bookId' });
```

## Rotas REST

### Books
```javascript
// GET /books
router.get('/', async (req, res) => {
  const books = await Book.findAll({ include: Author });
  res.json(books);
});

// POST /books
router.post('/', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /books/:id
router.delete('/:id', async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  
  await book.destroy();
  res.status(204).send();
});
```

### Loans
```javascript
// POST /books/:id/loans
router.post('/:id/loans', async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  if (!book.available) return res.status(409).json({ error: 'Book already loaned' });
  
  const loan = await Loan.create({
    bookId: book.id,
    borrower: req.body.borrower
  });
  
  await book.update({ available: false });
  res.status(201).json(loan);
});

// PUT /loans/:id/return
router.put('/:id/return', async (req, res) => {
  const loan = await Loan.findByPk(req.params.id, { include: Book });
  if (!loan) return res.status(404).json({ error: 'Loan not found' });
  if (loan.returnDate) return res.status(409).json({ error: 'Already returned' });
  
  await loan.update({ returnDate: new Date() });
  await loan.Book.update({ available: true });
  
  res.json(loan);
});
```

## 🎯 Princípios REST

1. **Recursos como substantivos:** /books, /authors (não /getBooks)
2. **Verbos HTTP:** GET (ler), POST (criar), PUT (atualizar), DELETE (remover)
3. **Stateless:** Cada request independente
4. **Status codes:** Expressivos e corretos
5. **Relacionamentos:** Sub-recursos quando apropriado

## Status Codes
- 200: OK (GET, PUT)
- 201: Created (POST)
- 204: No Content (DELETE)
- 400: Bad Request
- 404: Not Found
- 409: Conflict

## 📚 Recursos
- [Richardson Maturity Model](https://martinfowler.com/articles/richardsonMaturityModel.html)
- [REST API Tutorial](https://restfulapi.net/)
