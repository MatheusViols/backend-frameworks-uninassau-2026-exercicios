const request = require('supertest');
const app = require('../src/server');

describe('CI/CD Tests', () => {
  test('GET / deve retornar mensagem', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

  test('GET /health deve retornar ok', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
