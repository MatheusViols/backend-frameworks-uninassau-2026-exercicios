// TODO: Criar model Post
// Campos: id, title, content, author, createdAt, updatedAt

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Post = sequelize.define('Post', {
  // Defina os campos aqui
});

module.exports = Post;
