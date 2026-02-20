const express = require('express');
const logger = require('./logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    method: req.method,
    url: req.url,
    ip: req.ip
  });
  next();
});

app.get('/', (req, res) => {
  logger.info('Rota principal acessada');
  res.json({ message: 'Winston Logging funcionando!' });
});

app.get('/error', (req, res) => {
  logger.error('Erro simulado', { code: 'TEST_ERROR' });
  res.status(500).json({ error: 'Erro simulado' });
});

app.get('/warn', (req, res) => {
  logger.warn('Aviso simulado', { code: 'TEST_WARN' });
  res.json({ message: 'Warning logged' });
});

app.get('/debug', (req, res) => {
  logger.debug('Debug info', { data: { foo: 'bar' } });
  res.json({ message: 'Debug logged' });
});

// Error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    url: req.url
  });
  res.status(500).json({ error: 'Internal server error' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
  });
}

module.exports = app;
