# Exercício 35: Monitoramento

## 📝 Objetivo
Implementar sistema de monitoramento com health check, métricas básicas (uptime, CPU, memória), alertas e integração opcional com Sentry.

## 🎯 Requisitos

1. **Health check endpoint** (`/health`)
2. **Métricas** (uptime, CPU, memória, requests)
3. **Status do sistema** (database, redis, etc)
4. **Integração Sentry** (opcional)
5. **Dashboard de métricas**

## 📦 Instalação

```bash
npm install
```

## 🧪 Testes

```bash
npm test
```

## 📋 Critérios

- [ ] Health check funcional
- [ ] Métricas coletadas corretamente
- [ ] CPU e memória monitorados
- [ ] Status de dependências
- [ ] Sentry configurado (opcional)
- [ ] Testes cobrindo métricas

## 💡 Dicas

- Use `process.uptime()` para uptime
- `process.memoryUsage()` para memória
- `os.cpus()` e `os.loadavg()` para CPU
- Sentry: `Sentry.init({ dsn: '...' })`

## 🔗 Recursos

- [Node.js Process](https://nodejs.org/api/process.html)
- [Node.js OS](https://nodejs.org/api/os.html)
- [Sentry Node.js](https://docs.sentry.io/platforms/node/)
