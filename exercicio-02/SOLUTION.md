# Solução: Exercício 02 - Rotas e Controllers

## Código Completo

### src/controllers/ProductController.js

```javascript
// Array para armazenar produtos em memória
let products = [];
// Contador para IDs
let nextId = 1;

class ProductController {
  /**
   * GET /products
   * Retorna todos os produtos
   */
  index(req, res) {
    return res.json(products);
  }

  /**
   * GET /products/:id
   * Retorna um produto específico por ID
   */
  show(req, res) {
    const id = parseInt(req.params.id);
    
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return res.status(404).json({ 
        error: 'Produto não encontrado' 
      });
    }
    
    return res.json(product);
  }

  /**
   * POST /products
   * Cria um novo produto
   */
  store(req, res) {
    const { name, price, stock } = req.body;
    
    // Validar campos obrigatórios
    if (!name || price === undefined || stock === undefined) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios: name, price, stock' 
      });
    }
    
    // Validar tipos
    if (typeof price !== 'number' || typeof stock !== 'number') {
      return res.status(400).json({ 
        error: 'price e stock devem ser números' 
      });
    }
    
    // Validar valores positivos
    if (price < 0 || stock < 0) {
      return res.status(400).json({ 
        error: 'price e stock devem ser valores positivos' 
      });
    }
    
    // Criar produto
    const newProduct = {
      id: nextId++,
      name,
      price,
      stock
    };
    
    products.push(newProduct);
    
    return res.status(201).json(newProduct);
  }

  /**
   * PUT /products/:id
   * Atualiza um produto existente
   */
  update(req, res) {
    const id = parseInt(req.params.id);
    const { name, price, stock } = req.body;
    
    // Buscar produto
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return res.status(404).json({ 
        error: 'Produto não encontrado' 
      });
    }
    
    // Validar campos obrigatórios
    if (!name || price === undefined || stock === undefined) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios: name, price, stock' 
      });
    }
    
    // Validar tipos
    if (typeof price !== 'number' || typeof stock !== 'number') {
      return res.status(400).json({ 
        error: 'price e stock devem ser números' 
      });
    }
    
    // Atualizar produto
    products[productIndex] = {
      id, // Mantém o ID original
      name,
      price,
      stock
    };
    
    return res.json(products[productIndex]);
  }

  /**
   * DELETE /products/:id
   * Deleta um produto
   */
  destroy(req, res) {
    const id = parseInt(req.params.id);
    
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return res.status(404).json({ 
        error: 'Produto não encontrado' 
      });
    }
    
    // Remover produto do array
    const deletedProduct = products.splice(productIndex, 1)[0];
    
    return res.json({ 
      message: 'Produto deletado com sucesso',
      product: deletedProduct
    });
  }
}

module.exports = new ProductController();
```

### src/server.js

```javascript
const express = require('express');
const ProductController = require('./controllers/ProductController');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rotas de produtos
app.get('/products', ProductController.index);
app.get('/products/:id', ProductController.show);
app.post('/products', ProductController.store);
app.put('/products/:id', ProductController.update);
app.delete('/products/:id', ProductController.destroy);

// Iniciar servidor (apenas se executado diretamente)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;
```

## Explicação Detalhada

### 1. Estrutura do Controller

```javascript
class ProductController {
  index(req, res) { }    // Listar todos
  show(req, res) { }     // Buscar um
  store(req, res) { }    // Criar
  update(req, res) { }   // Atualizar
  destroy(req, res) { }  // Deletar
}
```

Esta é a convenção de nomenclatura do padrão MVC/REST:
- **index**: GET /resource → lista todos
- **show**: GET /resource/:id → mostra um
- **store**: POST /resource → cria novo
- **update**: PUT/PATCH /resource/:id → atualiza
- **destroy**: DELETE /resource/:id → deleta

### 2. Armazenamento em Memória

```javascript
let products = [];
let nextId = 1;
```

- **products**: array que simula um banco de dados
- **nextId**: contador para gerar IDs únicos auto-incrementais
- **Importante**: dados são perdidos quando o servidor reinicia (volátil)

### 3. Método index() - Listar Todos

```javascript
index(req, res) {
  return res.json(products);
}
```

- Simples: retorna todo o array
- Status 200 (padrão)
- Sempre retorna array, mesmo vazio `[]`

### 4. Método show() - Buscar por ID

```javascript
show(req, res) {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  
  return res.json(product);
}
```

**Pontos importantes:**
- `req.params.id`: captura o ID da URL
- `parseInt()`: converte string para número
- `find()`: busca no array
- Retorna 404 se não encontrado
- Retorna 200 com o produto se encontrado

### 5. Método store() - Criar Produto

```javascript
store(req, res) {
  const { name, price, stock } = req.body;
  
  // Validações
  if (!name || price === undefined || stock === undefined) {
    return res.status(400).json({ error: 'Campos obrigatórios...' });
  }
  
  if (typeof price !== 'number' || typeof stock !== 'number') {
    return res.status(400).json({ error: 'price e stock devem ser números' });
  }
  
  // Criar produto
  const newProduct = {
    id: nextId++,
    name,
    price,
    stock
  };
  
  products.push(newProduct);
  
  return res.status(201).json(newProduct);
}
```

**Validações implementadas:**
1. Campos obrigatórios presentes
2. Tipos corretos (price e stock são números)
3. Valores positivos

