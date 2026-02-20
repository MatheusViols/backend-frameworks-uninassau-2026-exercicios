const request = require('supertest');
const app = require('../src/server');
const metrics = require('../src/metrics');

describe('Monitoring Tests', () => {
  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body).toHaveProperty('uptime');
  });

  test('GET /metrics returns all metrics', async () => {
    const res = await request(app).get('/metrics');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('memory');
    expect(res.body).toHaveProperty('cpu');
    expect(res.body).toHaveProperty('requests');
  });

  test('GET /metrics/memory returns memory info', async () => {
    const res = await request(app).get('/metrics/memory');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('process');
    expect(res.body).toHaveProperty('system');
  });

  test('GET /metrics/cpu returns CPU info', async () => {
    const res = await request(app).get('/metrics/cpu');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('count');
    expect(res.body).toHaveProperty('loadAverage');
  });

  test('Metrics collector should track requests', async () => {
    const before = metrics.requestCount;
    await request(app).get('/');
    expect(metrics.requestCount).toBeGreaterThan(before);
  });
});
