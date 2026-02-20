# Solução: Exercício 12 - MongoDB + Mongoose

## src/models/Post.js
```javascript
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório']
  },
  content: {
    type: String,
    required: [true, 'Conteúdo é obrigatório']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);
```

## src/controllers/PostController.js
```javascript
const Post = require('../models/Post');

class PostController {
  async index(req, res) {
    try {
      const posts = await Post.find().populate('author');
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async show(req, res) {
    try {
      const post = await Post.findById(req.params.id).populate('author');
      if (!post) return res.status(404).json({ error: 'Post não encontrado' });
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async store(req, res) {
    try {
      const post = await Post.create(req.body);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!post) return res.status(404).json({ error: 'Post não encontrado' });
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) return res.status(404).json({ error: 'Post não encontrado' });
      res.json({ message: 'Post deletado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PostController();
```

## src/server.js
```javascript
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PostController = require('./controllers/PostController');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/exercicio12')
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Erro ao conectar MongoDB:', err));

app.get('/posts', PostController.index);
app.get('/posts/:id', PostController.show);
app.post('/posts', PostController.store);
app.put('/posts/:id', PostController.update);
app.delete('/posts/:id', PostController.destroy);

if (require.main === module) {
  app.listen(3000, () => console.log('Servidor na porta 3000'));
}

module.exports = app;
```
