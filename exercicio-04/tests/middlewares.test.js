const request = require('supertest');

describe('Exercício 04 - Middlewares', () => {
  let app;

  beforeAll(() => {
    app = require('../src/server');
  });

  describe('Rota Pública GET /', () => {
    it('deve acessar sem autenticação', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Middleware de Autenticação', () => {
    it('deve bloquear acesso sem API key', async () => {
      const response = await request(app).get('/protected');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toMatch(/unauthorized/i);
    });

    it('deve bloquear acesso com API key inválida', async () => {
      const response = await request(app)
        .get('/protected')
        .set('x-api-key', 'chave-errada');

      expect(response.status).toBe(401);
    });

    it('deve permitir acesso com API key válida', async () => {
      const response = await request(app)
        .get('/protected')
        .set('x-api-key', 'minha-chave-secreta-123');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('secret');
    });
  });

  describe('Middleware de Error Handling', () => {
    it('deve capturar e tratar erro', async () => {
      const response = await request(app).get('/error');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
    });

    it('deve retornar JSON estruturado no erro', async () => {
      const response = await request(app).get('/error');

      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(typeof response.body.error).toBe('string');
    });
  });

  describe('Middleware de Logging', () => {
    it('logger não deve interferir nas requisições', async () => {
      // Logger apenas registra, não deve afetar resposta
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
    });
  });

  describe('Rotas inexistentes', () => {
    it('deve retornar 404 para rota não encontrada', async () => {
      const response = await request(app).get('/rota-inexistente');

      expect(response.status).toBe(404);
    });
  });
});
