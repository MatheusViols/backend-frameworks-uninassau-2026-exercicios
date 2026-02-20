const app = require('./app');
const config = require('./config');

const PORT = config.port;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✓ E-commerce API rodando na porta ${PORT}`);
  console.log(`✓ Ambiente: ${config.env}`);
  console.log(`✓ Docs: http://localhost:${PORT}/api-docs`);
});
