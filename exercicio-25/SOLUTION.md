# Solução: Exercício 25 - WebSockets Chat

## 📝 Implementação Completa

### src/server.js

```javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Armazenar usuários online
const users = new Map();

io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);

  // Usuário entra em uma sala
  socket.on('join', ({ username, room }) => {
    const userId = uuidv4();
    const user = {
      id: userId,
      username,
      room,
      socketId: socket.id
    };

    users.set(socket.id, user);
    socket.join(room);

    // Notificar sala sobre novo usuário
    io.to(room).emit('userJoined', {
      user: { id: userId, username },
      message: `${username} entrou na sala`
    });

    // Enviar lista de usuários para o novo usuário
    const roomUsers = getRoomUsers(room);
    socket.emit('roomUsers', roomUsers);

    // Atualizar lista para todos na sala
    io.to(room).emit('roomUsers', roomUsers);

    console.log(`${username} entrou na sala ${room}`);
  });

  // Enviar mensagem para sala
  socket.on('message', ({ room, message }) => {
    const user = users.get(socket.id);
    
    if (!user) {
      return socket.emit('error', { message: 'Usuário não encontrado' });
    }

    const messageData = {
      id: uuidv4(),
      user: {
        id: user.id,
        username: user.username
      },
      message,
      timestamp: new Date().toISOString()
    };

    // Enviar para todos na sala (incluindo remetente)
    io.to(room).emit('message', messageData);
    console.log(`${user.username} enviou mensagem na sala ${room}`);
  });

  // Usuário desconecta
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    
    if (user) {
      const { room, username } = user;
      
      // Notificar sala
      io.to(room).emit('userLeft', {
        user: { id: user.id, username },
        message: `${username} saiu da sala`
      });

      // Remover usuário
      users.delete(socket.id);

      // Atualizar lista de usuários
      const roomUsers = getRoomUsers(room);
      io.to(room).emit('roomUsers', roomUsers);

      console.log(`${username} desconectou da sala ${room}`);
    }
  });

  // Função auxiliar para obter usuários de uma sala
  function getRoomUsers(room) {
    return Array.from(users.values())
      .filter(user => user.room === room)
      .map(({ id, username }) => ({ id, username }));
  }
});

app.get('/', (req, res) => {
  res.send('Servidor de Chat funcionando!');
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    users: users.size,
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = { app, server, io };
```

### tests/socket.test.js

```javascript
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
    clientSocket1.on('userJoined', (data) => {
      expect(data).toHaveProperty('user');
      expect(data.user).toHaveProperty('username', 'Alice');
      expect(data).toHaveProperty('message');
      done();
    });

    clientSocket1.emit('join', { username: 'Alice', room: 'room1' });
  });

  test('Deve receber lista de usuários online na sala', (done) => {
    clientSocket2 = Client(`http://localhost:${PORT}`);

    let counter = 0;
    const checkDone = () => {
      counter++;
      if (counter === 2) done();
    };

    clientSocket1.on('roomUsers', (users) => {
      if (users.length === 2) {
        expect(users).toHaveLength(2);
        expect(users[0]).toHaveProperty('username');
        checkDone();
      }
    });

    clientSocket2.on('connect', () => {
      clientSocket2.on('roomUsers', (users) => {
        if (users.length === 2) {
          checkDone();
        }
      });

      clientSocket1.emit('join', { username: 'Alice', room: 'room1' });
      setTimeout(() => {
        clientSocket2.emit('join', { username: 'Bob', room: 'room1' });
      }, 100);
    });
  });

  test('Mensagem deve ser recebida por usuários na mesma sala', (done) => {
    clientSocket2 = Client(`http://localhost:${PORT}`);

    clientSocket2.on('connect', () => {
      clientSocket1.emit('join', { username: 'Alice', room: 'room1' });
      
      setTimeout(() => {
        clientSocket2.emit('join', { username: 'Bob', room: 'room1' });
        
        setTimeout(() => {
          clientSocket2.on('message', (data) => {
            expect(data.message).toBe('Olá!');
            expect(data.user.username).toBe('Alice');
            done();
          });

          clientSocket1.emit('message', { room: 'room1', message: 'Olá!' });
        }, 100);
      }, 100);
    });
  });

  test('Mensagem NÃO deve ser recebida por usuários em salas diferentes', (done) => {
    clientSocket2 = Client(`http://localhost:${PORT}`);

    clientSocket2.on('connect', () => {
      clientSocket1.emit('join', { username: 'Alice', room: 'room1' });
      
      setTimeout(() => {
        clientSocket2.emit('join', { username: 'Bob', room: 'room2' });
        
        setTimeout(() => {
          let messageReceived = false;

          clientSocket2.on('message', () => {
            messageReceived = true;
          });

          clientSocket1.emit('message', { room: 'room1', message: 'Olá!' });

          setTimeout(() => {
            expect(messageReceived).toBe(false);
            done();
          }, 200);
        }, 100);
      }, 100);
    });
  });

  test('Deve notificar quando usuário sai da sala', (done) => {
    clientSocket2 = Client(`http://localhost:${PORT}`);

    clientSocket2.on('connect', () => {
      clientSocket1.emit('join', { username: 'Alice', room: 'room1' });
      
      setTimeout(() => {
        clientSocket2.emit('join', { username: 'Bob', room: 'room1' });
        
        setTimeout(() => {
          clientSocket2.on('userLeft', (data) => {
            expect(data.user.username).toBe('Alice');
            expect(data.message).toContain('saiu');
            done();
          });

          clientSocket1.disconnect();
        }, 100);
      }, 100);
    });
  });
});
```

## 🎓 Conceitos Aplicados

### 1. **Socket.io Setup**
```javascript
const io = socketIo(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});
```

### 2. **Rooms (Salas)**
```javascript
socket.join(room);           // Entrar na sala
io.to(room).emit('event');   // Enviar para sala
```

### 3. **Gerenciamento de Estado**
```javascript
const users = new Map();
users.set(socket.id, userData);
users.get(socket.id);
users.delete(socket.id);
```

### 4. **Eventos Personalizados**
- `join` - Entrar na sala
- `message` - Enviar mensagem
- `disconnect` - Desconectar
- `userJoined` - Notificação de entrada
- `userLeft` - Notificação de saída
- `roomUsers` - Lista de usuários

## 🚀 Melhorias Possíveis

1. **Persistência**: Salvar histórico de mensagens
2. **Typing Indicator**: Mostrar quando usuário está digitando
3. **Private Messages**: Mensagens diretas entre usuários
4. **File Sharing**: Upload de arquivos/imagens
5. **Authentication**: JWT para autenticar usuários
6. **Redis Adapter**: Escalar para múltiplos servidores
7. **Reconnection**: Reconectar automaticamente em caso de queda

## 📚 Recursos Adicionais

- [Socket.io Docs](https://socket.io/docs/)
- [Rooms and Namespaces](https://socket.io/docs/v4/rooms/)
- [Broadcasting Events](https://socket.io/docs/v4/broadcasting-events/)
