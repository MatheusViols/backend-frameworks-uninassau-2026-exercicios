# Exercício 03: Arquitetura MVC Básica

## Objetivo
Implementar arquitetura MVC (Model-View-Controller) completa com validações e views dinâmicas.

## Descrição
Você irá construir uma aplicação web seguindo o padrão MVC, separando responsabilidades em Models (dados), Views (apresentação) e Controllers (lógica).

## Requisitos

### Funcionalidades Obrigatórias

1. **Estrutura MVC**
   ```
   src/
   ├── models/
   │   └── Product.js       # Model com validações
   ├── views/
   │   ├── partials/
   │   │   ├── header.ejs   # Header reutilizável
   │   │   └── footer.ejs   # Footer reutilizável
   │   ├── index.ejs        # Lista de produtos
   │   └── create.ejs       # Formulário de criação
   ├── controllers/
   │   └── ProductController.js
   └── server.js
   ```

2. **Model Product**
   - Propriedades: id, name, price, stock, createdAt
   - Validações:
     - name: obrigatório, mínimo 3 caracteres
     - price: obrigatório, número positivo
     - stock: obrigatório, número inteiro não-negativo
   - Métodos estáticos:
     - `findAll()`: retorna todos os produtos
     - `findById(id)`: busca por ID
     - `create(data)`: cria produto (com validação)
     - `update(id, data)`: atualiza produto
     - `delete(id)`: deleta produto

3. **Views com EJS**
   - **partials/header.ejs**: cabeçalho com navegação
   - **partials/footer.ejs**: rodapé
   - **index.ejs**: lista todos os produtos em tabela
   - **create.ejs**: formulário para criar produto

4. **Controller**
   - `index()`: renderiza lista de produtos
   - `create()`: renderiza formulário
   - `store()`: processa criação e redireciona
   - `destroy()`: deleta e redireciona

5. **Rotas**
   - GET `/` → listar produtos
   - GET `/products/create` → formulário
   - POST `/products` → criar produto
   - POST `/products/:id/delete` → deletar produto

## Estrutura de Arquivos

```
exercicio-03/
├── src/
│   ├── models/
│   │   └── Product.js
│   ├── views/
│   │   ├── partials/
│   │   │   ├── header.ejs
│   │   │   └── footer.ejs
│   │   ├── index.ejs
│   │   └── create.ejs
│   ├── controllers/
│   │   └── ProductController.js
│   └── server.js
├── tests/
│   └── product.test.js
├── package.json
└── README.md
```

## Instruções

### Passo 1: Instalar Dependências
```bash
npm install
```

### Passo 2: Implementar Model Product
Edite `src/models/Product.js`:
- Criar classe Product com validações
- Implementar métodos estáticos para CRUD
- Validar dados antes de salvar

### Passo 3: Criar Views EJS
Edite os arquivos em `src/views/`:
- **partials/header.ejs**: navbar com logo e menu
- **partials/footer.ejs**: copyright e informações
- **index.ejs**: tabela com produtos e botão de adicionar
- **create.ejs**: formulário com campos validados

### Passo 4: Implementar Controller
Edite `src/controllers/ProductController.js`:
- Métodos para renderizar views
- Processamento de formulários
- Redirecionamentos

### Passo 5: Configurar Server
Edite `src/server.js`:
- Configurar EJS como view engine
- Definir pasta de views
- Criar rotas
- Middleware para URL encoded

### Passo 6: Executar
```bash
npm start
```

Acesse http://localhost:3000

### Passo 7: Testar
```bash
npm test
```

## Critérios de Avaliação

- [ ] Model com validações funcionando
- [ ] Views EJS renderizando corretamente
- [ ] Partials sendo reutilizados
- [ ] Formulário de criação funcional
- [ ] Lista de produtos exibindo dados
- [ ] Validações impedindo dados inválidos
- [ ] Redirecionamentos corretos
- [ ] Todos os testes passando

## Dicas

💡 **Configurar EJS:**
```javascript
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
```

💡 **Renderizar view:**
```javascript
res.render('index', { products: [] });
```

💡 **Usar partial:**
```ejs
<%- include('partials/header') %>
```

💡 **Loop em EJS:**
```ejs
<% products.forEach(product => { %>
  <tr>
    <td><%= product.name %></td>
  </tr>
<% }) %>
```

💡 **Formulário POST:**
```html
<form method="POST" action="/products">
  <input type="text" name="name" required>
  <button type="submit">Criar</button>
</form>
```

💡 **Middleware URL Encoded:**
```javascript
app.use(express.urlencoded({ extended: true }));
```

💡 **Redirecionamento:**
```javascript
res.redirect('/');
```

## Recursos

- [EJS Documentation](https://ejs.co/)
- [Express View Engines](https://expressjs.com/en/guide/using-template-engines.html)
- [MVC Pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)

---

**Boa sorte! 🚀**
