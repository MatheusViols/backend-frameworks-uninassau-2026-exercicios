# Exercício 28: Dockerfile

## 📝 Objetivo
Criar um Dockerfile otimizado para uma aplicação Node.js, utilizando multi-stage build, .dockerignore e melhores práticas de containerização.

## 🎯 Requisitos

### Funcionalidades
1. **Dockerfile** para aplicação Node.js
2. **Multi-stage build** para otimizar imagem
3. **.dockerignore** para excluir arquivos desnecessários
4. **docker build e run** funcionais
5. **Testes** verificando container

### Tecnologias
- Docker
- Node.js
- Express

## 📦 Comandos Docker

```bash
# Build
docker build -t exercicio-28 .

# Run
docker run -p 3000:3000 exercicio-28

# Run com env vars
docker run -p 3000:3000 -e PORT=3000 exercicio-28
```

## 🧪 Testes

```bash
npm test
```

## 📋 Critérios de Avaliação

- [ ] Dockerfile com multi-stage build
- [ ] Imagem otimizada (menor possível)
- [ ] .dockerignore configurado
- [ ] Container executa aplicação corretamente
- [ ] Healthcheck configurado
- [ ] Testes verificando funcionalidade
- [ ] Documentação clara

## 💡 Dicas

- Use imagem `node:alpine` para menor tamanho
- Copie `package*.json` antes do código
- Use `npm ci` ao invés de `npm install`
- Exponha a porta correta
- Configure USER não-root

## 🔗 Recursos

- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Node.js Docker Guide](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)
