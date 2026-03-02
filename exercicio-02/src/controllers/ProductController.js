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

class ProductController {

    dadosValidos(body) {
	const bodyCompleto = 
	      (body.name  != undefined) &&
	      (body.price != undefined) &&
	      (body.stock != undefined) &&
	      (Number.isInteger(body.price)) &&
	      (Number.isInteger(body.stock));
	

	
	return bodyCompleto;
    }
    
    index(req, res) {
	res.status(200).json(products);
    }

    show(req, res) {
	const parametro = parseInt(req.params.id);

	const produtoIndex = products.findIndex((produto) => produto.id === parametro);
	
	if(produtoIndex != -1) {
	    res.status(200).json(products[produtoIndex])
	} else {
	    res.status(404).json({
		error: 'Produto não encontrado',
		body: {id: parametro},
	    });
	}
    }

    store(req, res) {
	const body = req.body;

	if(this.dadosValidos(body)) {
	    const produto = {
		id: nextId++,
		name: body.name,
		price: body.price,
		stock: body.stock,
	    };

	    products.push(produto);
	    res.status(201).json(produto);
	} else {
	    res.status(400).json({
		error: 'Dados inválidos',
		body: body,
	    });
	}
    }

    update(req, res) {
	const parametro = parseInt(req.params.id);
	const body = req.body;

	const produtoIndex = products.findIndex((produto) => produto.id === parametro);

	if(produtoIndex != -1) {
	    if(this.dadosValidos(body)) {
		products[produtoIndex].name = body.name;
		products[produtoIndex].price = body.price;
		products[produtoIndex].stock = body.stock;

		res.status(200).json(products[produtoIndex]);
	    } else {
		res.status(400).json({
		    error: "Dados inválidos",
		    body: body,
		});
	    }
	} else {
	    res.status(404).json({
		error: "Produto não encontrado",
		body: {id: parametro},
	    });
	}
	
    }

    destroy(req, res) {
	const parametro = parseInt(req.params.id);

	const produtoIndex = products.findIndex((produto) => produto.id === parametro);

	if(produtoIndex != -1) {
	    const quantidadeRemovida = 1;
	    products.splice(produtoIndex, quantidadeRemovida);
	    res.status(200).json({
		body: 'Produto removido com sucesso',
	    });
	} else {
	    res.status(404).json({
		error: "Produto não encontrado",
		body: {id: parametro},
	    });
	}
    }
    
}
module.exports = ProductController;

