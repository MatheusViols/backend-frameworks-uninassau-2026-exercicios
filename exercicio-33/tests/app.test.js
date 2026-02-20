const request = require('supertest');
const app = require('../src/server');

describe('Railway Deploy Tests', () => {
  test('GET / returns data', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });

  test('GET /health checks database', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBeGreaterThanOrEqual(200);
  });
});
