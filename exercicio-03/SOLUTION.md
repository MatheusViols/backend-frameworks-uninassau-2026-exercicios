# Solução: Exercício 03 - Arquitetura MVC

## Código Completo

### src/models/Product.js

```javascript
let products = [];
let nextId = 1;

class Product {
  constructor(id, name, price, stock, createdAt = new Date()) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.createdAt = createdAt;
  }

  /**
   * Valida os dados do produto
   */
  static validate(data) {
    const errors = [];

    // Validar name
    if (!data.name || data.name.trim() === '') {
      errors.push('Nome é obrigatório');
    } else if (data.name.trim().length < 3) {
      errors.push('Nome deve ter no mínimo 3 caracteres');
    }

    // Validar price
    if (data.price === undefined || data.price === null) {
      errors.push('Preço é obrigatório');
    } else if (typeof data.price !== 'number' || data.price < 0) {
      errors.push('Preço deve ser um número positivo');
    }

    // Validar stock
    if (data.stock === undefined || data.stock === null) {
      errors.push('Estoque é obrigatório');
    } else if (typeof data.stock !== 'number' || data.stock < 0 || !Number.isInteger(data.stock)) {
      errors.push('Estoque deve ser um número inteiro não-negativo');
    }

    return errors;
  }

  /**
   * Retorna todos os produtos
   */
  static findAll() {
    return products;
  }

  /**
   * Busca produto por ID
   */
  static findById(id) {
    return products.find(p => p.id === id) || null;
  }

  /**
   * Cria um novo produto com validações
   */
  static create(data) {
    // Converter strings para números se necessário
    const productData = {
      name: data.name,
      price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
      stock: typeof data.stock === 'string' ? parseInt(data.stock) : data.stock
    };

    // Validar
    const errors = this.validate(productData);

    if (errors.length > 0) {
      return { valid: false, errors, product: null };
    }

    // Criar produto
    const product = new Product(
      nextId++,
      productData.name.trim(),
      productData.price,
      productData.stock
    );

    products.push(product);

    return { valid: true, errors: [], product };
  }

  /**
   * Atualiza produto existente
   */
  static update(id, data) {
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      return { valid: false, errors: ['Produto não encontrado'], product: null };
    }

    // Converter strings para números
    const productData = {
      name: data.name,
      price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
      stock: typeof data.stock === 'string' ? parseInt(data.stock) : data.stock
    };

    // Validar
    const errors = this.validate(productData);

    if (errors.length > 0) {
      return { valid: false, errors, product: null };
    }

    // Atualizar produto (mantém ID e createdAt)
    products[index] = new Product(
      id,
      productData.name.trim(),
      productData.price,
      productData.stock,
      products[index].createdAt
    );

    return { valid: true, errors: [], product: products[index] };
  }

  /**
   * Deleta produto
   */
  static delete(id) {
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      return false;
    }

    products.splice(index, 1);
    return true;
  }
}

module.exports = Product;
```

### src/controllers/ProductController.js

```javascript
const Product = require('../models/Product');

class ProductController {
  /**
   * GET / - Listar todos os produtos
   */
  index(req, res) {
    const products = Product.findAll();
    res.render('index', { products });
  }

  /**
   * GET /products/create - Formulário de criação
   */
  create(req, res) {
    res.render('create', { errors: [] });
  }

  /**
   * POST /products - Criar produto
   */
  store(req, res) {
    const result = Product.create(req.body);

    if (!result.valid) {
      // Se houver erros, renderizar formulário novamente com erros
      return res.render('create', { errors: result.errors });
    }

    // Sucesso: redirecionar para lista
    res.redirect('/');
  }

  /**
   * POST /products/:id/delete - Deletar produto
   */
  destroy(req, res) {
    const id = parseInt(req.params.id);
    Product.delete(id);
    res.redirect('/');
  }
}

module.exports = new ProductController();
```

### src/server.js

```javascript
const express = require('express');
const path = require('path');
const ProductController = require('./controllers/ProductController');

const app = express();
const PORT = 3000;

// Configurar view engine EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para formulários HTML

// Rotas
app.get('/', ProductController.index);
app.get('/products/create', ProductController.create);
app.post('/products', ProductController.store);
app.post('/products/:id/delete', ProductController.destroy);

// Iniciar servidor
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;
```

