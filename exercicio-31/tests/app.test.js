const request = require('supertest');
const app = require('../src/server');

describe('CI/CD Advanced Tests', () => {
  test('GET / returns data', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});
