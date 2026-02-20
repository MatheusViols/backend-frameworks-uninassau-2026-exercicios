# Solução: Exercício 01 - Primeiro Servidor Express

## Código Completo

### src/server.js

```javascript
// 1. Importar o Express
const express = require('express');

// 2. Criar a aplicação Express
const app = express();

// 3. Definir a porta
const PORT = 3000;

// 4. Criar rota GET / que retorna "Hello World"
app.get('/', (req, res) => {
  res.send('Hello World');
});

// 5. Criar rota GET /health que retorna JSON com status ok
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 6. Fazer o servidor escutar na porta 3000
// Só inicia o servidor se este arquivo for executado diretamente
// Isso evita iniciar o servidor durante os testes
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  });
}

// 7. Exportar a aplicação para uso nos testes
module.exports = app;
```

## Explicação Detalhada

### 1. Importação do Express
```javascript
const express = require('express');
```
- Importa o módulo Express que foi instalado via npm
- Express é uma função que, quando executada, retorna uma aplicação

### 2. Criação da Aplicação
```javascript
const app = express();
```
- Cria uma instância da aplicação Express
- `app` é o objeto principal que gerencia rotas, middleware, etc.

### 3. Rota GET /
```javascript
app.get('/', (req, res) => {
  res.send('Hello World');
});
```
- `app.get()` define uma rota que responde a requisições HTTP GET
- Primeiro parâmetro: caminho da rota (`'/'`)
- Segundo parâmetro: função callback com dois argumentos:
  - `req` (request): objeto com informações da requisição
  - `res` (response): objeto usado para enviar a resposta
- `res.send()` envia uma resposta de texto simples

### 4. Rota GET /health
```javascript
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
```
- Rota de health check (comum em aplicações para monitoramento)
- `res.json()` envia uma resposta JSON
- Automaticamente define o header `Content-Type: application/json`
- Converte o objeto JavaScript em string JSON

### 5. Iniciar o Servidor (condicional)
```javascript
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  });
}
```
- `require.main === module`: verifica se este arquivo está sendo executado diretamente
- Se verdadeiro (executando com `node server.js`), inicia o servidor
- Se falso (sendo importado por outro arquivo, como testes), NÃO inicia
- `app.listen()` inicia o servidor na porta especificada
- Callback é executado quando o servidor está pronto

### 6. Exportar a Aplicação
```javascript
module.exports = app;
```
- Exporta a aplicação para que possa ser importada em outros arquivos
- Necessário para os testes poderem importar e testar a aplicação
- Permite reutilização do código

## Conceitos Importantes

### O que é Express?
Express é um framework web minimalista para Node.js que simplifica a criação de servidores HTTP. Ele fornece:
- Sistema de roteamento simples e robusto
- Suporte a middleware
- Gerenciamento de requisições e respostas
- Integração com template engines

### Rotas
Rotas definem como a aplicação responde a requisições em diferentes endpoints (URLs). Estrutura básica:
```javascript
app.MÉTODO(CAMINHO, HANDLER)
```
- **MÉTODO**: get, post, put, delete, etc.
- **CAMINHO**: string representando a URL (`'/'`, `'/users'`, etc.)
- **HANDLER**: função que processa a requisição

### Request (req) e Response (res)
- **req**: contém dados da requisição (headers, params, query, body, etc.)
- **res**: usado para enviar a resposta (res.send, res.json, res.status, etc.)

### Métodos de Resposta
- `res.send(data)`: envia resposta (texto, HTML, Buffer)
- `res.json(object)`: envia resposta JSON
- `res.status(code)`: define o status HTTP (encadeável)
- `res.sendStatus(code)`: envia apenas status

### Portas
- Porta é um número que identifica um processo em rede
- Porta 3000 é comum em desenvolvimento Node.js
- Portas 0-1023 são reservadas (requerem privilégios)
- Portas 1024-49151 são registradas
- Portas 49152-65535 são dinâmicas/privadas

## Testando Manualmente

### Com curl:
```bash
# Testar rota /
curl http://localhost:3000/

# Testar rota /health
curl http://localhost:3000/health

# Com detalhes do header
curl -i http://localhost:3000/health
```

### Com navegador:
- Abra http://localhost:3000
- Abra http://localhost:3000/health

### Com Postman/Insomnia:
- Crie requisição GET para http://localhost:3000
- Crie requisição GET para http://localhost:3000/health

## Erros Comuns

### ❌ Erro: Cannot find module 'express'
**Causa**: Express não está instalado
**Solução**: Execute `npm install`

### ❌ Erro: Port 3000 is already in use
**Causa**: Já existe um processo usando a porta 3000
**Solução**: 
- Pare o processo anterior
- Ou use outra porta: `app.listen(3001, ...)`

### ❌ Erro: app.get is not a function
**Causa**: `app` não foi criado corretamente
**Solução**: Verifique se tem `const app = express()`

### ❌ Testes falhando: "Cannot GET /"
**Causa**: Rota não foi definida ou tem erro de digitação
**Solução**: Verifique o caminho e o método HTTP

## Próximos Passos

Agora que você domina o básico, no próximo exercício você irá:
- Criar múltiplas rotas (POST, PUT, DELETE)
- Organizar código em controllers
- Trabalhar com dados dinâmicos
- Implementar CRUD completo

---

**Parabéns por completar o exercício! 🎉**
