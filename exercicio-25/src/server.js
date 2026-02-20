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

// TODO: Armazenar usuários online
// Estrutura sugerida: { socketId: { id, username, room } }
const users = new Map();

// TODO: Configurar eventos do Socket.io
io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);

  // TODO: Evento 'join' - usuário entra em uma sala
  socket.on('join', ({ username, room }) => {
    // 1. Criar objeto do usuário
    // 2. Adicionar ao Map de usuários
    // 3. Fazer socket.join(room)
    // 4. Emitir evento 'userJoined' para a sala
    // 5. Emitir lista atualizada de usuários
  });

  // TODO: Evento 'message' - enviar mensagem para sala
  socket.on('message', ({ room, message }) => {
    // 1. Buscar dados do usuário
    // 2. Emitir mensagem para todos na sala (io.to(room).emit)
  });

  // TODO: Evento 'disconnect' - usuário desconecta
  socket.on('disconnect', () => {
    // 1. Buscar usuário no Map
    // 2. Emitir evento 'userLeft' para a sala
    // 3. Remover usuário do Map
    // 4. Emitir lista atualizada de usuários
  });

  // TODO: Função auxiliar para obter usuários de uma sala
  const getRoomUsers = (room) => {
    // Filtrar usuários pela sala e retornar array
  };
});

app.get('/', (req, res) => {
  res.send('Servidor de Chat funcionando!');
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = { app, server, io };
