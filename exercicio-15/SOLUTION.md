# Solução: Exercício 15 - Transações

## 📝 Implementação Completa

### 1. Model Account

**src/models/Account.js**
```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Account = sequelize.define('Account', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  holder: {
    type: DataTypes.STRING,
    allowNull: false
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2), // Precisão para valores monetários
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0 // Saldo não pode ser negativo
    }
  }
});

module.exports = Account;
```

### 2. Model Transaction

**src/models/Transaction.js**
```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fromAccountId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  toAccountId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.01 // Valor mínimo de transferência
    }
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'TRANSFER'
  }
});

module.exports = Transaction;
```

### 3. Serviço de Transferência Bancária

**src/services/bankService.js**
```javascript
const sequelize = require('../config/database');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

class BankService {
  /**
   * Transferir dinheiro entre contas com garantia ACID
   */
  async transfer(fromAccountId, toAccountId, amount) {
    // Validações básicas
    if (amount <= 0) {
      throw new Error('Valor da transferência deve ser maior que zero');
    }

    // Managed Transaction: Sequelize gerencia commit/rollback automaticamente
    return await sequelize.transaction(async (t) => {
      // 1. Buscar conta origem com lock pessimista
      // Lock evita que outra transação modifique a conta ao mesmo tempo
      const fromAccount = await Account.findByPk(fromAccountId, {
        lock: t.LOCK.UPDATE, // Trava a linha para atualização
        transaction: t
      });

      if (!fromAccount) {
        throw new Error('Conta origem não encontrada');
      }

      // 2. Verificar saldo suficiente
      if (fromAccount.balance < amount) {
        throw new Error('Saldo insuficiente');
      }

      // 3. Buscar conta destino
      const toAccount = await Account.findByPk(toAccountId, {
        lock: t.LOCK.UPDATE,
        transaction: t
      });

      if (!toAccount) {
        throw new Error('Conta destino não encontrada');
      }

      // 4. Debitar da conta origem
      fromAccount.balance = parseFloat(fromAccount.balance) - parseFloat(amount);
      await fromAccount.save({ transaction: t });

      // 5. Creditar na conta destino
      toAccount.balance = parseFloat(toAccount.balance) + parseFloat(amount);
      await toAccount.save({ transaction: t });

      // 6. Criar registro da transação
      const transaction = await Transaction.create({
        fromAccountId,
        toAccountId,
        amount,
        type: 'TRANSFER'
      }, { transaction: t });

      // Se chegou aqui sem throw, Sequelize faz COMMIT automático
      return transaction;
    });
    // Se houve throw em qualquer ponto, Sequelize faz ROLLBACK automático
  }

  async createAccount(accountNumber, holder, initialBalance = 0) {
    return await Account.create({
      accountNumber,
      holder,
      balance: initialBalance
    });
  }

  async getAccount(id) {
    return await Account.findByPk(id);
  }
}

module.exports = new BankService();
```

## 🎯 Conceitos-Chave

### 1. ACID Properties

**Atomicity (Atomicidade)**
```javascript
// TUDO ou NADA - não existe meio-termo
await sequelize.transaction(async (t) => {
  await account1.update({ balance: 800 }, { transaction: t }); // Débito
  await account2.update({ balance: 1200 }, { transaction: t }); // Crédito
  // Se qualquer operação falhar, AMBAS são desfeitas
});
```

**Consistency (Consistência)**
```javascript
// O banco sempre fica em estado válido
// Não pode haver débito sem crédito correspondente
// Soma total de dinheiro no sistema permanece constante
```

**Isolation (Isolamento)**
```javascript
// Transações concorrentes não interferem entre si
const account = await Account.findByPk(id, {
  lock: t.LOCK.UPDATE, // Outras transações esperam
  transaction: t
});
```

**Durability (Durabilidade)**
```javascript
// Após COMMIT, mudanças são permanentes
// Mesmo se o servidor cair, dados persistem
```

### 2. Managed vs Unmanaged Transactions

**Managed Transaction (Recomendado)**
```javascript
// Sequelize gerencia commit/rollback automaticamente
await sequelize.transaction(async (t) => {
  // Suas operações aqui
  await Model.create(data, { transaction: t });
  // Commit automático se tudo OK
  // Rollback automático se throw
});
```

**Unmanaged Transaction (Controle manual)**
```javascript
// Você controla commit/rollback manualmente
const t = await sequelize.transaction();
try {
  await Model.create(data, { transaction: t });
  await t.commit(); // Commit manual
} catch (error) {
  await t.rollback(); // Rollback manual
  throw error;
}
```

**Quando usar cada uma:**
- **Managed:** 99% dos casos (mais seguro)
- **Unmanaged:** Quando precisa de controle fino sobre quando fazer commit

### 3. Locks (Travas)

