// TODO: Implemente o ProductController aqui
//
// O controller deve ter os seguintes métodos:
//
// - index(req, res): retornar todos os produtos
// - show(req, res): retornar produto por ID
// - store(req, res): criar novo produto (validar campos obrigatórios)
// - update(req, res): atualizar produto existente
// - destroy(req, res): deletar produto
//
// Estrutura de um produto:
// {
//   id: number,
//   name: string,
//   price: number,
//   stock: number
// }
//
// Dicas:
// - Use um array para armazenar os produtos: let products = []
// - Use uma variável para controlar o próximo ID: let nextId = 1
// - Valide se name, price e stock estão presentes no body
// - Retorne 404 se produto não for encontrado
// - Retorne 400 para dados inválidos
// - Retorne 201 ao criar um produto

let products = [];
let nextId = 1;

function index(req, res) {
	res.status(200).json(products);
}
function store(req, res) {
	const body = req.body;
	const bodyCompleto = 
		("name"  in body && body.name  != undefined) &&
		("price" in body && body.price != undefined) &&
		("stock" in body && body.stock != undefined);

	if(bodyCompleto) {
		const produto = {
			id: nextId++,
			name: body.name,
			price: body.price,
			stock: body.stock,
		};

		products.push(produto);
		res.status(201).json(produto);
	} else {
		res.status(400).json({error: 'Dados inválidos'});
	}
}

module.exports = {
	index,
	store
};
