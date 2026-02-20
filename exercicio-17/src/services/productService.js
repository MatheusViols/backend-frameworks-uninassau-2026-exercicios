// TODO: Implementar serviço com cache
const redis = require('../config/redis');
const Product = require('../models/Product');

const CACHE_KEY = 'products:all';
const CACHE_TTL = 60; // 60 segundos

class ProductService {
  /**
   * Listar todos os produtos (com cache)
   * @returns {Promise<{data: Array, cached: boolean}>}
   */
  async getAllProducts() {
    // TODO: Implementar cache-aside pattern
    // 1. Tentar buscar do cache
    // 2. Se encontrar (HIT): retornar do cache
    // 3. Se não encontrar (MISS): buscar do banco, salvar no cache, retornar
  }

  /**
   * Criar produto e invalidar cache
   */
  async createProduct(data) {
    // TODO: Criar produto e invalidar cache
  }

  /**
   * Atualizar produto e invalidar cache
   */
  async updateProduct(id, data) {
    // TODO: Atualizar produto e invalidar cache
  }

  /**
   * Deletar produto e invalidar cache
   */
  async deleteProduct(id) {
    // TODO: Deletar produto e invalidar cache
  }

  /**
   * Invalidar cache
   */
  async invalidateCache() {
    await redis.del(CACHE_KEY);
  }
}

module.exports = new ProductService();
