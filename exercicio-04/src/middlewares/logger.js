// TODO: Implemente o middleware de logging aqui
//
// O middleware deve:
// - Capturar req.method e req.url
// - Exibir timestamp da requisição
// - Calcular tempo de resposta
// - Exibir no console formato: [TIMESTAMP] METHOD URL - XXXms
//
// Dicas:
// - Use Date.now() ou new Date() para timestamp
// - Use res.on('finish', callback) para capturar fim da resposta
// - Chame next() para continuar para próximo middleware
//
// Exemplo de saída:
// [2026-02-20T15:30:00.000Z] GET / - 15ms

