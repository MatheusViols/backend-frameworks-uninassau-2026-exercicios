// TODO: Implementar serviço de transferência bancária com transação
const sequelize = require('../config/database');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

class BankService {
  /**
   * Transferir dinheiro entre contas
   * @param {number} fromAccountId - ID da conta origem
   * @param {number} toAccountId - ID da conta destino
   * @param {number} amount - Valor a transferir
   * @returns {Promise<Transaction>} Registro da transação
   */
  async transfer(fromAccountId, toAccountId, amount) {
    // TODO: Implementar transferência com transação
    // 1. Usar sequelize.transaction() para criar transação managed
    // 2. Buscar conta origem (com lock)
    // 3. Verificar saldo suficiente
    // 4. Buscar conta destino
    // 5. Debitar da origem
    // 6. Creditar no destino
    // 7. Criar registro de transação
    // 8. Se qualquer erro, Sequelize fará rollback automático
    // 9. Se tudo OK, Sequelize fará commit automático
  }

  /**
   * Criar nova conta
   */
  async createAccount(accountNumber, holder, initialBalance = 0) {
    return await Account.create({
      accountNumber,
      holder,
      balance: initialBalance
    });
  }

  /**
   * Buscar conta por ID
   */
  async getAccount(id) {
    return await Account.findByPk(id);
  }
}

module.exports = new BankService();
