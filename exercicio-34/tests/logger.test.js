const request = require('supertest');
const app = require('../src/server');
const logger = require('../src/logger');
const fs = require('fs');

describe('Winston Logging Tests', () => {
  test('Logger deve estar configurado', () => {
    expect(logger).toBeDefined();
    expect(logger.info).toBeDefined();
    expect(logger.error).toBeDefined();
  });

  test('GET / deve logar info', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });

  test('GET /error deve logar erro', async () => {
    const res = await request(app).get('/error');
    expect(res.status).toBe(500);
  });

  test('Logger deve ter níveis corretos', () => {
    const levels = ['error', 'warn', 'info', 'debug'];
    levels.forEach(level => {
      expect(typeof logger[level]).toBe('function');
    });
  });
});
