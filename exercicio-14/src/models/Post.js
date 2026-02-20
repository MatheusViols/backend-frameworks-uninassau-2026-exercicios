// TODO: Criar model Post
// Campos: id, title, content, userId (FK)
// Relacionamentos: 
//   - belongsTo User
//   - belongsToMany Tag (through: 'PostTags')

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Post = sequelize.define('Post', {
  // Defina os campos aqui
});

module.exports = Post;
