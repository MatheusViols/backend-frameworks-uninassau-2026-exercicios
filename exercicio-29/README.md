# Exercício 29: Docker Compose

## 📝 Objetivo
Criar um stack completo com Docker Compose incluindo aplicação Node.js, PostgreSQL e Redis, com networks, volumes e variáveis de ambiente.

## 🎯 Requisitos

### Funcionalidades
1. **docker-compose.yml** com 3 serviços (app, postgres, redis)
2. **Networks** para comunicação entre containers
3. **Volumes** para persistência de dados
4. **Variáveis de ambiente** configuradas
5. **Health checks** para todos os serviços

### Tecnologias
- Docker Compose
- Node.js + Express
- PostgreSQL
- Redis

## 📦 Comandos

```bash
# Iniciar stack
docker-compose up

# Iniciar em background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down

# Parar e remover volumes
docker-compose down -v
```

## 🧪 Testes

```bash
npm test
```

## 📋 Critérios de Avaliação

- [ ] docker-compose.yml completo e funcional
- [ ] 3 serviços configurados corretamente
- [ ] Networks para isolamento
- [ ] Volumes para persistência
- [ ] Environment variables configuradas
- [ ] Health checks funcionando
- [ ] Documentação clara

## 💡 Dicas

- Use `depends_on` para ordem de inicialização
- Configure `restart: unless-stopped`
- Use volumes nomeados para dados
- Configure health checks para cada serviço
- Teste conexões entre containers

## 🔗 Recursos

- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Compose File Reference](https://docs.docker.com/compose/compose-file/)
- [Networking in Compose](https://docs.docker.com/compose/networking/)
