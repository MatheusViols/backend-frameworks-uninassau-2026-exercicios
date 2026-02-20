# Exercício 10: Autorização RBAC (Role-Based Access Control)

## Objetivo
Implementar controle de acesso baseado em roles (admin, user).

## Requisitos
- Usuários têm role: 'admin' ou 'user'
- Middleware de autorização verifica role
- Admin pode deletar usuários
- User não pode deletar
- Rotas protegidas por role

## Endpoints
- POST /register (cria user comum)
- POST /login (retorna JWT com role)
- GET /users (admin only)
- DELETE /users/:id (admin only)
- GET /profile (autenticado)

## Teste
```bash
# Criar admin (manualmente no código para teste)
# Login como admin
# Deletar usuário (deve funcionar)
# Login como user
# Tentar deletar (deve dar 403 Forbidden)
```
