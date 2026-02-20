# Exercício 32: Deploy Heroku

## 📝 Objetivo
Preparar aplicação para deploy no Heroku com Procfile, variáveis de ambiente e deploy via CLI.

## 🎯 Requisitos

1. **Procfile** configurado
2. **Deploy via Heroku CLI**
3. **Variáveis de produção** configuradas
4. **Add-ons** (postgres, redis) se necessário
5. **Logs** acessíveis

## 📦 Comandos Heroku

```bash
# Login
heroku login

# Criar app
heroku create myapp

# Deploy
git push heroku main

# Ver logs
heroku logs --tail

# Configurar env
heroku config:set NODE_ENV=production
```

## 📋 Critérios

- [ ] Procfile configurado
- [ ] App deployado com sucesso
- [ ] Variáveis configuradas
- [ ] App acessível via URL
- [ ] Logs funcionando
- [ ] Health check ok

## 💡 Dicas

- Procfile: `web: node src/server.js`
- Use `process.env.PORT` (Heroku define dinamicamente)
- Configure buildpack Node.js
- Use add-ons para database

## 🔗 Recursos

- [Heroku Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