## Explicação Detalhada

### Padrão MVC

**Model-View-Controller** é um padrão arquitetural que separa a aplicação em três componentes:

1. **Model (Modelo)**: Dados e lógica de negócio
2. **View (Visão)**: Apresentação/Interface
3. **Controller (Controlador)**: Intermediário entre Model e View

```
Request → Controller → Model → Controller → View → Response
```

### Model: Product.js

#### Validações
```javascript
static validate(data) {
  const errors = [];
  
  if (!data.name || data.name.trim() === '') {
    errors.push('Nome é obrigatório');
  }
  
  return errors;
}
```

**Por que validar no Model?**
- Centraliza regras de negócio
- Reutilizável (create e update usam a mesma validação)
- Garante integridade dos dados
- Fácil de testar

#### Conversão de Tipos
```javascript
price: typeof data.price === 'string' ? parseFloat(data.price) : data.price
```

**Por que converter?**
- Formulários HTML enviam tudo como string
- Precisamos garantir tipo correto
- `parseFloat()` para decimais
- `parseInt()` para inteiros

#### Retorno Estruturado
```javascript
return { valid: boolean, errors: [], product: {} }
```

**Vantagens:**
- Controller sabe se operação foi bem-sucedida
- Mensagens de erro disponíveis
- Produto criado disponível se sucesso

### View: EJS Templates

#### Partials (Reutilização)
```ejs
<%- include('partials/header') %>
```

