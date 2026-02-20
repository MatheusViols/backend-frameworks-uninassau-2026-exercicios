# Exercício 04: Middlewares Customizados

## Objetivo
Criar middlewares personalizados para logging, autenticação e tratamento de erros.

## Descrição
Middlewares são funções que têm acesso aos objetos de requisição (req), resposta (res) e à próxima função middleware (next). Você irá implementar middlewares essenciais para aplicações Express.

## Requisitos

### Funcionalidades Obrigatórias

1. **Middleware de Logging**
   - Registrar cada requisição (método, URL, timestamp)
   - Exibir no console em formato legível
   - Calcular tempo de resposta

2. **Middleware de Autenticação**
   - Verificar header `x-api-key`
   - API key válida: `"minha-chave-secreta-123"`
   - Bloquear requisições sem/com key inválida
   - Retornar 401 Unauthorized

3. **Middleware de Error Handling**
   - Capturar erros de toda aplicação
   - Retornar JSON formatado com erro
   - Diferentes tratamentos para dev/prod
   - Status code apropriado

4. **Rotas para Testar**
   - GET `/` - rota pública
   - GET `/protected` - rota protegida (requer autenticação)
   - GET `/error` - rota que gera erro (para testar error handler)

## Estrutura de Arquivos

```
exercicio-04/
├── src/
│   ├── middlewares/
│   │   ├── logger.js
│   │   ├── auth.js
│   │   └── errorHandler.js
│   └── server.js
├── tests/
│   └── middlewares.test.js
├── package.json
└── README.md
```

## Instruções

### Passo 1: Instalar Dependências
```bash
npm install
```

### Passo 2: Implementar Middleware de Logging
Edite `src/middlewares/logger.js`:
- Capturar req.method, req.url
- Registrar timestamp
- Calcular tempo de resposta
- Exibir no console

### Passo 3: Implementar Middleware de Autenticação
Edite `src/middlewares/auth.js`:
- Verificar header `x-api-key`
- Se ausente ou inválido: retornar 401
- Se válido: chamar `next()`

### Passo 4: Implementar Error Handler
Edite `src/middlewares/errorHandler.js`:
- Capturar erro com 4 parâmetros (err, req, res, next)
- Retornar JSON com mensagem e stack (se dev)
- Usar status code do erro ou 500

### Passo 5: Configurar Server
Edite `src/server.js`:
- Aplicar logger em todas as rotas
- Aplicar auth apenas em rotas protegidas
- Criar rotas de teste
- Aplicar error handler por último

### Passo 6: Testar
```bash
npm start
```

```bash
# Rota pública
curl http://localhost:3000/

# Rota protegida sem auth (deve dar 401)
curl http://localhost:3000/protected

# Rota protegida com auth (deve funcionar)
curl -H "x-api-key: minha-chave-secreta-123" http://localhost:3000/protected

# Testar error handler
curl http://localhost:3000/error
```

### Passo 7: Executar Testes
```bash
npm test
```

## Critérios de Avaliação

- [ ] Logger registra todas as requisições
- [ ] Logger exibe tempo de resposta
- [ ] Auth bloqueia requisições sem API key
- [ ] Auth aceita API key válida
- [ ] Error handler captura erros
- [ ] Error handler retorna JSON formatado
- [ ] Middlewares na ordem correta
- [ ] Todos os testes passando

## Dicas

💡 **Estrutura de um Middleware:**
```javascript
function middleware(req, res, next) {
  // Fazer algo
  next(); // Chamar próximo middleware
}
```

💡 **Bloquear requisição:**
```javascript
function auth(req, res, next) {
  if (!authorized) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}
```

💡 **Error Handler (4 parâmetros):**
```javascript
function errorHandler(err, req, res, next) {
  res.status(err.status || 500).json({ error: err.message });
}
```

💡 **Aplicar middleware global:**
```javascript
app.use(logger);
```

💡 **Aplicar em rota específica:**
```javascript
app.get('/protected', auth, (req, res) => { ... });
```

💡 **Error handler sempre por último:**
```javascript
// Rotas...
app.use(errorHandler); // Por último!
```

💡 **Capturar tempo de resposta:**
```javascript
const start = Date.now();
res.on('finish', () => {
  const duration = Date.now() - start;
});
```

## Recursos

- [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [Error Handling](https://expressjs.com/en/guide/error-handling.html)
- [Writing Middleware](https://expressjs.com/en/guide/writing-middleware.html)

---

**Boa sorte! 🚀**
