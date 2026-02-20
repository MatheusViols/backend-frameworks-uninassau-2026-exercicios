const request = require('supertest');
const app = require('../../src/app');

describe('E-commerce API - Basic Tests', () => {
  test('GET / returns API info', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('endpoints');
  });

  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

// TODO: Implementar testes completos para:
// - Auth (register, login, JWT)
// - Products (CRUD, filters)
// - Cart (add, update, remove)
// - Orders (create, list, status)
