const request = require('supertest');

describe('Exercício 01 - Primeiro Servidor Express', () => {
  let app;

  beforeAll(() => {
    // Importa a aplicação
    app = require('../src/server');
  });

  describe('GET /', () => {
    it('deve retornar "Hello World"', async () => {
      const response = await request(app).get('/');
      
      expect(response.status).toBe(200);
      expect(response.text).toBe('Hello World');
    });
  });

  describe('GET /health', () => {
    it('deve retornar JSON com status ok', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: 'ok' });
    });

    it('deve retornar Content-Type application/json', async () => {
      const response = await request(app).get('/health');
      
      expect(response.headers['content-type']).toMatch(/application\/json/);
    });
  });

  describe('Rotas não existentes', () => {
    it('deve retornar 404 para rota inexistente', async () => {
      const response = await request(app).get('/rota-nao-existe');
      
      expect(response.status).toBe(404);
    });
  });
});
