# Exercício 33: Deploy Railway

## 📝 Objetivo
Deploy no Railway com conexão GitHub, deploy automático e banco de dados gerenciado.

## 🎯 Requisitos

1. **Deploy no Railway**
2. **Conectar repositório GitHub**
3. **Deploy automático** em cada push
4. **Banco de dados gerenciado** (PostgreSQL)
5. **Variáveis configuradas**

## 📦 Setup

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Init project
railway init

# Deploy
railway up
```

## 📋 Critérios

- [ ] App deployado no Railway
- [ ] GitHub conectado
- [ ] Deploy automático funcionando
- [ ] Database provisionado
- [ ] Variáveis configuradas
- [ ] App acessível publicamente

## 💡 Dicas

- Railway detecta Node.js automaticamente
- Use Railway Dashboard para configurar
- Variáveis são injetadas automaticamente
- Use `railway.json` para customizações

## 🔗 Recursos

- [Railway Docs](https://docs.railway.app/)
- [Railway + Node.js](https://docs.railway.app/guides/nodejs)
