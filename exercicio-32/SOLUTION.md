# Solução: Exercício 32 - Deploy Heroku

## Deploy Steps

```bash
# 1. Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# 2. Login
heroku login

# 3. Create app
heroku create my-app-name

# 4. Set env vars
heroku config:set NODE_ENV=production
heroku config:set API_KEY=your-key

# 5. Deploy
git push heroku main

# 6. Open app
heroku open

# 7. View logs
heroku logs --tail
```

## Procfile
```
web: node src/server.js
```

## Important
- Use `process.env.PORT`
- Set engines in package.json
- Configure buildpack if needed
- Use Heroku Postgres add-on for database

## Heroku Commands
```bash
heroku ps               # Check dynos
heroku restart          # Restart app
heroku config           # View env vars
heroku logs --tail      # Stream logs
heroku run bash         # Run commands
```

## 🎓 Conceitos: PaaS, Procfile, dynos, add-ons, buildpacks
