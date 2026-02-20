# Exercício 05: Validação com Express Validator

## Objetivo
Implementar validação de formulários usando express-validator.

## Requisitos

1. **Rota de Registro**
   - POST `/register`
   - Campos: name, email, password

2. **Validações**
   - **name**: obrigatório
   - **email**: obrigatório, formato de email válido
   - **password**: obrigatório, mínimo 6 caracteres

3. **Retorno**
   - Sucesso (201): `{ message: 'Usuário registrado', user: {...} }`
   - Erro (400): `{ errors: [{field, message}] }`

## Comandos

```bash
npm install
npm start
npm test
```

## Teste Manual

```bash
# Válido
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"name":"João","email":"joao@email.com","password":"senha123"}'

# Inválido - email
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"name":"João","email":"invalido","password":"senha123"}'
```
