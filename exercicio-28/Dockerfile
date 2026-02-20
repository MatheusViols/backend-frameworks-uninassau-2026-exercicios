# TODO: Criar Dockerfile com multi-stage build

# Estágio 1: Build (dependências)
# FROM node:18-alpine AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci --only=production

# Estágio 2: Produção
# FROM node:18-alpine
# WORKDIR /app
# 
# # Criar usuário não-root
# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nodejs -u 1001
# 
# # Copiar dependências do build stage
# COPY --from=builder /app/node_modules ./node_modules
# 
# # Copiar código da aplicação
# COPY src ./src
# COPY package*.json ./
# 
# # Usar usuário não-root
# USER nodejs
# 
# # Expor porta
# EXPOSE 3000
# 
# # Healthcheck
# HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
#   CMD node -e "require('http').get('http://localhost:3000/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"
# 
# # Comando para iniciar
# CMD ["node", "src/server.js"]
