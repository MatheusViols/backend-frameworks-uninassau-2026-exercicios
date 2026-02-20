# Solução: Exercício 33 - Deploy Railway

## Setup

1. **Acesse** [railway.app](https://railway.app)
2. **Login** com GitHub
3. **New Project** → Deploy from GitHub repo
4. **Add Database** → PostgreSQL
5. **Configure variáveis** no Dashboard
6. **Deploy** automático em cada push

## railway.json

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

## Variáveis Railway

Railway injeta automaticamente:
- `DATABASE_URL` (PostgreSQL connection string)
- `PORT` (porta do serviço)
- `RAILWAY_ENVIRONMENT` (production, staging, etc)

## CLI Commands

```bash
# Install
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up

# Logs
railway logs

# Open in browser
railway open
```

## 🎓 Conceitos: Railway, managed databases, automatic deployments
