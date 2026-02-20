const request = require('supertest');

describe('Exercício 05 - Express Validator', () => {
  let app;

  beforeAll(() => {
    app = require('../src/server');
  });

  it('deve aceitar dados válidos', async () => {
    const response = await request(app)
      .post('/register')
      .send({ name: 'João', email: 'joao@email.com', password: 'senha123' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
  });

  it('deve rejeitar email inválido', async () => {
    const response = await request(app)
      .post('/register')
      .send({ name: 'João', email: 'invalido', password: 'senha123' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  it('deve rejeitar senha curta', async () => {
    const response = await request(app)
      .post('/register')
      .send({ name: 'João', email: 'joao@email.com', password: '123' });

    expect(response.status).toBe(400);
  });

  it('deve rejeitar campos ausentes', async () => {
    const response = await request(app)
      .post('/register')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
});
