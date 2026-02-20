const request = require('supertest');

describe('Exercício 02 - Rotas e Controllers', () => {
  let app;

  beforeEach(() => {
    // Limpa o cache de módulos para garantir estado limpo
    jest.resetModules();
    app = require('../src/server');
  });

  describe('POST /products', () => {
    it('deve criar um novo produto', async () => {
      const newProduct = {
        name: 'Notebook',
        price: 2500,
        stock: 10
      };

      const response = await request(app)
        .post('/products')
        .send(newProduct);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Notebook');
      expect(response.body.price).toBe(2500);
      expect(response.body.stock).toBe(10);
    });

    it('deve retornar erro 400 se faltar campo obrigatório', async () => {
      const invalidProduct = {
        name: 'Mouse'
        // faltam price e stock
      };

      const response = await request(app)
        .post('/products')
        .send(invalidProduct);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /products', () => {
    it('deve retornar lista vazia inicialmente', async () => {
      const response = await request(app).get('/products');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('deve retornar todos os produtos criados', async () => {
      // Criar produtos
      await request(app).post('/products').send({ name: 'Produto 1', price: 100, stock: 5 });
      await request(app).post('/products').send({ name: 'Produto 2', price: 200, stock: 10 });

      const response = await request(app).get('/products');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });
  });

  describe('GET /products/:id', () => {
    it('deve retornar produto específico por ID', async () => {
      const createResponse = await request(app)
        .post('/products')
        .send({ name: 'Teclado', price: 150, stock: 20 });

      const productId = createResponse.body.id;

      const response = await request(app).get(`/products/${productId}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(productId);
      expect(response.body.name).toBe('Teclado');
    });

    it('deve retornar 404 para produto inexistente', async () => {
      const response = await request(app).get('/products/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /products/:id', () => {
    it('deve atualizar produto existente', async () => {
      const createResponse = await request(app)
        .post('/products')
        .send({ name: 'Mouse', price: 50, stock: 30 });

      const productId = createResponse.body.id;

      const updatedData = {
        name: 'Mouse Gamer',
        price: 120,
        stock: 25
      };

      const response = await request(app)
        .put(`/products/${productId}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Mouse Gamer');
      expect(response.body.price).toBe(120);
      expect(response.body.stock).toBe(25);
    });

    it('deve retornar 404 ao tentar atualizar produto inexistente', async () => {
      const response = await request(app)
        .put('/products/999')
        .send({ name: 'Teste', price: 100, stock: 5 });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /products/:id', () => {
    it('deve deletar produto existente', async () => {
      const createResponse = await request(app)
        .post('/products')
        .send({ name: 'Webcam', price: 200, stock: 15 });

      const productId = createResponse.body.id;

      const deleteResponse = await request(app).delete(`/products/${productId}`);
      expect(deleteResponse.status).toBe(200);

      // Verificar se foi realmente deletado
      const getResponse = await request(app).get(`/products/${productId}`);
      expect(getResponse.status).toBe(404);
    });

    it('deve retornar 404 ao tentar deletar produto inexistente', async () => {
      const response = await request(app).delete('/products/999');

      expect(response.status).toBe(404);
    });
  });

  describe('Validações', () => {
    it('deve validar tipo de dados do price (deve ser número)', async () => {
      const invalidProduct = {
        name: 'Teste',
        price: 'não é número',
        stock: 10
      };

      const response = await request(app)
        .post('/products')
        .send(invalidProduct);

      expect(response.status).toBe(400);
    });

    it('deve validar tipo de dados do stock (deve ser número)', async () => {
      const invalidProduct = {
        name: 'Teste',
        price: 100,
        stock: 'não é número'
      };

      const response = await request(app)
        .post('/products')
        .send(invalidProduct);

      expect(response.status).toBe(400);
    });
  });
});
