# Solução: Exercício 35 - Monitoramento

## Implementação Completa

Arquivos completos já fornecidos em src/metrics.js e src/server.js

## Endpoints

- `GET /health` - Status básico
- `GET /metrics` - Todas as métricas
- `GET /metrics/uptime` - Uptime do processo e sistema
- `GET /metrics/memory` - Uso de memória
- `GET /metrics/cpu` - Informações de CPU

## Métricas Coletadas

1. **Uptime**: Process e system uptime
2. **Memória**: RSS, Heap, Total, Free, %
3. **CPU**: Cores, model, speed, load average
4. **Requests**: Total e por segundo

## Integração Sentry (Opcional)

```javascript
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

## 🎓 Conceitos: health checks, metrics collection, system monitoring, observability
