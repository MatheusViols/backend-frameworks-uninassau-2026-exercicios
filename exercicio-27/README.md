# Exercício 27: Variáveis de Ambiente

## 📝 Objetivo
Gerenciar configurações da aplicação usando variáveis de ambiente com dotenv, validação de variáveis obrigatórias e suporte a múltiplos ambientes (dev, test, prod).

## 🎯 Requisitos

### Funcionalidades
1. **Criar arquivos** `.env` e `.env.example`
2. **Carregar variáveis** com dotenv
3. **Validar variáveis obrigatórias** ao iniciar
4. **Suportar diferentes ambientes** (development, test, production)
5. **Acessar variáveis** de forma segura no código

### Tecnologias
- dotenv
- Express

## 📦 Instalação

```bash
npm install
```

## 🚀 Execução

```bash
# Desenvolvimento
npm run dev

# Produção
NODE_ENV=production npm start

# Testes
npm test
```

## 🧪 Testes

```bash
npm test
```

## 📋 Critérios de Avaliação

- [ ] `.env.example` documentado com todas as variáveis
- [ ] Variáveis carregadas corretamente
- [ ] Validação de variáveis obrigatórias
- [ ] Diferentes configurações por ambiente
- [ ] Valores padrão sensatos
- [ ] Testes verificando carregamento de variáveis
- [ ] `.env` no `.gitignore`

## 💡 Dicas

- Use `dotenv.config()` no início do app
- Valide variáveis antes de iniciar o servidor
- Crie um módulo `config.js` para centralizar
- Use `process.env.NODE_ENV` para ambientes
- Nunca commite `.env` no Git!

## 🔗 Recursos

- [dotenv](https://www.npmjs.com/package/dotenv)
- [The Twelve-Factor App - Config](https://12factor.net/config)
