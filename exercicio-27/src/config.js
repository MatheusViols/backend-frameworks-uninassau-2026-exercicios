require('dotenv').config();

// TODO: Criar objeto de configuração
// Carregar variáveis de ambiente
// Validar variáveis obrigatórias

const config = {
  // TODO: Implementar
  // env: process.env.NODE_ENV || 'development',
  // port: parseInt(process.env.PORT) || 3000,
  // appName: process.env.APP_NAME || 'MyApp',
  // database: {
  //   host: process.env.DB_HOST,
  //   port: parseInt(process.env.DB_PORT),
  //   name: process.env.DB_NAME,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD
  // },
  // api: {
  //   key: process.env.API_KEY,
  //   jwtSecret: process.env.JWT_SECRET
  // }
};

// TODO: Função para validar configuração
const validateConfig = () => {
  // const required = ['DB_HOST', 'DB_NAME', 'JWT_SECRET'];
  // const missing = required.filter(key => !process.env[key]);
  // 
  // if (missing.length > 0) {
  //   throw new Error(`Variáveis obrigatórias ausentes: ${missing.join(', ')}`);
  // }
};

// TODO: Executar validação
// validateConfig();

module.exports = config;
