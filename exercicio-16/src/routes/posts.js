// TODO: Implementar rota GET /posts com paginação e filtros
const express = require('express');
const { Op } = require('sequelize');
const Post = require('../models/Post');

const router = express.Router();

/**
 * GET /posts
 * Query params: page, limit, search, sort, order
 */
router.get('/', async (req, res) => {
  try {
    // TODO: Extrair e validar query params
    // TODO: Construir objeto where para filtros
    // TODO: Construir objeto order para ordenação
    // TODO: Calcular offset
    // TODO: Usar findAndCountAll com limit, offset, where, order
    // TODO: Calcular metadados de paginação
    // TODO: Retornar resposta formatada
    
    res.json({
      data: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
