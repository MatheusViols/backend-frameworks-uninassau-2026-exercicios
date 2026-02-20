// TODO: Implemente o middleware de error handling aqui
//
// O middleware DEVE ter 4 parâmetros: (err, req, res, next)
// Express identifica error handlers pela assinatura de 4 parâmetros
//
// O middleware deve:
// - Capturar erro
// - Usar status code do erro (err.status ou err.statusCode) ou 500
// - Retornar JSON com:
//   - error: mensagem do erro
//   - stack: pilha de erro (apenas em desenvolvimento)
//
// Dicas:
// - Verificar process.env.NODE_ENV para ambiente
// - Em produção, não expor stack trace
// - Sempre usar 4 parâmetros mesmo que não use next

