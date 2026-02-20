// TODO: Configurar swagger-jsdoc
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuários',
      version: '1.0.0',
      description: 'API REST documentada com Swagger'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento'
      }
    ]
  },
  apis: ['./src/routes/*.js'] // Arquivos com anotações @swagger
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
