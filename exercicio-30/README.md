# Exercício 30: CI/CD Básico

## 📝 Objetivo
Implementar pipeline CI/CD básico com GitHub Actions para rodar testes automaticamente, linter e badge de status.

## 🎯 Requisitos

1. **GitHub Actions workflow** (.github/workflows/ci.yml)
2. **Rodar testes** automaticamente em cada push
3. **Linter** (ESLint)
4. **Build status badge** no README
5. **Executar em múltiplos ambientes**

## 📦 Instalação

```bash
npm install
```

## 🧪 Testes

```bash
npm test
npm run lint
```

## 📋 Critérios de Avaliação

- [ ] Workflow configurado corretamente
- [ ] Testes executam automaticamente
- [ ] Linter configurado e funcionando
- [ ] Badge de status no README
- [ ] Pipeline executa em pull requests
- [ ] Notificações de falha configuradas

## 💡 Dicas

- Use `actions/checkout@v3` e `actions/setup-node@v3`
- Configure cache para node_modules
- Use matriz para testar múltiplas versões do Node
- Badge: `[![CI](https://github.com/user/repo/actions/workflows/ci.yml/badge.svg)](link)`

## 🔗 Recursos

- [GitHub Actions Docs](https://docs.github.com/actions)
- [Node.js CI Workflow](https://docs.github.com/actions/automating-builds-and-tests/building-and-testing-nodejs)
