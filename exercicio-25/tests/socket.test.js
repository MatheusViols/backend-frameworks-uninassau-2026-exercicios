const { server, io } = require('../src/server');
const Client = require('socket.io-client');

describe('WebSocket Chat Tests', () => {
  let clientSocket1, clientSocket2;
  const PORT = 3001;
  let serverInstance;

  beforeAll((done) => {
    serverInstance = server.listen(PORT, done);
  });

  afterAll((done) => {
    io.close();
    serverInstance.close(done);
  });

  beforeEach((done) => {
    clientSocket1 = Client(`http://localhost:${PORT}`);
    clientSocket1.on('connect', done);
  });

  afterEach(() => {
    if (clientSocket1.connected) {
      clientSocket1.disconnect();
    }
    if (clientSocket2 && clientSocket2.connected) {
      clientSocket2.disconnect();
    }
  });

  test('Deve conectar ao servidor', (done) => {
    expect(clientSocket1.connected).toBe(true);
    done();
  });

  test('Usuário deve entrar em uma sala', (done) => {
    // TODO: Implementar teste
    // 1. Emitir evento 'join' com username e room
    // 2. Escutar evento 'userJoined'
    // 3. Verificar dados recebidos
    done();
  });

  test('Deve receber lista de usuários online na sala', (done) => {
    // TODO: Implementar teste
    // 1. Conectar dois clientes
    // 2. Ambos entram na mesma sala
    // 3. Verificar lista de usuários
    done();
  });

  test('Mensagem deve ser recebida por usuários na mesma sala', (done) => {
    // TODO: Implementar teste
    // 1. Conectar dois clientes na mesma sala
    // 2. Cliente 1 envia mensagem
    // 3. Cliente 2 deve receber
    done();
  });

  test('Mensagem NÃO deve ser recebida por usuários em salas diferentes', (done) => {
    // TODO: Implementar teste
    // 1. Cliente 1 na sala 'room1'
    // 2. Cliente 2 na sala 'room2'
    // 3. Cliente 1 envia mensagem
    // 4. Cliente 2 não deve receber
    done();
  });

  test('Deve notificar quando usuário sai da sala', (done) => {
    // TODO: Implementar teste
    // 1. Cliente entra na sala
    // 2. Cliente desconecta
    // 3. Verificar evento 'userLeft'
    done();
  });
});
