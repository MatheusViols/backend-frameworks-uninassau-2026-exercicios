const request = require('supertest');
const app = require('../src/index');
const sequelize = require('../src/config/database');
const Post = require('../src/models/Post');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

beforeEach(async () => {
  await Post.destroy({ where: {}, truncate: true });
});

describe('GET /posts - Paginação e Filtros', () => {
  beforeEach(async () => {
    // Criar posts de teste
    for (let i = 1; i <= 25; i++) {
      await Post.create({
        title: `Post ${i}`,
        content: `Conteúdo do post ${i}`,
        author: i % 2 === 0 ? 'João' : 'Maria'
      });
    }
  });

  describe('Paginação básica', () => {
    test('deve retornar primeira página com 10 itens (default)', async () => {
      const response = await request(app)
        .get('/posts')
        .expect(200);

      expect(response.body.data).toHaveLength(10);
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(10);
      expect(response.body.pagination.total).toBe(25);
      expect(response.body.pagination.totalPages).toBe(3);
    });

    test('deve retornar página 2', async () => {
      const response = await request(app)
        .get('/posts?page=2')
        .expect(200);

      expect(response.body.pagination.page).toBe(2);
      expect(response.body.data).toHaveLength(10);
    });

    test('deve respeitar limit customizado', async () => {
      const response = await request(app)
        .get('/posts?limit=5')
        .expect(200);

      expect(response.body.data).toHaveLength(5);
      expect(response.body.pagination.limit).toBe(5);
    });

    test('deve calcular totalPages corretamente', async () => {
      const response = await request(app)
        .get('/posts?limit=10')
        .expect(200);

      expect(response.body.pagination.totalPages).toBe(3); // 25 / 10 = 3
    });

    test('deve indicar se há próxima página', async () => {
      const page1 = await request(app).get('/posts?page=1&limit=10');
      expect(page1.body.pagination.hasNext).toBe(true);
      expect(page1.body.pagination.hasPrev).toBe(false);

      const page2 = await request(app).get('/posts?page=2&limit=10');
      expect(page2.body.pagination.hasNext).toBe(true);
      expect(page2.body.pagination.hasPrev).toBe(true);

      const page3 = await request(app).get('/posts?page=3&limit=10');
      expect(page3.body.pagination.hasNext).toBe(false);
      expect(page3.body.pagination.hasPrev).toBe(true);
    });
  });

  describe('Filtro de busca', () => {
    beforeEach(async () => {
      await Post.destroy({ where: {}, truncate: true });
      await Post.create({ title: 'Node.js Tutorial', content: 'Conteúdo', author: 'João' });
      await Post.create({ title: 'React Basics', content: 'Conteúdo', author: 'Maria' });
      await Post.create({ title: 'Node.js Advanced', content: 'Conteúdo', author: 'Pedro' });
    });

    test('deve filtrar por título (busca parcial)', async () => {
      const response = await request(app)
        .get('/posts?search=node')
        .expect(200);

      expect(response.body.data).toHaveLength(2);
      expect(response.body.data.every(p => p.title.toLowerCase().includes('node'))).toBe(true);
    });

    test('deve ser case-insensitive', async () => {
      const response = await request(app)
        .get('/posts?search=NODE')
        .expect(200);

      expect(response.body.data).toHaveLength(2);
    });

    test('deve retornar vazio se não encontrar', async () => {
      const response = await request(app)
        .get('/posts?search=python')
        .expect(200);

      expect(response.body.data).toHaveLength(0);
    });
  });

  describe('Ordenação', () => {
    test('deve ordenar por título ascendente', async () => {
      const response = await request(app)
        .get('/posts?sort=title&order=asc')
        .expect(200);

      const titles = response.body.data.map(p => p.title);
      const sortedTitles = [...titles].sort();
      expect(titles).toEqual(sortedTitles);
    });

    test('deve ordenar por título descendente', async () => {
      const response = await request(app)
        .get('/posts?sort=title&order=desc')
        .expect(200);

      const titles = response.body.data.map(p => p.title);
      const sortedTitles = [...titles].sort().reverse();
      expect(titles).toEqual(sortedTitles);
    });

    test('deve ordenar por createdAt (default: desc)', async () => {
      const response = await request(app)
        .get('/posts?sort=createdAt&order=desc')
        .expect(200);

      const dates = response.body.data.map(p => new Date(p.createdAt));
      
      for (let i = 1; i < dates.length; i++) {
        expect(dates[i-1] >= dates[i]).toBe(true);
      }
    });
  });

  describe('Combinação de filtros', () => {
    test('deve aplicar busca + paginação + ordenação', async () => {
      // Criar posts específicos
      await Post.destroy({ where: {}, truncate: true });
      for (let i = 1; i <= 15; i++) {
        await Post.create({
          title: `Node Post ${i}`,
          content: 'Conteúdo',
          author: 'Autor'
        });
      }

      const response = await request(app)
        .get('/posts?search=node&page=2&limit=5&sort=title&order=asc')
        .expect(200);

      expect(response.body.data).toHaveLength(5);
      expect(response.body.pagination.page).toBe(2);
      expect(response.body.pagination.total).toBe(15);
    });
  });

  describe('Validações', () => {
    test('deve limitar máximo de itens por página', async () => {
      const response = await request(app)
        .get('/posts?limit=200') // Acima do máximo
        .expect(200);

      expect(response.body.pagination.limit).toBeLessThanOrEqual(100);
    });

    test('deve usar defaults para valores inválidos', async () => {
      const response = await request(app)
        .get('/posts?page=-1&limit=abc')
        .expect(200);

      expect(response.body.pagination.page).toBeGreaterThan(0);
      expect(response.body.pagination.limit).toBeGreaterThan(0);
    });
  });
});
