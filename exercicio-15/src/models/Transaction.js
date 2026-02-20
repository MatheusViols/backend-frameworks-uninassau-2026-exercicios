// TODO: Criar model Transaction (Registro de transação)
// Campos: id, fromAccountId, toAccountId, amount, type, createdAt

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  // Defina os campos aqui
});

module.exports = Transaction;
