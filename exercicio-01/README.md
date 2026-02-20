# Exercício 01: Primeiro Servidor Express

## Objetivo
Criar seu primeiro servidor HTTP usando Express.js com rotas básicas.

## Descrição
Você irá construir um servidor web simples que responde a requisições HTTP. Este é o ponto de partida para qualquer aplicação backend com Node.js e Express.

## Requisitos

### Funcionalidades Obrigatórias

1. **Servidor HTTP na porta 3000**
   - Criar servidor Express rodando na porta 3000
   - Exibir mensagem no console quando o servidor iniciar

2. **Rota GET /**
   - Caminho: `/`
   - Método: GET
   - Resposta: String "Hello World"
   - Status: 200

3. **Rota GET /health**
   - Caminho: `/health`
   - Método: GET
   - Resposta: JSON `{ "status": "ok" }`
   - Status: 200

## Estrutura de Arquivos

```
exercicio-01/
├── src/
│   └── server.js       # Seu código aqui
├── tests/
│   └── server.test.js  # Testes (já implementados)
├── package.json
└── README.md
```

## Instruções

### Passo 1: Instalar Dependências
```bash
npm install
```

### Passo 2: Implementar o Servidor
Edite o arquivo `src/server.js` e implemente:
- Importar Express
- Criar aplicação Express
- Criar rota GET / que retorna "Hello World"
- Criar rota GET /health que retorna JSON com status ok
- Fazer o servidor escutar na porta 3000
- Exportar a aplicação (para testes)

### Passo 3: Executar o Servidor
```bash
npm start
```

Acesse no navegador:
- http://localhost:3000 → deve exibir "Hello World"
- http://localhost:3000/health → deve exibir `{"status":"ok"}`

### Passo 4: Executar os Testes
```bash
npm test
```

Todos os testes devem passar! ✅

## Critérios de Avaliação

- [ ] Servidor Express criado corretamente
- [ ] Rota / retorna "Hello World"
- [ ] Rota /health retorna JSON com status ok
- [ ] Servidor roda na porta 3000
- [ ] Aplicação exportada corretamente
- [ ] Todos os testes passando

## Dicas

💡 **Express básico:**
```javascript
const express = require('express');
const app = express();

app.get('/rota', (req, res) => {
  res.send('Resposta');
});

app.listen(3000, () => {
  console.log('Servidor rodando...');
});
```

💡 **Responder JSON:**
```javascript
res.json({ chave: 'valor' });
```

💡 **Não esqueça de exportar:**
```javascript
module.exports = app;
```

## Recursos

- [Express.js - Getting Started](https://expressjs.com/en/starter/hello-world.html)
- [Node.js HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

---

**Boa sorte! 🚀**
