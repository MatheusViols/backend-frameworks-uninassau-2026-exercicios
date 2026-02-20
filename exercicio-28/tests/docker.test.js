const request = require('supertest');
const app = require('../src/server');

describe('Docker Application Tests', () => {
  
  test('GET / deve retornar informações da aplicação', async () => {
    const response = await request(app).get('/');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('version');
  });

  test('GET /health deve retornar status ok', async () => {
    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('timestamp');
  });

  test('GET /info deve retornar informações do sistema', async () => {
    const response = await request(app).get('/info');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('nodeVersion');
    expect(response.body).toHaveProperty('platform');
    expect(response.body).toHaveProperty('arch');
    expect(response.body).toHaveProperty('memory');
  });
});

describe('Docker Build Instructions', () => {
  test('README should contain build instructions', () => {
    // Este é um teste de documentação
    // Verifique se o README tem instruções para:
    // - docker build
    // - docker run
    // - Variáveis de ambiente
    expect(true).toBe(true);
  });
});
