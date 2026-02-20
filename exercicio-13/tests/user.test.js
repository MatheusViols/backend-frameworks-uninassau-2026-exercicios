const sequelize = require('../src/config/database');
const User = require('../src/models/User');
const userService = require('../src/userService');

beforeAll(async () => {
  // Sincronizar banco de dados antes dos testes
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  // Fechar conexão após os testes
  await sequelize.close();
});

beforeEach(async () => {
  // Limpar tabela antes de cada teste
  await User.destroy({ where: {}, truncate: true });
});

describe('UserService - CRUD Operations', () => {
  describe('createUser', () => {
    test('deve criar um usuário com sucesso', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@example.com',
        age: 25
      };

      const user = await userService.createUser(userData);

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
      expect(user.age).toBe(userData.age);
    });

    test('deve falhar ao criar usuário sem nome', async () => {
      const userData = {
        email: 'joao@example.com'
      };

      await expect(userService.createUser(userData)).rejects.toThrow();
    });

    test('deve falhar ao criar usuário sem email', async () => {
      const userData = {
        name: 'João Silva'
      };

      await expect(userService.createUser(userData)).rejects.toThrow();
    });

    test('deve falhar ao criar usuário com email duplicado', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@example.com'
      };

      await userService.createUser(userData);
      await expect(userService.createUser(userData)).rejects.toThrow();
    });
  });

  describe('getAllUsers', () => {
    test('deve retornar lista vazia quando não há usuários', async () => {
      const users = await userService.getAllUsers();
      expect(users).toEqual([]);
    });

    test('deve retornar todos os usuários', async () => {
      await userService.createUser({ name: 'João', email: 'joao@example.com' });
      await userService.createUser({ name: 'Maria', email: 'maria@example.com' });

      const users = await userService.getAllUsers();
      expect(users).toHaveLength(2);
    });
  });

  describe('getUserById', () => {
    test('deve retornar usuário por ID', async () => {
      const created = await userService.createUser({
        name: 'João Silva',
        email: 'joao@example.com'
      });

      const user = await userService.getUserById(created.id);
      expect(user).toBeDefined();
      expect(user.id).toBe(created.id);
      expect(user.name).toBe('João Silva');
    });

    test('deve retornar null para ID inexistente', async () => {
      const user = await userService.getUserById(9999);
      expect(user).toBeNull();
    });
  });

  describe('updateUser', () => {
    test('deve atualizar usuário com sucesso', async () => {
      const created = await userService.createUser({
        name: 'João Silva',
        email: 'joao@example.com'
      });

      const updated = await userService.updateUser(created.id, {
        name: 'João Santos',
        age: 30
      });

      expect(updated.name).toBe('João Santos');
      expect(updated.age).toBe(30);
      expect(updated.email).toBe('joao@example.com'); // Email não deve mudar
    });

    test('deve retornar null ao atualizar usuário inexistente', async () => {
      const result = await userService.updateUser(9999, { name: 'Teste' });
      expect(result).toBeNull();
    });
  });

  describe('deleteUser', () => {
    test('deve deletar usuário com sucesso', async () => {
      const created = await userService.createUser({
        name: 'João Silva',
        email: 'joao@example.com'
      });

      const deleted = await userService.deleteUser(created.id);
      expect(deleted).toBe(true);

      const user = await userService.getUserById(created.id);
      expect(user).toBeNull();
    });

    test('deve retornar false ao deletar usuário inexistente', async () => {
      const result = await userService.deleteUser(9999);
      expect(result).toBe(false);
    });
  });
});
