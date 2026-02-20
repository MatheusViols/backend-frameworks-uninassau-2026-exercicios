// TODO: Implementar rotas CRUD de tarefas
const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// POST /tasks
router.post('/', async (req, res) => {
  // TODO: Criar tarefa
});

// GET /tasks
router.get('/', async (req, res) => {
  // TODO: Listar tarefas
});

// GET /tasks/:id
router.get('/:id', async (req, res) => {
  // TODO: Buscar tarefa por ID
});

// PUT /tasks/:id
router.put('/:id', async (req, res) => {
  // TODO: Atualizar tarefa
});

// DELETE /tasks/:id
router.delete('/:id', async (req, res) => {
  // TODO: Deletar tarefa
});

module.exports = router;
