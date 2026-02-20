# Exercício 31: CI/CD Avançado

## 📝 Objetivo
Pipeline CI/CD completo com deploy automático, testes em múltiplas versões Node, matrix strategy e secrets configurados.

## 🎯 Requisitos

1. **Deploy automático** após merge na main
2. **Testes em múltiplas versões** Node (16, 18, 20)
3. **Matrix strategy** para diferentes ambientes
4. **Secrets** configurados (API keys, tokens)
5. **Stages**: lint → test → build → deploy

## 📦 Comandos

```bash
npm install
npm test
npm run build
```

## 📋 Critérios

- [ ] Pipeline com múltiplos stages
- [ ] Matrix para Node versions e OS
- [ ] Deploy automático configurado
- [ ] Secrets gerenciados corretamente
- [ ] Notifications configuradas
- [ ] Rollback strategy

## 💡 Dicas

- Use `if: github.ref == 'refs/heads/main'` para deploy
- Configure secrets em Settings → Secrets
- Use `needs` para dependências entre jobs
- Cache node_modules para velocidade

## 🔗 Recursos

- [GitHub Actions Advanced](https://docs.github.com/actions/learn-github-actions)
- [Encrypted Secrets](https://docs.github.com/actions/security-guides/encrypted-secrets)
