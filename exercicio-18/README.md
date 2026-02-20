# Exercício 18: Testes Unitários (Jest)

## 🎯 Objetivo
Escrever testes unitários isolados usando mocks para testar lógica de negócio sem dependências externas.

## 📚 Conceitos Abordados
- Testes unitários vs integração
- Mocks e stubs
- Jest mocking
- Code coverage
- TDD (Test-Driven Development)

## 🔧 Tecnologias
- Jest
- Sequelize (mockado)

## 📝 Tarefas

### 1. Criar UserService com Lógica de Negócio
- Validação de email
- Validação de idade (>= 18)
- Hash de senha (simulado)
- Busca de usuários

### 2. Mockar Dependências
- Mockar Sequelize Model
- Mockar métodos de banco de dados
- Isolar testes do banco real

### 3. Escrever Testes Unitários
- Testar validações
- Testar lógica de criação
- Testar tratamento de erros
- Testar edge cases

### 4. Alcançar 80%+ Coverage
- Branches
- Functions
- Lines
- Statements

## 🚀 Como Executar

```bash
npm install
npm test
npm run test:coverage
```

## ✅ Critérios de Aceite
- [ ] Testes isolados (sem banco de dados)
- [ ] Mocks configurados corretamente
- [ ] Validações testadas
- [ ] Coverage mínimo 80%
- [ ] Todos os testes passando
- [ ] Testes rápidos (<100ms cada)

## 📖 Recursos
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Jest Mock Functions](https://jestjs.io/docs/mock-functions)

## 🎓 Dicas
- Use `jest.fn()` para criar mocks
- Use `jest.spyOn()` para espiar métodos
- Use `mockResolvedValue()` para simular async
- Teste casos de sucesso E falha
