const express = require('express');
const metrics = require('./metrics');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middleware para contar requests
app.use((req, res, next) => {
  metrics.incrementRequests();
  next();
});

app.get('/', (req, res) => {
  res.json({
    message: 'Sistema de Monitoramento',
    version: '1.0.0'
  });
});

app.get('/health', (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  };
  
  res.json(health);
});

app.get('/metrics', (req, res) => {
  res.json({
    timestamp: new Date().toISOString(),
    ...metrics.getMetrics()
  });
});

app.get('/metrics/uptime', (req, res) => {
  res.json(metrics.getUptime());
});

app.get('/metrics/memory', (req, res) => {
  res.json(metrics.getMemory());
});

app.get('/metrics/cpu', (req, res) => {
  res.json(metrics.getCPU());
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✓ Server running on port ${PORT}`);
    console.log(`✓ Health: http://localhost:${PORT}/health`);
    console.log(`✓ Metrics: http://localhost:${PORT}/metrics`);
  });
}

module.exports = app;
