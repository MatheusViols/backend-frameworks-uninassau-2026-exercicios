# Solução: Exercício 19 - Testes de Integração

**src/routes/tasks.js** (Implementação completa no SOLUTION.md)

```javascript
const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

router.get('/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

router.put('/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  
  await task.update(req.body);
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  
  await task.destroy();
  res.status(204).send();
});

module.exports = router;
```

**tests/tasks.test.js**

```javascript
const request = require('supertest');
const app = require('../src/index');
const sequelize = require('../src/config/database');
const Task = require('../src/models/Task');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

beforeEach(async () => {
  await Task.destroy({ where: {}, truncate: true });
});

describe('Task API - Integration Tests', () => {
  describe('POST /tasks', () => {
    test('deve criar tarefa', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({ title: 'Nova Tarefa', description: 'Descrição' })
        .expect(201);

      expect(response.body.title).toBe('Nova Tarefa');
    });

    test('deve retornar 400 para dados inválidos', async () => {
      await request(app)
        .post('/tasks')
        .send({})
        .expect(400);
    });
  });

  describe('GET /tasks', () => {
    test('deve retornar todas as tarefas', async () => {
      await Task.create({ title: 'Tarefa 1' });
      await Task.create({ title: 'Tarefa 2' });

      const response = await request(app)
        .get('/tasks')
        .expect(200);

      expect(response.body).toHaveLength(2);
    });
  });
});
```

## 🎯 Conceitos-Chave

### Setup/Teardown
```javascript
beforeAll(() => {}); // Uma vez antes de TODOS os testes
afterAll(() => {});  // Uma vez depois de TODOS os testes
beforeEach(() => {}); // Antes de CADA teste
afterEach(() => {});  // Depois de CADA teste
```

### Status Codes HTTP
- 200: OK
- 201: Created
- 204: No Content
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## 📚 Recursos
- [HTTP Status Codes](https://httpstatuses.com/)
- [Supertest Documentation](https://github.com/ladjs/supertest)
