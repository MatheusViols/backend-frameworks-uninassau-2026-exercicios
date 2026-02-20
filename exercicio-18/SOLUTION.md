# Solução: Exercício 18 - Testes Unitários

## Implementação Completa

**src/services/UserService.js**
```javascript
class UserService {
  constructor(userModel) {
    this.User = userModel;
  }

  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  validateAge(age) {
    return age >= 18;
  }

  hashPassword(password) {
    return `hashed_${password}`;
  }

  async createUser(data) {
    // Validações
    if (!this.validateEmail(data.email)) {
      throw new Error('Email inválido');
    }

    if (!this.validateAge(data.age)) {
      throw new Error('Idade deve ser maior ou igual a 18');
    }

    // Hash da senha
    const hashedPassword = this.hashPassword(data.password);

    // Criar usuário
    const user = await this.User.create({
      ...data,
      password: hashedPassword
    });

    return user;
  }

  async getUserById(id) {
    return await this.User.findByPk(id);
  }

  async getActiveUsers() {
    return await this.User.findAll({
      where: { active: true }
    });
  }
}

module.exports = UserService;
```

## 🎯 Conceitos-Chave

### 1. Testes Unitários vs Integração

**Unitários:**
- Testam uma unidade isolada (função, classe)
- Usam mocks para dependências
- Rápidos (<100ms)
- Não tocam banco/rede

**Integração:**
- Testam múltiplos componentes juntos
- Usam banco de dados real
- Mais lentos
- Testam fluxo completo

### 2. Mocking com Jest

```javascript
// Criar mock function
const mockFn = jest.fn();
mockFn.mockReturnValue('valor');

// Mock async
mockFn.mockResolvedValue({ id: 1 });
mockFn.mockRejectedValue(new Error('Erro'));

// Verificar chamadas
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith(args);
expect(mockFn).toHaveBeenCalledTimes(2);
```

### 3. Code Coverage

```javascript
// jest.config.js
coverageThreshold: {
  global: {
    branches: 80,   // If/else
    functions: 80,  // Funções
    lines: 80,      // Linhas
    statements: 80  // Statements
  }
}
```

### 4. Arrange-Act-Assert Pattern

```javascript
test('deve criar usuário', async () => {
  // Arrange (preparar)
  const userData = { name: 'João' };
  mockModel.create.mockResolvedValue(userData);
  
  // Act (agir)
  const result = await service.createUser(userData);
  
  // Assert (verificar)
  expect(result).toEqual(userData);
});
```

## ⚠️ Erros Comuns

1. **Não limpar mocks entre testes**
```javascript
beforeEach(() => {
  jest.clearAllMocks(); // SEMPRE limpar!
});
```

2. **Testar implementação, não comportamento**
```javascript
// RUIM: Testa implementação interna
expect(service.internalMethod).toHaveBeenCalled();

// BOM: Testa resultado
expect(result.name).toBe('João');
```

3. **Testes dependentes uns dos outros**
```javascript
// RUIM: Testes em ordem
let user;
test('criar', () => { user = create(); });
test('buscar', () => { find(user.id); }); // Depende do anterior!

// BOM: Testes isolados
test('criar', () => { ... });
test('buscar', () => {
  mock.mockReturnValue({ id: 1 });
  // ...
});
```

## 📚 Recursos
- [Jest Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)
