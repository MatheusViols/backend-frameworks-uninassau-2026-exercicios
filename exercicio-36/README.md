# Exercício 36: Projeto Final Integrado - E-commerce API

## 📝 Objetivo
Desenvolver uma API REST completa de e-commerce aplicando TODOS os conceitos aprendidos no curso: autenticação, CRUD, banco de dados, testes, Docker, CI/CD, logging, monitoramento e documentação.

## 🎯 Funcionalidades

### 1. **Autenticação & Autorização**
- Registro de usuários
- Login (JWT)
- Roles (admin, customer)
- Middleware de autenticação

### 2. **Produtos**
- CRUD completo
- Busca e filtros
- Categorias
- Estoque

### 3. **Carrinho de Compras**
- Adicionar/remover itens
- Atualizar quantidades
- Cálculo de total

### 4. **Pedidos**
- Criar pedido
- Listar pedidos do usuário
- Admin: listar todos pedidos
- Status: pending, paid, shipped, delivered

### 5. **Infraestrutura**
- PostgreSQL (dados)
- Redis (cache, sessões)
- Docker Compose
- GitHub Actions CI/CD
- Logs com Winston
- Monitoramento
- Documentação Swagger

## 📦 Instalação

```bash
npm install
docker-compose up -d
npm run migrate
npm run seed
npm start
```

## 🧪 Testes

```bash
npm test              # Todos os testes
npm run test:unit     # Testes unitários
npm run test:integration  # Testes de integração
npm run test:e2e      # Testes end-to-end
```

## 📋 Critérios de Avaliação

### Funcionalidade (40%)
- [ ] Todas as rotas funcionando
- [ ] Validação de dados
- [ ] Tratamento de erros
- [ ] Segurança (JWT, bcrypt, rate limit, helmet)

### Qualidade do Código (30%)
- [ ] Código limpo e organizado
- [ ] Padrões consistentes
- [ ] Comentários quando necessário
- [ ] Sem código duplicado

### Testes (20%)
- [ ] Cobertura > 80%
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Casos de erro testados

### Infraestrutura (10%)
- [ ] Docker funcionando
- [ ] CI/CD configurado
- [ ] Logs estruturados
- [ ] Documentação API

## 🏗️ Estrutura do Projeto

```
src/
├── config/         # Configurações
├── models/         # Models do banco
├── controllers/    # Controllers
├── routes/         # Rotas
├── middlewares/    # Middlewares
├── services/       # Lógica de negócio
├── utils/          # Utilitários
└── app.js          # App Express

tests/
├── unit/           # Testes unitários
├── integration/    # Testes de integração
└── e2e/            # Testes end-to-end

docs/
└── swagger.json    # Documentação API
```

## 📚 Stack Tecnológica

- **Runtime**: Node.js 18+
- **Framework**: Express
- **Database**: PostgreSQL
- **Cache**: Redis
- **Auth**: JWT + bcrypt
- **Validation**: express-validator
- **Testing**: Jest + Supertest
- **Docs**: Swagger/OpenAPI
- **Logs**: Winston
- **Container**: Docker + Docker Compose
- **CI/CD**: GitHub Actions

## 🔗 Endpoints Principais

### Auth
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Perfil do usuário

### Produtos
- `GET /api/products` - Listar produtos
- `GET /api/products/:id` - Buscar produto
- `POST /api/products` - Criar (admin)
- `PUT /api/products/:id` - Atualizar (admin)
- `DELETE /api/products/:id` - Deletar (admin)

### Carrinho
- `GET /api/cart` - Ver carrinho
- `POST /api/cart/items` - Adicionar item
- `PUT /api/cart/items/:id` - Atualizar quantidade
- `DELETE /api/cart/items/:id` - Remover item

### Pedidos
- `GET /api/orders` - Listar pedidos
- `GET /api/orders/:id` - Buscar pedido
- `POST /api/orders` - Criar pedido
- `PUT /api/orders/:id/status` - Atualizar status (admin)

### Sistema
- `GET /health` - Health check
- `GET /metrics` - Métricas
- `GET /api-docs` - Documentação Swagger

## 💡 Dicas

1. **Comece simples**: Auth → Produtos → Carrinho → Pedidos
2. **Teste constantemente**: Escreva testes enquanto desenvolve
3. **Use migrations**: Sequelize/Knex para migrations
4. **Documente**: Swagger para documentar API
5. **Logs estruturados**: Winston com contexto
6. **Variáveis de ambiente**: Nunca hardcode

## 🚀 Deploy

```bash
# Build
docker-compose build

# Up
docker-compose up -d

# Migrations
docker-compose exec app npm run migrate

# Logs
docker-compose logs -f
```

## 📖 Recursos

- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [REST API Design](https://restfulapi.net/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [12 Factor App](https://12factor.net/)
