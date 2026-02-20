const UserService = require('../src/services/UserService');

// Mock do Sequelize Model
const mockUserModel = {
  create: jest.fn(),
  findByPk: jest.fn(),
  findAll: jest.fn()
};

describe('UserService - Testes Unitários', () => {
  let userService;

  beforeEach(() => {
    // Limpar mocks antes de cada teste
    jest.clearAllMocks();
    userService = new UserService(mockUserModel);
  });

  describe('validateEmail', () => {
    test('deve validar email correto', () => {
      expect(userService.validateEmail('teste@example.com')).toBe(true);
    });

    test('deve rejeitar email sem @', () => {
      expect(userService.validateEmail('testeexample.com')).toBe(false);
    });

    test('deve rejeitar email sem domínio', () => {
      expect(userService.validateEmail('teste@')).toBe(false);
    });

    test('deve rejeitar email vazio', () => {
      expect(userService.validateEmail('')).toBe(false);
    });
  });

  describe('validateAge', () => {
    test('deve aceitar idade >= 18', () => {
      expect(userService.validateAge(18)).toBe(true);
      expect(userService.validateAge(25)).toBe(true);
    });

    test('deve rejeitar idade < 18', () => {
      expect(userService.validateAge(17)).toBe(false);
      expect(userService.validateAge(0)).toBe(false);
    });
  });

  describe('hashPassword', () => {
    test('deve retornar senha com hash', () => {
      const hashed = userService.hashPassword('senha123');
      expect(hashed).toContain('hashed_');
      expect(hashed).not.toBe('senha123');
    });
  });

  describe('createUser', () => {
    test('deve criar usuário com dados válidos', async () => {
      const userData = {
        name: 'João Silva',
        email: 'joao@example.com',
        age: 25,
        password: 'senha123'
      };

      const mockCreatedUser = { id: 1, ...userData, password: 'hashed_senha123' };
      mockUserModel.create.mockResolvedValue(mockCreatedUser);

      const result = await userService.createUser(userData);

      expect(mockUserModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: userData.name,
          email: userData.email,
          age: userData.age,
          password: expect.stringContaining('hashed_')
        })
      );
      expect(result).toBeDefined();
    });

    test('deve lançar erro para email inválido', async () => {
      const userData = {
        name: 'João',
        email: 'email-invalido',
        age: 25,
        password: 'senha123'
      };

      await expect(userService.createUser(userData)).rejects.toThrow('Email inválido');
      expect(mockUserModel.create).not.toHaveBeenCalled();
    });

    test('deve lançar erro para idade < 18', async () => {
      const userData = {
        name: 'João',
        email: 'joao@example.com',
        age: 17,
        password: 'senha123'
      };

      await expect(userService.createUser(userData)).rejects.toThrow('Idade deve ser maior ou igual a 18');
      expect(mockUserModel.create).not.toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    test('deve retornar usuário se encontrado', async () => {
      const mockUser = { id: 1, name: 'João' };
      mockUserModel.findByPk.mockResolvedValue(mockUser);

      const result = await userService.getUserById(1);

      expect(mockUserModel.findByPk).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });

    test('deve retornar null se não encontrado', async () => {
      mockUserModel.findByPk.mockResolvedValue(null);

      const result = await userService.getUserById(999);

      expect(result).toBeNull();
    });
  });

  describe('getActiveUsers', () => {
    test('deve retornar apenas usuários ativos', async () => {
      const mockUsers = [
        { id: 1, name: 'João', active: true },
        { id: 2, name: 'Maria', active: true }
      ];
      mockUserModel.findAll.mockResolvedValue(mockUsers);

      const result = await userService.getActiveUsers();

      expect(mockUserModel.findAll).toHaveBeenCalledWith({
        where: { active: true }
      });
      expect(result).toEqual(mockUsers);
    });
  });
});
