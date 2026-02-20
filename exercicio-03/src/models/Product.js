// TODO: Implemente o Model Product aqui
//
// A classe Product deve ter:
//
// Propriedades (cada produto):
// - id: number
// - name: string
// - price: number
// - stock: number
// - createdAt: Date
//
// Métodos estáticos (na classe):
// - findAll(): retorna todos os produtos
// - findById(id): busca produto por ID
// - create(data): cria produto com validações
// - update(id, data): atualiza produto
// - delete(id): deleta produto
//
// Validações (no método create e update):
// - name: obrigatório, mínimo 3 caracteres
// - price: obrigatório, deve ser número positivo
// - stock: obrigatório, deve ser número inteiro não-negativo
//
// Retornar objeto com { valid: boolean, errors: [], product: {} }
//
// Estrutura:
// class Product {
//   constructor(id, name, price, stock) { ... }
//   
//   static findAll() { ... }
//   static findById(id) { ... }
//   static create(data) { ... }
//   static update(id, data) { ... }
//   static delete(id) { ... }
//   static validate(data) { ... }
// }

