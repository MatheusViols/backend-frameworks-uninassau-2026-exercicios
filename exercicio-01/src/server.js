// TODO: Implemente seu servidor Express aqui
// 
// Passos:
// 1. Importar o express
// 2. Criar a aplicação express
// 3. Criar rota GET / que retorna "Hello World"
// 4. Criar rota GET /health que retorna { status: "ok" }
// 5. Fazer o servidor escutar na porta 3000
// 6. Exportar a aplicação (module.exports = app)

const express = require('express');
const app = express();
const porta = 3000;

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.get('/health', (req, res) => {
	res.json({ status : "ok" });
});

app.listen(porta, () => {
	console.log(`Exercicio concluido, servidor rodando na porta: ${porta}`);
});

module.exports = app;
