// TODO: Implemente o servidor e as rotas aqui
//
// Passos: 1. Importar express e ProductController 2. Criar app express 3.
// Configurar middleware para JSON: app.use(express.json()) 4. Criar instância
// do ProductController 5. Definir as rotas: - GET /products ->
// controller.index - GET /products/:id -> controller.show - POST /products ->
// controller.store - PUT /products/:id -> controller.update - DELETE
// /products/:id -> controller.destroy 6. Iniciar servidor na porta 3000 (se
// executado diretamente) 7. Exportar app

const express = require('express');
const productController = require('./controllers/ProductController');


const app = express();
const controller = new productController();

const PORTA = 3000;

app.use(express.json());

app.get('/products', (req, res) => { 
    controller.index(req, res); 
});

app.get('/products/:id', (req, res) => {
    controller.show(req, res);
});

app.post('/products', (req, res) => {
    controller.store(req, res);
});

app.put('/products/:id', (req, res) => {
    controller.update(req, res);
});

app.delete('/products/:id', (req, res) => {
    controller.destroy(req, res);
});
/*

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
    });
*/


module.exports = app;




