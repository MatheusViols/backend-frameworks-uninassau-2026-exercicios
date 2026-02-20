// TODO: Implemente o middleware de autenticação aqui
//
// O middleware deve:
// - Verificar se existe header 'x-api-key'
// - Comparar com API key válida: 'minha-chave-secreta-123'
// - Se ausente ou inválida: retornar 401 com { error: 'Unauthorized' }
// - Se válida: chamar next()
//
// Dicas:
// - Use req.get('x-api-key') ou req.headers['x-api-key']
// - NÃO chame next() se retornar erro (usar return)

const API_KEY = 'minha-chave-secreta-123';

