const sequelize = require('../src/config/database');
const Account = require('../src/models/Account');
const Transaction = require('../src/models/Transaction');
const bankService = require('../src/services/bankService');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

beforeEach(async () => {
  await Account.destroy({ where: {}, truncate: true });
  await Transaction.destroy({ where: {}, truncate: true });
});

describe('Transferência Bancária com Transações', () => {
  describe('Transferência bem-sucedida', () => {
    test('deve transferir dinheiro entre contas', async () => {
      // Criar contas
      const account1 = await bankService.createAccount('001', 'João Silva', 1000);
      const account2 = await bankService.createAccount('002', 'Maria Santos', 500);

      // Transferir
      const transaction = await bankService.transfer(account1.id, account2.id, 200);

      // Verificar transação criada
      expect(transaction).toBeDefined();
      expect(transaction.amount).toBe(200);

      // Verificar saldos atualizados
      const updatedAccount1 = await bankService.getAccount(account1.id);
      const updatedAccount2 = await bankService.getAccount(account2.id);

      expect(updatedAccount1.balance).toBe(800); // 1000 - 200
      expect(updatedAccount2.balance).toBe(700); // 500 + 200
    });

    test('deve permitir transferir todo o saldo', async () => {
      const account1 = await bankService.createAccount('001', 'João', 1000);
      const account2 = await bankService.createAccount('002', 'Maria', 0);

      await bankService.transfer(account1.id, account2.id, 1000);

      const updated1 = await bankService.getAccount(account1.id);
      const updated2 = await bankService.getAccount(account2.id);

      expect(updated1.balance).toBe(0);
      expect(updated2.balance).toBe(1000);
    });
  });

  describe('Rollback - Saldo insuficiente', () => {
    test('não deve transferir se saldo insuficiente', async () => {
      const account1 = await bankService.createAccount('001', 'João', 100);
      const account2 = await bankService.createAccount('002', 'Maria', 500);

      // Tentar transferir mais do que tem
      await expect(
        bankService.transfer(account1.id, account2.id, 200)
      ).rejects.toThrow('Saldo insuficiente');

      // Verificar que saldos NÃO mudaram
      const updated1 = await bankService.getAccount(account1.id);
      const updated2 = await bankService.getAccount(account2.id);

      expect(updated1.balance).toBe(100); // Saldo original
      expect(updated2.balance).toBe(500); // Saldo original
    });

    test('não deve criar registro de transação em caso de erro', async () => {
      const account1 = await bankService.createAccount('001', 'João', 100);
      const account2 = await bankService.createAccount('002', 'Maria', 500);

      try {
        await bankService.transfer(account1.id, account2.id, 200);
      } catch (error) {
        // Esperado
      }

      // Verificar que nenhuma transação foi registrada
      const transactions = await Transaction.findAll();
      expect(transactions).toHaveLength(0);
    });
  });

  describe('Rollback - Conta inexistente', () => {
    test('não deve transferir se conta origem não existe', async () => {
      const account2 = await bankService.createAccount('002', 'Maria', 500);

      await expect(
        bankService.transfer(9999, account2.id, 100)
      ).rejects.toThrow();

      // Verificar que saldo da conta destino NÃO mudou
      const updated2 = await bankService.getAccount(account2.id);
      expect(updated2.balance).toBe(500);
    });

    test('não deve transferir se conta destino não existe', async () => {
      const account1 = await bankService.createAccount('001', 'João', 1000);

      await expect(
        bankService.transfer(account1.id, 9999, 100)
      ).rejects.toThrow();

      // Verificar que saldo da conta origem NÃO mudou
      const updated1 = await bankService.getAccount(account1.id);
      expect(updated1.balance).toBe(1000);
    });
  });

  describe('ACID - Atomicidade', () => {
    test('deve garantir que todas as operações sejam executadas ou nenhuma', async () => {
      const account1 = await bankService.createAccount('001', 'João', 1000);
      const account2 = await bankService.createAccount('002', 'Maria', 500);

      // Simular erro no meio da transação (valor negativo)
      await expect(
        bankService.transfer(account1.id, account2.id, -100)
      ).rejects.toThrow();

      // Verificar que NADA mudou
      const updated1 = await bankService.getAccount(account1.id);
      const updated2 = await bankService.getAccount(account2.id);

      expect(updated1.balance).toBe(1000);
      expect(updated2.balance).toBe(500);
    });
  });

  describe('Múltiplas transferências', () => {
    test('deve permitir múltiplas transferências sequenciais', async () => {
      const account1 = await bankService.createAccount('001', 'João', 1000);
      const account2 = await bankService.createAccount('002', 'Maria', 500);
      const account3 = await bankService.createAccount('003', 'Pedro', 200);

      // Transferências encadeadas
      await bankService.transfer(account1.id, account2.id, 200);
      await bankService.transfer(account2.id, account3.id, 100);

      const updated1 = await bankService.getAccount(account1.id);
      const updated2 = await bankService.getAccount(account2.id);
      const updated3 = await bankService.getAccount(account3.id);

      expect(updated1.balance).toBe(800);  // 1000 - 200
      expect(updated2.balance).toBe(600);  // 500 + 200 - 100
      expect(updated3.balance).toBe(300);  // 200 + 100

      // Verificar registros de transação
      const transactions = await Transaction.findAll();
      expect(transactions).toHaveLength(2);
    });
  });
});
