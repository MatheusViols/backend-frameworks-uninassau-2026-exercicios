# Backend Frameworks - UNINASSAU 2026 - Exercícios 25-36

Exercícios avançados de Backend Frameworks focados em conceitos modernos: WebSockets, segurança, Docker, CI/CD, deployment e projeto final integrado.

## 📚 Lista de Exercícios

### **Exercício 25: WebSockets - Chat em Tempo Real**
- Socket.io configurado
- Sistema de rooms (salas)
- Broadcast de mensagens
- Lista de usuários online
- Eventos personalizados

### **Exercício 26: Rate Limiting & Segurança**
- express-rate-limit (100 req/15min)
- Helmet para headers de segurança
- CORS configurado
- Validação contra XSS
- Sanitização de inputs

### **Exercício 27: Variáveis de Ambiente**
- .env e .env.example
- Carregar com dotenv
- Validação de variáveis obrigatórias
- Múltiplos ambientes (dev, test, prod)
- Módulo config centralizado

### **Exercício 28: Dockerfile**
- Dockerfile para Node.js
- Multi-stage build
- .dockerignore
- Imagem otimizada (Alpine)
- Usuário não-root

### **Exercício 29: Docker Compose**
- Stack com app + PostgreSQL + Redis
- Networks e volumes
- Health checks
- Variáveis de ambiente
- Persistência de dados

### **Exercício 30: CI/CD Básico**
- GitHub Actions workflow
- Testes automatizados
- Linter (ESLint)
- Build success badge
- Cache de dependências

### **Exercício 31: CI/CD Avançado**
- Deploy automático após merge
- Matrix strategy (múltiplas versões Node)
- Múltiplos sistemas operacionais
- Secrets configurados
- Pipeline completo (lint → test → build → deploy)

### **Exercício 32: Deploy Heroku**
- Preparar app para Heroku
- Procfile configurado
- Deploy via Heroku CLI
- Variáveis de produção
- Logs e monitoramento

### **Exercício 33: Deploy Railway**
- Deploy no Railway
- Conexão com GitHub
- Deploy automático
- Banco de dados gerenciado
- railway.json configurado

### **Exercício 34: Logs com Winston**
- Winston configurado
- Múltiplos níveis (error, warn, info, debug)
- Logs em arquivo e console
- Log rotation (daily rotate)
- Formato estruturado (JSON + timestamp)

### **Exercício 35: Monitoramento**
- Health check endpoint
- Métricas (uptime, CPU, memória)
- Coleta de métricas de requests
- Dashboard de métricas
- Integração com Sentry (opcional)

### **Exercício 36: Projeto Final Integrado - E-commerce API** 🏆
API REST completa aplicando TODOS os conceitos do curso:

#### Funcionalidades
- **Auth**: Registro, login, JWT, roles (admin/customer)
- **Produtos**: CRUD completo, busca, filtros, categorias
- **Carrinho**: Adicionar/remover itens, calcular total
- **Pedidos**: Criar, listar, atualizar status

#### Stack Completa
- Express + PostgreSQL + Redis
- JWT + bcrypt
- Docker + Docker Compose
- GitHub Actions CI/CD
- Winston logs
- Swagger documentation
- Jest + Supertest (>80% coverage)
- Helmet + Rate limiting + CORS

#### Infraestrutura
- Containerizado
- CI/CD automatizado
- Logs estruturados
- Monitoramento
- Documentação API

---

## 🚀 Como Usar

### Navegando pelos Exercícios

```bash
cd exercicio-25/  # Entre no exercício desejado
npm install       # Instale dependências
npm test          # Execute testes
npm start         # Inicie aplicação
```

### Estrutura de Cada Exercício

```
exercicio-XX/
├── README.md          # Descrição do exercício e requisitos
├── SOLUTION.md        # Gabarito comentado
├── package.json       # Dependências e scripts
├── src/               # Código fonte
│   └── server.js
├── tests/             # Testes
│   └── *.test.js
├── .gitignore         # Arquivos ignorados
└── (outros arquivos específicos)
```

## 📋 Pré-requisitos

- Node.js 16+ (recomendado 18 LTS)
- npm ou yarn
- Docker & Docker Compose (exercícios 28-29, 36)
- Git
- PostgreSQL (opcional - via Docker)
- Redis (opcional - via Docker)

## 🧪 Executando Testes

```bash
# Teste individual
cd exercicio-XX/
npm test

# Com coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

## 🐳 Exercícios com Docker

Exercícios que usam Docker:

```bash
# Exercício 28 - Dockerfile
docker build -t exercicio-28 .
docker run -p 3000:3000 exercicio-28

# Exercício 29 - Docker Compose
docker-compose up -d
docker-compose logs -f
docker-compose down

# Exercício 36 - Projeto Final
docker-compose up -d
docker-compose exec app npm run migrate
docker-compose exec app npm run seed
```

## 🎯 Roadmap de Aprendizado

### Semana 1-2: Comunicação em Tempo Real e Segurança
- Exercícios 25-27

### Semana 3: Containerização
- Exercícios 28-29

### Semana 4: CI/CD e Deploy
- Exercícios 30-33

### Semana 5: Observabilidade
- Exercícios 34-35

### Semana 6-8: Projeto Final
- Exercício 36

## 💡 Dicas Gerais

1. **Leia o README**: Cada exercício tem instruções específicas
2. **Consulte o SOLUTION.md**: Após tentar, compare com a solução
3. **Testes são importantes**: Escreva testes antes do código
4. **Docker facilita**: Use Docker para isolar ambientes
5. **Variáveis de ambiente**: Nunca hardcode credenciais
6. **Git flow**: Commit frequentemente com mensagens descritivas
7. **Documentação**: Comente código complexo

## 🔧 Troubleshooting

### Porta já em uso
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Docker issues
```bash
# Limpar tudo
docker system prune -a --volumes

# Rebuild containers
docker-compose down -v
docker-compose up --build
```

### Dependências
```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install
```

## 📖 Recursos Adicionais

### Documentação
- [Node.js Docs](https://nodejs.org/docs/)
- [Express Guide](https://expressjs.com/en/guide/)
- [Docker Docs](https://docs.docker.com/)
- [GitHub Actions](https://docs.github.com/actions)

### Tutoriais
- [MDN Web Docs](https://developer.mozilla.org/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [REST API Tutorial](https://restfulapi.net/)

### Ferramentas
- [Postman](https://www.postman.com/) - Testar APIs
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [VS Code](https://code.visualstudio.com/) - Editor recomendado

## 🤝 Contribuindo

Encontrou um erro? Quer sugerir melhorias?

1. Abra uma issue
2. Faça um fork
3. Crie uma branch (`git checkout -b feature/melhoria`)
4. Commit suas mudanças
5. Push para a branch
6. Abra um Pull Request

## 📄 Licença

MIT License - Livre para usar em projetos educacionais e pessoais.

## 👨‍🏫 Sobre

Exercícios desenvolvidos para o curso de Backend Frameworks da UNINASSAU 2026.

**Contato**: [seu-email@example.com]

---

**Bom aprendizado! 🚀**

*Lembre-se: O importante não é apenas fazer os exercícios funcionarem, mas entender os conceitos por trás de cada um.*
