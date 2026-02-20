// TODO: Implemente o servidor com middlewares aqui
//
// Passos:
// 1. Importar express e os 3 middlewares
// 2. Criar app express
// 3. Aplicar logger globalmente (app.use)
// 4. Criar rotas:
//    - GET / (pública) - retorna { message: 'Home pública' }
//    - GET /protected (com auth middleware) - retorna { message: 'Área protegida', secret: 'dados secretos' }
//    - GET /error (pública, gera erro) - throw new Error('Erro proposital')
// 5. Aplicar error handler por último (app.use)
// 6. Iniciar servidor na porta 3000
// 7. Exportar app
//
// Importante:
// - Logger deve vir antes das rotas
// - Auth deve ser aplicado apenas na rota /protected
// - Error handler deve vir depois de todas as rotas

