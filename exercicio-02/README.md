# Exercício 02: Rotas e Controllers

## Objetivo
Criar uma API REST com CRUD completo separando lógica de negócio em Controllers.

## Descrição
Você irá construir uma API para gerenciar produtos, implementando todas as operações CRUD (Create, Read, Update, Delete) e organizando o código usando o padrão Controller.

## Requisitos

### Funcionalidades Obrigatórias

1. **Estrutura de Dados**
   - Array em memória para armazenar produtos
   - Produto: `{ id, name, price, stock }`
   - IDs gerados automaticamente (incrementais)

2. **Rotas da API**

   | Método | Rota | Descrição |
   |--------|------|-----------|
   | GET | `/products` | Listar todos os produtos |
   | GET | `/products/:id` | Buscar produto por ID |
   | POST | `/products` | Criar novo produto |
   | PUT | `/products/:id` | Atualizar produto existente |
   | DELETE | `/products/:id` | Deletar produto |

3. **ProductController**
   - Separar toda lógica de negócio em um controller
   - Métodos: `index()`, `show()`, `store()`, `update()`, `destroy()`
   - Validações básicas (campos obrigatórios)

4. **Respostas da API**
   - Usar códigos HTTP apropriados (200, 201, 404, 400)
   - Retornar JSON em todas as respostas
   - Mensagens de erro claras

## Estrutura de Arquivos

```
exercicio-02/
├── src/
│   ├── controllers/
│   │   └── ProductController.js  # Controller com lógica CRUD
│   └── server.js                  # Servidor e rotas
├── tests/
│   └── products.test.js           # Testes
├── package.json
└── README.md
```

## Instruções

### Passo 1: Instalar Dependências
```bash
npm install
```

### Passo 2: Implementar ProductController
Edite `src/controllers/ProductController.js`:
- Criar array para armazenar produtos
- Implementar método `index()` - retornar todos os produtos
- Implementar método `show()` - retornar produto por ID
- Implementar método `store()` - criar produto
- Implementar método `update()` - atualizar produto
- Implementar método `destroy()` - deletar produto

### Passo 3: Implementar Server
Edite `src/server.js`:
- Configurar Express para receber JSON
- Criar rotas para cada operação CRUD
- Conectar rotas aos métodos do controller

### Passo 4: Executar o Servidor
```bash
npm start
```

### Passo 5: Testar a API

**Criar produto:**
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Notebook","price":2500,"stock":10}'
```

**Listar produtos:**
```bash
curl http://localhost:3000/products
```

**Buscar por ID:**
```bash
curl http://localhost:3000/products/1
```

**Atualizar produto:**
```bash
curl -X PUT http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Notebook Dell","price":2800,"stock":8}'
```

**Deletar produto:**
```bash
curl -X DELETE http://localhost:3000/products/1
```

### Passo 6: Executar os Testes
```bash
npm test
```

## Critérios de Avaliação

- [ ] ProductController implementado corretamente
- [ ] Todas as 5 rotas funcionando
- [ ] CRUD completo funcional
- [ ] Validações de campos obrigatórios
- [ ] Códigos HTTP apropriados
- [ ] Tratamento de erros (produto não encontrado)
- [ ] Todos os testes passando

## Dicas

💡 **Middleware para JSON:**
```javascript
app.use(express.json());
```

💡 **Estrutura de um Controller:**
```javascript
class ProductController {
  index(req, res) {
    // Listar todos
  }
  
  show(req, res) {
    // Buscar por ID
  }
  
  store(req, res) {
    // Criar novo
  }
  
  update(req, res) {
    // Atualizar
  }
  
  destroy(req, res) {
    // Deletar
  }
}
```

💡 **Parâmetros de Rota:**
```javascript
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
});
```

💡 **Corpo da Requisição:**
```javascript
app.post('/products', (req, res) => {
  const { name, price, stock } = req.body;
});
```

💡 **Códigos HTTP:**
- 200: OK (sucesso geral)
- 201: Created (recurso criado)
- 400: Bad Request (dados inválidos)
- 404: Not Found (recurso não encontrado)

## Recursos

- [Express Routing](https://expressjs.com/en/guide/routing.html)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [REST API Best Practices](https://restfulapi.net/)

---

**Boa sorte! 🚀**
