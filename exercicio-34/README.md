# Exercício 34: Logs com Winston

## 📝 Objetivo
Implementar sistema de logging profissional com Winston, incluindo níveis de log, arquivos separados e rotação.

## 🎯 Requisitos

1. **Winston configurado** com transports múltiplos
2. **Níveis** (error, warn, info, debug)
3. **Logs em arquivo** e console
4. **Log rotation** (por tamanho/data)
5. **Formato estruturado** (JSON + timestamp)

## 📦 Instalação

```bash
npm install
```

## 🧪 Testes

```bash
npm test
```

## 📋 Critérios

- [ ] Winston configurado corretamente
- [ ] Logs em múltiplos níveis
- [ ] Console e arquivo funcionando
- [ ] Rotação configurada
- [ ] Formato legível e estruturado
- [ ] Testes verificando logs

## 💡 Dicas

- Use `winston.createLogger()`
- Configure transports separados
- Use `winston-daily-rotate-file`
- Formato: timestamp + level + message + meta

## 🔗 Recursos

- [Winston](https://github.com/winstonjs/winston)
- [Daily Rotate File](https://github.com/winstonjs/winston-daily-rotate-file)
