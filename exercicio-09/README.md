# Exercício 09: Autenticação JWT

## Objetivo
Implementar autenticação com JSON Web Tokens.

## Requisitos
- POST /register - Criar usuário (hash de senha)
- POST /login - Retornar JWT
- GET /profile - Rota protegida (requer token)
- Middleware para verificar token

## Dependências
```bash
npm install jsonwebtoken bcrypt
```

## Teste
```bash
# Registrar
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"senha123"}'

# Login (recebe token)
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@test.com","password":"senha123"}'

# Acessar rota protegida
curl -H "Authorization: Bearer SEU_TOKEN" http://localhost:3000/profile
```
