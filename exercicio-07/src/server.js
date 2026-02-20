// TODO: Implementar servidor com views EJS
// const express = require('express');
// const path = require('path');
//
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.urlencoded({ extended: true }));
//
// Rotas:
// GET / - renderizar 'index' com lista de produtos
// GET /create - renderizar 'create'
// POST /products - criar produto e redirecionar para /

let products = [];
let nextId = 1;

