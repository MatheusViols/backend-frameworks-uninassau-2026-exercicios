const express = require('express');
const config = require('./config');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: `Bem-vindo ao ${config.appName}!`,
    environment: config.env
  });
});

// TODO: Rota para mostrar configuração (sem dados sensíveis!)
app.get('/config', (req, res) => {
  // Retornar apenas dados não sensíveis
  res.json({
    env: config.env,
    appName: config.appName,
    port: config.port,
    database: {
      host: config.database.host,
      port: config.database.port,
      name: config.database.name
      // NÃO incluir password!
    }
  });
});

const PORT = config.port;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[${config.env}] Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
