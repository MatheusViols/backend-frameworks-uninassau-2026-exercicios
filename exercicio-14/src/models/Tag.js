// TODO: Criar model Tag
// Campos: id, name
// Relacionamento: belongsToMany Post (through: 'PostTags')

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tag = sequelize.define('Tag', {
  // Defina os campos aqui
});

module.exports = Tag;