**Status 201**: "Created" - indica que um novo recurso foi criado

**nextId++**: pós-incremento
- Usa o valor atual
- Depois incrementa para próximo

### 6. Método update() - Atualizar Produto

```javascript
update(req, res) {
  const id = parseInt(req.params.id);
  const { name, price, stock } = req.body;
  
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  
  // Validações...
  
  products[productIndex] = {
    id, // Mantém ID original
    name,
    price,
    stock
  };
  
  return res.json(products[productIndex]);
}
```

**Diferenças do show():**
- Usa `findIndex()` em vez de `find()`
- Precisa do índice para substituir no array
- Mantém o ID original (não cria novo)
- Aplica mesmas validações do store()

### 7. Método destroy() - Deletar Produto

```javascript
destroy(req, res) {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Produto não encontrado' });
  }
  
  const deletedProduct = products.splice(productIndex, 1)[0];
  
  return res.json({ 
    message: 'Produto deletado com sucesso',
    product: deletedProduct
  });
}
```

**splice()**: remove elementos do array
- `splice(index, quantidade)`
- Retorna array com elementos removidos
- `[0]` pega o primeiro (e único) elemento removido

### 8. Configuração do Express

```javascript
app.use(express.json());
```

**Middleware essencial!**
- Parseia o body das requisições JSON
- Sem ele, `req.body` seria undefined
- Deve vir ANTES das rotas

### 9. Definição das Rotas

```javascript
app.get('/products', ProductController.index);
app.get('/products/:id', ProductController.show);
app.post('/products', ProductController.store);
app.put('/products/:id', ProductController.update);
app.delete('/products/:id', ProductController.destroy);
```

**Ordem importa:**
- Rotas mais específicas devem vir antes
- `/products/:id` depois de `/products`
- Se invertesse, `:id` capturaria tudo

**Referência ao método:**
- `ProductController.index` (sem parênteses!)
- Express chamará o método passando req e res

## Conceitos Importantes

### REST (Representational State Transfer)

Arquitetura para APIs que usa:
- **Recursos**: substantivos (products, users)
- **Métodos HTTP**: verbos (GET, POST, PUT, DELETE)
- **Status HTTP**: indicam resultado
- **JSON**: formato de dados

### CRUD

Operações básicas em dados:
- **C**reate: POST
- **R**ead: GET
- **U**pdate: PUT/PATCH
- **D**elete: DELETE

### Códigos de Status HTTP

**2xx - Sucesso:**
- 200 OK: operação bem-sucedida
- 201 Created: recurso criado

**4xx - Erro do Cliente:**
- 400 Bad Request: dados inválidos
- 404 Not Found: recurso não existe

**5xx - Erro do Servidor:**
- 500 Internal Server Error: erro no servidor

### Padrão Controller

**Vantagens:**
- Separação de responsabilidades
- Código organizado e reutilizável
- Facilita testes
- Facilita manutenção

**Estrutura:**
```
Requisição → Rota → Controller → Lógica → Resposta
```

### Validações

**Por que validar?**
- Segurança: prevenir dados maliciosos
- Integridade: garantir dados consistentes
- UX: mensagens de erro claras

**Onde validar?**
- **Backend**: sempre! (segurança)
- **Frontend**: opcional (UX)

**O que validar?**
- Presença de campos obrigatórios
- Tipos de dados
- Formatos (email, CPF, etc.)
- Valores (positivos, ranges, etc.)

## Testando com curl

```bash
# Criar produto
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Notebook","price":2500,"stock":10}'

# Listar todos
curl http://localhost:3000/products

# Buscar por ID
curl http://localhost:3000/products/1

# Atualizar
curl -X PUT http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Notebook Dell","price":2800,"stock":8}'

# Deletar
curl -X DELETE http://localhost:3000/products/1

# Testar erro - campos faltando
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Mouse"}'
```

## Erros Comuns

### ❌ req.body undefined
**Causa**: Falta `app.use(express.json())`
**Solução**: Adicionar middleware antes das rotas

### ❌ Cannot read property 'id' of undefined
**Causa**: Produto não encontrado, tentou acessar propriedade
**Solução**: Verificar se produto existe antes de acessar

### ❌ ID como string em vez de número
**Causa**: `req.params.id` é sempre string
**Solução**: Usar `parseInt(req.params.id)`

### ❌ Produto não é atualizado
**Causa**: Não está atribuindo de volta ao array
**Solução**: `products[index] = novosProduto`

### ❌ splice não remove elemento
**Causa**: splice espera index (número), não objeto
**Solução**: Usar `findIndex()` para obter o índice

## Melhorias Possíveis

Para projetos reais, considere:

1. **Validação com biblioteca**
   - express-validator
   - Joi
   - Yup

2. **Persistência real**
   - Banco de dados (próximos exercícios!)
   - Arquivo JSON

3. **Paginação**
   - Limit e offset para grandes listas

4. **Filtros e busca**
   - Query params: `/products?name=notebook`

5. **Tratamento de erros global**
   - Middleware de error handling

6. **Documentação**
   - Swagger/OpenAPI

## Próximos Passos

No próximo exercício você irá:
- Implementar arquitetura MVC completa
- Criar Models com validações
- Trabalhar com views (EJS)
- Separar ainda mais as responsabilidades

---

**Parabéns por completar o exercício! 🎉**
