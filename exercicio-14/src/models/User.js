// TODO: Criar model User
// Campos: id, name, email
// Relacionamento: hasMany Posts

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  // Defina os campos aqui
});

module.exports = User;
