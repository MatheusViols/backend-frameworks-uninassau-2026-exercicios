// TODO: Criar model Account (Conta Bancária)
// Campos: id, accountNumber, holder (titular), balance (saldo)

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Account = sequelize.define('Account', {
  // Defina os campos aqui
});

module.exports = Account;