**Benefícios:**
- DRY (Don't Repeat Yourself)
- Mudança em um lugar afeta todas as páginas
- Manutenção simplificada

**`<%-` vs `<%=`:**
- `<%-`: output não-escapado (permite HTML)
- `<%=`: output escapado (seguro contra XSS)

#### Loops e Condicionais
```ejs
<% if (products.length === 0) { %>
  <p>Nenhum produto</p>
<% } else { %>
  <% products.forEach(product => { %>
    <tr><td><%= product.name %></td></tr>
  <% }) %>
<% } %>
```

**Sintaxe EJS:**
- `<% %>`: JavaScript (não imprime)
- `<%= %>`: JavaScript + imprime (escapado)
- `<%- %>`: JavaScript + imprime (não-escapado)

#### Formulários HTML
```html
<form method="POST" action="/products">
  <input type="text" name="name" required>
  <button type="submit">Criar</button>
</form>
```

**Importante:**
- `method="POST"`: define método HTTP
- `action="/products"`: para onde enviar
- `name="name"`: nome do campo (vira `req.body.name`)

### Controller: ProductController.js

#### Renderizar View
```javascript
res.render('index', { products });
```

**Como funciona:**
1. Express procura `views/index.ejs`
2. Passa variável `products` para o template
3. EJS processa o template
4. Retorna HTML para o cliente

**Shorthand:**
```javascript
{ products }  // equivale a { products: products }
```

#### Redirecionamento
```javascript
res.redirect('/');
```

**Quando usar:**
- Após POST bem-sucedido (padrão PRG - Post-Redirect-Get)
- Evita reenvio de formulário ao atualizar página
- Melhora UX

**PRG Pattern:**
```
POST /products → Processar → Redirect GET / → Listar
```

#### Tratamento de Erros
```javascript
if (!result.valid) {
  return res.render('create', { errors: result.errors });
}
```

**Fluxo:**
1. Tentar criar produto
2. Se inválido: renderizar formulário novamente com erros
3. Se válido: redirecionar para lista

### Server: Configuração

#### View Engine
```javascript
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
```

**Primeira linha:**
- Define EJS como template engine
- Express sabe processar arquivos .ejs

**Segunda linha:**
- Define onde estão os templates
- `__dirname`: diretório do arquivo atual
- `path.join()`: junta caminhos de forma segura (cross-platform)

#### Middleware URL Encoded
```javascript
app.use(express.urlencoded({ extended: true }));
```

**Para que serve:**
- Parseia formulários HTML
- Transforma `name=João&age=25` em `{ name: 'João', age: '25' }`
- Essencial para `req.body` em formulários

**extended: true:**
- Permite objetos e arrays aninhados
- Usa biblioteca `qs` em vez de `querystring`

### Ordem das Rotas

```javascript
app.get('/products/create', ...);  // Específica
app.get('/products/:id', ...);     // Genérica
```

**SEMPRE rotas específicas antes de rotas com parâmetros!**

Se invertesse:
- `/products/create` seria capturado por `/:id`
- `id` seria `"create"` (string, não número)

## Conceitos Avançados

### Separação de Responsabilidades

**Model:**
- Validação de dados
- Operações CRUD
- Regras de negócio
- NÃO sabe nada de HTTP

**View:**
- Apresentação
- HTML/CSS
- NÃO tem lógica de negócio
- Apenas exibe dados

**Controller:**
- Recebe requisições HTTP
- Chama Model
- Escolhe View
- Prepara dados para View

### Vantagens do MVC

1. **Testabilidade**: Cada camada testada independentemente
2. **Manutenção**: Mudanças isoladas
3. **Escalabilidade**: Fácil adicionar features
4. **Reutilização**: Models reutilizáveis
5. **Trabalho em equipe**: Divisão clara de tarefas

### EJS vs Outras Template Engines

**EJS (Embedded JavaScript):**
- ✅ Simples, usa JavaScript puro
- ✅ Curva de aprendizado baixa
- ❌ Menos features que outras engines

**Alternativas:**
- **Pug**: sintaxe minimalista (indentação)
- **Handlebars**: lógica mínima nos templates
- **Nunjucks**: similar a Jinja2 (Python)

### Validação Client-Side vs Server-Side

**Client-Side (HTML5):**
```html
<input type="text" required minlength="3">
```
- ✅ Feedback imediato
- ❌ Pode ser burlado (inspecionar elemento)
- ❌ Não confiável para segurança

**Server-Side (Model):**
```javascript
if (name.length < 3) errors.push('...')
```
- ✅ Seguro, não pode ser burlado
- ✅ Fonte única de verdade
- ❌ Feedback mais lento

**Best practice**: SEMPRE validar no servidor + validar no cliente para UX

## Testando

### Teste Manual

1. **Listar (vazio):**
   - Acesse http://localhost:3000
   - Deve mostrar "Nenhum produto cadastrado"

2. **Criar produto válido:**
   - Clique "Adicionar Produto"
   - Preencha: Nome="Notebook", Preço=2500, Estoque=10
   - Clique "Criar"
   - Deve redirecionar e mostrar produto na tabela

3. **Criar produto inválido:**
   - Tente criar com nome "AB" (< 3 chars)
   - Deve mostrar erro de validação
   - Formulário deve manter os dados

4. **Deletar produto:**
   - Clique "Deletar" em um produto
   - Produto deve sumir da lista

### Teste Automatizado

Execute:
```bash
npm test
```

Testes verificam:
- ✅ Validações funcionando
- ✅ CRUD completo
- ✅ Erros tratados corretamente
- ✅ IDs únicos gerados

## Erros Comuns

### ❌ Error: Cannot find module 'ejs'
**Solução**: `npm install`

### ❌ Error: Failed to lookup view "index"
**Causa**: Views path não configurado ou arquivo não existe
**Solução**: Verificar `app.set('views', ...)` e arquivos .ejs

### ❌ req.body undefined em formulários
**Causa**: Falta middleware urlencoded
**Solução**: `app.use(express.urlencoded({ extended: true }))`

### ❌ Partial não encontrado
**Causa**: Caminho do include incorreto
**Solução**: Usar caminho relativo a `views/`: `partials/header`

### ❌ Validações passam mas não deviam
**Causa**: Comparando tipos errados (string vs number)
**Solução**: Converter tipos antes de validar

## Próximos Passos

No próximo exercício você irá:
- Criar middlewares customizados
- Implementar logging
- Criar autenticação simples
- Tratamento de erros global

---

**Parabéns! Você dominou MVC! 🎉**
