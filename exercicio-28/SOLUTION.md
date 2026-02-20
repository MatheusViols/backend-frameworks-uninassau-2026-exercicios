# Solução: Exercício 28 - Dockerfile

## 📝 Implementação Completa

### Dockerfile

```dockerfile
# Estágio 1: Build (dependências)
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar apenas package files para cache de layers
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm ci --only=production && npm cache clean --force

# Estágio 2: Produção
FROM node:18-alpine

WORKDIR /app

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copiar dependências do build stage
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copiar código da aplicação
COPY --chown=nodejs:nodejs src ./src
COPY --chown=nodejs:nodejs package*.json ./

# Usar usuário não-root
USER nodejs

# Expor porta
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Labels para metadados
LABEL maintainer="seu-email@example.com"
LABEL version="1.0.0"
LABEL description="Aplicação Node.js containerizada"

# Comando para iniciar
CMD ["node", "src/server.js"]
```

### .dockerignore

```
node_modules
npm-debug.log
yarn-error.log
.env
.env.local
.env.*.local
.git
.gitignore
README.md
coverage/
.vscode/
.idea/
*.log
.DS_Store
Dockerfile
.dockerignore
docker-compose.yml
```

### src/server.js (completo)

```javascript
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Aplicação rodando no Docker!',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'production',
    container: true
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage()
  });
});

app.get('/info', (req, res) => {
  res.json({
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    memory: process.memoryUsage(),
    cpuUsage: process.cpuUsage()
  });
});

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✓ Servidor rodando na porta ${PORT}`);
    console.log(`✓ Health check: http://localhost:${PORT}/health`);
    console.log(`✓ Node version: ${process.version}`);
  });
}

module.exports = app;
```

## 🐳 Comandos Docker

### Build
```bash
# Build básico
docker build -t exercicio-28 .

# Build com tag específica
docker build -t exercicio-28:1.0.0 .

# Build sem cache
docker build --no-cache -t exercicio-28 .
```

### Run
```bash
# Run básico
docker run -p 3000:3000 exercicio-28

# Run com variáveis de ambiente
docker run -p 3000:3000 -e PORT=3000 -e NODE_ENV=production exercicio-28

# Run em background (detached)
docker run -d -p 3000:3000 --name app-container exercicio-28

# Run com restart automático
docker run -d -p 3000:3000 --restart unless-stopped exercicio-28
```

### Gerenciamento
```bash
# Ver containers rodando
docker ps

# Ver logs
docker logs app-container

# Parar container
docker stop app-container

# Remover container
docker rm app-container

# Ver imagens
docker images

# Remover imagem
docker rmi exercicio-28
```

### Inspecionar
```bash
# Inspecionar imagem
docker inspect exercicio-28

# Ver tamanho da imagem
docker images exercicio-28

# Ver layers da imagem
docker history exercicio-28

# Executar comando no container
docker exec -it app-container sh
```

## 🎓 Conceitos Aplicados

### 1. **Multi-Stage Build**
- Reduz tamanho da imagem final
- Separa dependências de build e runtime
- Mantém imagem de produção limpa

```dockerfile
FROM node:18-alpine AS builder
# ... build steps ...

FROM node:18-alpine
COPY --from=builder /app/node_modules ./node_modules
```

### 2. **Alpine Linux**
- Imagem base muito menor (~5MB vs ~900MB)
- Menos superfície de ataque
- Mais rápido para pull/push

### 3. **Layer Caching**
```dockerfile
# Copiar package.json primeiro para cache
COPY package*.json ./
RUN npm ci

# Copiar código depois (muda mais frequentemente)
COPY src ./src
```

### 4. **Usuário Não-Root**
```dockerfile
RUN adduser -S nodejs -u 1001
USER nodejs
```

### 5. **Healthcheck**
```dockerfile
HEALTHCHECK --interval=30s CMD node -e "..."
```

## 📊 Otimizações

### Tamanho da Imagem
```bash
# Antes (sem otimizações): ~1GB
node:18

# Depois (com Alpine + multi-stage): ~150MB
node:18-alpine + multi-stage
```

### Boas Práticas Aplicadas
- ✅ Multi-stage build
- ✅ Alpine Linux
- ✅ .dockerignore configurado
- ✅ npm ci ao invés de npm install
- ✅ Usuário não-root
- ✅ Healthcheck configurado
- ✅ Layer caching otimizado
- ✅ Labels para metadados

## 🚀 Melhorias Possíveis

1. **Docker Compose**: Orquestrar múltiplos containers
2. **Environment Files**: Usar `.env` files
3. **Volumes**: Persistir dados
4. **Networks**: Isolar containers
5. **Security Scanning**: Scan de vulnerabilidades
6. **Multi-Architecture**: Build para ARM/AMD64
7. **Registry**: Push para Docker Hub/ECR

## 🔒 Segurança

### Checklist
- [x] Usar imagem oficial do Node.js
- [x] Usuário não-root
- [x] Não incluir secrets na imagem
- [x] .dockerignore configurado
- [x] Minimal base image (Alpine)
- [x] Healthcheck configurado
- [ ] Scan de vulnerabilidades (Trivy, Snyk)
- [ ] Assinar imagens

### Scaneando Vulnerabilidades
```bash
# Usando Trivy
docker run aquasec/trivy image exercicio-28

# Usando Docker Scout
docker scout cves exercicio-28
```

## 📚 Recursos Adicionais

- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Node.js Docker Guide](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)
- [Docker Security](https://docs.docker.com/engine/security/)
