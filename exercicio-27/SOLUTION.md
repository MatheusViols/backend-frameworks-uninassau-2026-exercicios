# Solução: Exercício 27 - Variáveis de Ambiente

## 📝 Implementação Completa

### src/config.js

```javascript
require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  appName: process.env.APP_NAME || 'MyApp',
  
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  
  api: {
    key: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET
  },
  
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  },
  
  features: {
    newUI: process.env.FEATURE_NEW_UI === 'true',
    analytics: process.env.FEATURE_ANALYTICS === 'true'
  }
};

// Validar configuração obrigatória
const validateConfig = () => {
  const required = ['DB_NAME', 'JWT_SECRET'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(
      `Configuração inválida! Variáveis obrigatórias ausentes: ${missing.join(', ')}\n` +
      `Copie .env.example para .env e configure as variáveis.`
    );
  }

  // Validar tipos
  if (isNaN(config.port)) {
    throw new Error('PORT deve ser um número válido');
  }
  
  if (isNaN(config.database.port)) {
    throw new Error('DB_PORT deve ser um número válido');
  }
};

// Executar validação
try {
  validateConfig();
  console.log(`✓ Configuração carregada: ambiente=${config.env}`);
} catch (error) {
  console.error('✗ Erro na configuração:', error.message);
  process.exit(1);
}

module.exports = config;
```

### src/server.js

```javascript
const express = require('express');
const config = require('./config');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: `Bem-vindo ao ${config.appName}!`,
    environment: config.env,
    version: '1.0.0'
  });
});

// Rota para mostrar configuração (sem dados sensíveis!)
app.get('/config', (req, res) => {
  res.json({
    env: config.env,
    appName: config.appName,
    port: config.port,
    database: {
      host: config.database.host,
      port: config.database.port,
      name: config.database.name
      // Password e credenciais NÃO são expostas
    },
    features: config.features
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: config.env
  });
});

const PORT = config.port;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[${config.env.toUpperCase()}] Servidor rodando na porta ${PORT}`);
    console.log(`Banco de dados: ${config.database.host}:${config.database.port}/${config.database.name}`);
  });
}

module.exports = app;
```

### tests/config.test.js

```javascript
const config = require('../src/config');
const request = require('supertest');
const app = require('../src/server');

describe('Environment Variables Tests', () => {
  
  describe('Config Loading', () => {
    test('Deve carregar variáveis de ambiente', () => {
      expect(config).toHaveProperty('env');
      expect(config).toHaveProperty('port');
      expect(config).toHaveProperty('appName');
      expect(config).toHaveProperty('database');
      expect(config).toHaveProperty('api');
    });

    test('Deve ter configuração de database', () => {
      expect(config.database).toHaveProperty('host');
      expect(config.database).toHaveProperty('port');
      expect(config.database).toHaveProperty('name');
      expect(config.database).toHaveProperty('user');
      expect(config.database).toHaveProperty('password');
    });

    test('Deve reconhecer ambiente de test', () => {
      expect(config.env).toBe('test');
    });

    test('Deve ter configurações de API', () => {
      expect(config.api).toHaveProperty('key');
      expect(config.api).toHaveProperty('jwtSecret');
    });
  });

  describe('API Endpoints', () => {
    test('GET / deve retornar informações do app', async () => {
      const response = await request(app).get('/');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('environment');
      expect(response.body.environment).toBe('test');
    });

    test('GET /config deve retornar configuração pública', async () => {
      const response = await request(app).get('/config');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('env');
      expect(response.body).toHaveProperty('database');
      
      // Dados sensíveis NÃO devem ser expostos
      expect(response.body.database).not.toHaveProperty('password');
      expect(response.body.database).not.toHaveProperty('user');
      expect(response.body).not.toHaveProperty('api');
    });

    test('GET /health deve retornar status', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('ok');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('Type Conversion', () => {
    test('PORT deve ser número', () => {
      expect(typeof config.port).toBe('number');
      expect(config.port).toBeGreaterThan(0);
    });

    test('DB_PORT deve ser número', () => {
      expect(typeof config.database.port).toBe('number');
      expect(config.database.port).toBeGreaterThan(0);
    });
  });

  describe('Default Values', () => {
    test('Deve usar valores padrão quando variável não existe', () => {
      expect(config.appName).toBeDefined();
      expect(config.database.host).toBeDefined();
    });

    test('Features devem ser boolean', () => {
      expect(typeof config.features.newUI).toBe('boolean');
      expect(typeof config.features.analytics).toBe('boolean');
    });
  });
});
```

### .env (exemplo real - não commitar!)

```env
NODE_ENV=development
PORT=3000
APP_NAME=MyApp

DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp_dev
DB_USER=postgres
DB_PASSWORD=mysecretpassword

API_KEY=sk-1234567890abcdef
JWT_SECRET=my-super-secret-jwt-key-change-in-production

REDIS_URL=redis://localhost:6379

FEATURE_NEW_UI=true
FEATURE_ANALYTICS=false
```

## 🎓 Conceitos Aplicados

### 1. **dotenv Setup**
```javascript
require('dotenv').config();
```

### 2. **Type Conversion**
```javascript
port: parseInt(process.env.PORT, 10) || 3000
```

### 3. **Boolean Conversion**
```javascript
newUI: process.env.FEATURE_NEW_UI === 'true'
```

### 4. **Validação**
```javascript
const required = ['DB_NAME', 'JWT_SECRET'];
const missing = required.filter(key => !process.env[key]);
if (missing.length > 0) throw new Error(...);
```

### 5. **Segurança**
```javascript
// Nunca exponha senhas ou secrets em APIs públicas
app.get('/config', (req, res) => {
  res.json({
    database: {
      host: config.database.host
      // password: NUNCA!
    }
  });
});
```

## 🌍 Ambientes

### Development
```bash
NODE_ENV=development npm run dev
```

### Test
```bash
NODE_ENV=test npm test
```

### Production
```bash
NODE_ENV=production npm start
```

## 🔒 Segurança

### ✅ Faça
- Use `.env` para dados sensíveis
- Adicione `.env` no `.gitignore`
- Documente variáveis em `.env.example`
- Valide variáveis obrigatórias
- Use diferentes `.env` por ambiente

### ❌ Não Faça
- Commitar `.env` no Git
- Expor senhas/secrets em logs ou APIs
- Usar valores hardcoded
- Compartilhar credenciais em plain text

## 🚀 Melhorias Possíveis

1. **Schema Validation**: Joi ou Yup para validar schema completo
2. **Encrypted Secrets**: Usar KMS ou Vault
3. **Environment Profiles**: Carregar `.env.{NODE_ENV}`
4. **Type Safety**: TypeScript para type checking
5. **Remote Config**: AWS Parameter Store, Consul
6. **Secrets Rotation**: Rotacionar secrets automaticamente

## 📚 Recursos Adicionais

- [The Twelve-Factor App - Config](https://12factor.net/config)
- [dotenv Documentation](https://www.npmjs.com/package/dotenv)
- [Environment Variables Best Practices](https://www.doppler.com/blog/environment-variables-best-practices)
