const User = require('../src/models/User');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/users.json');

describe('Exercício 06 - Persistência JSON', () => {
  beforeEach(() => {
    fs.writeFileSync(dataPath, '[]');
  });

  it('deve criar usuário e persistir', () => {
    const user = User.create({ name: 'João', email: 'joao@email.com' });
    
    expect(user).toHaveProperty('id');
    
    const users = User.findAll();
    expect(users.length).toBe(1);
  });

  it('deve ler usuários do arquivo', () => {
    User.create({ name: 'Maria', email: 'maria@email.com' });
    
    // Simular recarregamento lendo arquivo
    const users = User.findAll();
    expect(users.length).toBeGreaterThan(0);
  });

  it('deve atualizar usuário', () => {
    const user = User.create({ name: 'Pedro', email: 'pedro@email.com' });
    User.update(user.id, { name: 'Pedro Silva', email: 'pedro.silva@email.com' });
    
    const updated = User.findById(user.id);
    expect(updated.name).toBe('Pedro Silva');
  });

  it('deve deletar usuário', () => {
    const user = User.create({ name: 'Ana', email: 'ana@email.com' });
    User.delete(user.id);
    
    const found = User.findById(user.id);
    expect(found).toBeNull();
  });
});