**Pessimistic Locking (Trava Pessimista)**
```javascript
// Trava a linha imediatamente
const account = await Account.findByPk(id, {
  lock: t.LOCK.UPDATE, // SELECT ... FOR UPDATE
  transaction: t
});
// Outras transações ESPERAM até o commit/rollback
```

**Optimistic Locking (Trava Otimista)**
```javascript
// Usa versioning - não implementado neste exercício
// Detecta conflitos no momento do save
```

### 4. Fluxo de uma Transação

```
1. BEGIN TRANSACTION
   ↓
2. SELECT ... FOR UPDATE (lock)
   ↓
3. Validações (saldo, existência)
   ↓
4. UPDATE conta origem
   ↓
5. UPDATE conta destino
   ↓
6. INSERT registro transação
   ↓
7a. Tudo OK → COMMIT
7b. Erro → ROLLBACK
```

## ⚠️ Erros Comuns

### 1. Esquecer de passar { transaction: t }

```javascript
// ERRADO: Operações fora da transação
await sequelize.transaction(async (t) => {
  await Account.update({ balance: 800 }); // Sem { transaction: t }
  // Esta operação NÃO está na transação!
});

// CERTO:
await sequelize.transaction(async (t) => {
  await Account.update({ balance: 800 }, { transaction: t });
});
```

### 2. Não usar lock em operações concorrentes

```javascript
// ERRADO: Race condition possível
const account = await Account.findByPk(id, { transaction: t });
// Outra transação pode modificar account aqui!
account.balance -= 100;
await account.save({ transaction: t });

// CERTO: Lock previne race conditions
const account = await Account.findByPk(id, {
  lock: t.LOCK.UPDATE, // Trava!
  transaction: t
});
account.balance -= 100;
await account.save({ transaction: t });
```

### 3. Usar floating point para dinheiro

```javascript
// RUIM: Problemas de arredondamento
balance: {
  type: DataTypes.FLOAT // 0.1 + 0.2 = 0.30000000000000004
}

// BOM: Precisão decimal
balance: {
  type: DataTypes.DECIMAL(10, 2) // Exatamente 2 casas decimais
}
```

### 4. Não validar antes de operar

```javascript
// ERRADO: Validar DEPOIS de começar transação
await sequelize.transaction(async (t) => {
  if (amount <= 0) throw new Error('Valor inválido'); // Transação desperdiçada
});

// CERTO: Validar ANTES
if (amount <= 0) throw new Error('Valor inválido');
await sequelize.transaction(async (t) => {
  // Operações
});
```

## 🧪 Estratégia de Testes

### Testar Sucesso
```javascript
test('deve transferir com sucesso', async () => {
  const result = await transfer(1, 2, 100);
  expect(result).toBeDefined();
  
  // Verificar saldos atualizados
  const account1 = await getAccount(1);
  expect(account1.balance).toBe(900);
});
```

### Testar Rollback
```javascript
test('deve fazer rollback em caso de erro', async () => {
  const initialBalance = account.balance;
  
  await expect(transfer(1, 2, 9999)).rejects.toThrow();
  
  // Verificar que saldo NÃO mudou
  const account = await getAccount(1);
  expect(account.balance).toBe(initialBalance);
});
```

### Testar Atomicidade
```javascript
test('deve garantir atomicidade', async () => {
  // Se parte falha, tudo falha
  await expect(transfer(1, 9999, 100)).rejects.toThrow();
  
  // Verificar que NENHUMA operação foi aplicada
  const transactions = await Transaction.findAll();
  expect(transactions).toHaveLength(0);
});
```

## 📊 Cenários de Uso Real

### 1. E-commerce: Processamento de Pedido
```javascript
await sequelize.transaction(async (t) => {
  // Debitar estoque
  await Product.decrement('stock', { by: quantity, transaction: t });
  
  // Criar pedido
  const order = await Order.create(orderData, { transaction: t });
  
  // Processar pagamento
  await Payment.create(paymentData, { transaction: t });
  
  // Tudo ou nada!
});
```

### 2. Rede Social: Seguir Usuário
```javascript
await sequelize.transaction(async (t) => {
  // Criar relacionamento
  await Follow.create({ followerId, followingId }, { transaction: t });
  
  // Incrementar contadores
  await User.increment('followingCount', { where: { id: followerId }, transaction: t });
  await User.increment('followersCount', { where: { id: followingId }, transaction: t });
});
```

## 🚀 Próximos Passos

1. **Exercício 16:** Adicionar paginação e filtros
2. **Idempotência:** Evitar transações duplicadas
3. **Retry Logic:** Tentar novamente em caso de deadlock
4. **Distributed Transactions:** Transações entre múltiplos bancos

## 📚 Recursos Adicionais

- [Sequelize Transactions](https://sequelize.org/docs/v6/other-topics/transactions/)
- [Database ACID](https://en.wikipedia.org/wiki/ACID)
- [Pessimistic Locking](https://www.geeksforgeeks.org/pessimistic-locking-in-dbms/)
