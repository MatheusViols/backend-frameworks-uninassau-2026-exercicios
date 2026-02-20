// TODO: Configurar todos os relacionamentos entre models
const User = require('./User');
const Post = require('./Post');
const Tag = require('./Tag');

// Configure os relacionamentos aqui:
// User.hasMany(Post, ...)
// Post.belongsTo(User, ...)
// Post.belongsToMany(Tag, ...)
// Tag.belongsToMany(Post, ...)

module.exports = { User, Post, Tag };
