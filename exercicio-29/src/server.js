const express = require('express');
const { Pool } = require('pg');
const { createClient } = require('redis');

const app = express();
const PORT = process.env.PORT || 3000;

// TODO: Configurar PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'myapp',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres'
});

// TODO: Configurar Redis
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

app.use(express.json());

// TODO: Rota principal
app.get('/', (req, res) => {
  res.json({
    message: 'Stack Docker Compose funcionando!',
    services: {
      app: 'ok',
      postgres: 'connected',
      redis: 'connected'
    }
  });
});

// TODO: Health check
app.get('/health', async (req, res) => {
  try {
    // Verificar PostgreSQL
    const pgResult = await pool.query('SELECT NOW()');
    
    // Verificar Redis
    const redisPing = await redisClient.ping();
    
    res.json({
      status: 'healthy',
      services: {
        postgres: pgResult.rows[0] ? 'ok' : 'error',
        redis: redisPing === 'PONG' ? 'ok' : 'error'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});

// TODO: Rota para testar PostgreSQL
app.get('/db/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT version()');
    res.json({
      postgres: 'connected',
      version: result.rows[0].version
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// TODO: Rota para testar Redis
app.get('/cache/test', async (req, res) => {
  try {
    await redisClient.set('test-key', 'Hello Redis!');
    const value = await redisClient.get('test-key');
    
    res.json({
      redis: 'connected',
      testKey: value
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// TODO: Inicializar conexões e servidor
const startServer = async () => {
  try {
    // Conectar Redis
    await redisClient.connect();
    console.log('✓ Redis conectado');
    
    // Testar PostgreSQL
    await pool.query('SELECT NOW()');
    console.log('✓ PostgreSQL conectado');
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✓ Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('✗ Erro ao iniciar:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;
