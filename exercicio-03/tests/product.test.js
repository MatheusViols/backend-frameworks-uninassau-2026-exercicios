const Product = require('../src/models/Product');

describe('Exercício 03 - Model Product', () => {
  beforeEach(() => {
    // Limpar produtos antes de cada teste
    const products = Product.findAll();
    products.forEach(p => Product.delete(p.id));
  });

  describe('Validações', () => {
    it('deve validar name mínimo 3 caracteres', () => {
      const result = Product.create({
        name: 'AB',
        price: 100,
        stock: 10
      });

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Nome deve ter no mínimo 3 caracteres');
    });

    it('deve validar name obrigatório', () => {
      const result = Product.create({
        price: 100,
        stock: 10
      });

      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('Nome'))).toBe(true);
    });

    it('deve validar price positivo', () => {
      const result = Product.create({
        name: 'Produto',
        price: -10,
        stock: 10
      });

      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('Preço'))).toBe(true);
    });

    it('deve validar stock não-negativo', () => {
      const result = Product.create({
        name: 'Produto',
        price: 100,
        stock: -5
      });

      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('Estoque'))).toBe(true);
    });

    it('deve aceitar dados válidos', () => {
      const result = Product.create({
        name: 'Notebook',
        price: 2500,
        stock: 10
      });

      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
      expect(result.product).toBeDefined();
    });
  });

  describe('CRUD Operations', () => {
    it('deve criar produto com dados válidos', () => {
      const result = Product.create({
        name: 'Mouse',
        price: 50,
        stock: 20
      });

      expect(result.valid).toBe(true);
      expect(result.product.id).toBeDefined();
      expect(result.product.name).toBe('Mouse');
      expect(result.product.createdAt).toBeInstanceOf(Date);
    });

    it('deve listar todos os produtos', () => {
      Product.create({ name: 'Produto 1', price: 100, stock: 10 });
      Product.create({ name: 'Produto 2', price: 200, stock: 20 });

      const products = Product.findAll();

      expect(products.length).toBe(2);
    });

    it('deve buscar produto por ID', () => {
      const created = Product.create({ name: 'Teclado', price: 150, stock: 15 });
      const found = Product.findById(created.product.id);

      expect(found).toBeDefined();
      expect(found.name).toBe('Teclado');
    });

    it('deve retornar null para ID inexistente', () => {
      const found = Product.findById(999);

      expect(found).toBeNull();
    });

    it('deve atualizar produto existente', () => {
      const created = Product.create({ name: 'Webcam', price: 200, stock: 5 });
      
      const result = Product.update(created.product.id, {
        name: 'Webcam HD',
        price: 250,
        stock: 8
      });

      expect(result.valid).toBe(true);
      expect(result.product.name).toBe('Webcam HD');
      expect(result.product.price).toBe(250);
    });

    it('deve falhar ao atualizar produto inexistente', () => {
      const result = Product.update(999, {
        name: 'Teste',
        price: 100,
        stock: 10
      });

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Produto não encontrado');
    });

    it('deve deletar produto existente', () => {
      const created = Product.create({ name: 'Headset', price: 300, stock: 12 });
      
      const deleted = Product.delete(created.product.id);

      expect(deleted).toBe(true);
      expect(Product.findById(created.product.id)).toBeNull();
    });

    it('deve retornar false ao deletar produto inexistente', () => {
      const deleted = Product.delete(999);

      expect(deleted).toBe(false);
    });
  });

  describe('Propriedades do Produto', () => {
    it('deve ter todas as propriedades obrigatórias', () => {
      const result = Product.create({
        name: 'Monitor',
        price: 800,
        stock: 7
      });

      const product = result.product;

      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('stock');
      expect(product).toHaveProperty('createdAt');
    });

    it('deve gerar IDs únicos incrementais', () => {
      const product1 = Product.create({ name: 'A', price: 10, stock: 1 }).product;
      const product2 = Product.create({ name: 'B', price: 20, stock: 2 }).product;

      expect(product2.id).toBeGreaterThan(product1.id);
    });
  });
});
