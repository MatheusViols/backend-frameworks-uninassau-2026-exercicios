const request = require('supertest');
const app = require('../src/server');

describe('Heroku Deploy Tests', () => {
  test('GET / returns data', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });

  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
