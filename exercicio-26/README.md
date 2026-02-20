# Exercício 26: Rate Limiting & Segurança

## 📝 Objetivo
Implementar camadas de segurança em uma API Express, incluindo rate limiting, headers de segurança, CORS e proteção contra XSS.

## 🎯 Requisitos

### Funcionalidades
1. **Rate Limiting** com express-rate-limit (max 100 requisições por 15 minutos)
2. **Helmet** para configurar headers de segurança
3. **CORS** configurado adequadamente
4. **Validação contra XSS** nos inputs
5. **Sanitização de dados**

### Tecnologias
- Express
- express-rate-limit
- helmet
- cors
- express-validator

## 📦 Instalação

```bash
npm install
```

## 🚀 Execução

```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 🧪 Testes

```bash
npm test
```

## 📋 Critérios de Avaliação

- [ ] Rate limiting funcionando (máximo 100 req/15min)
- [ ] Helmet configurado com headers corretos
- [ ] CORS permitindo apenas origens específicas
- [ ] Validação e sanitização de inputs
- [ ] Proteção contra ataques XSS
- [ ] Testes cobrindo todos os cenários de segurança
- [ ] Mensagens de erro apropriadas

## 💡 Dicas

- Use `express-rate-limit` com `windowMs` e `max`
- Configure Helmet com opções personalizadas
- CORS deve aceitar apenas origens confiáveis
- Use `express-validator` para sanitizar inputs
- Teste ultrapassando o limite de requisições

## 🔗 Recursos

- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- [Helmet.js](https://helmetjs.github.io/)
- [CORS](https://expressjs.com/en/resources/middleware/cors.html)
- [express-validator](https://express-validator.github.io/)
