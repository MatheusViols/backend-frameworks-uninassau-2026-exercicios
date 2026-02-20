# Exercício 25: WebSockets - Chat em Tempo Real

## 📝 Objetivo
Implementar um sistema de chat em tempo real usando Socket.io com suporte a salas (rooms), broadcast de mensagens e lista de usuários online.

## 🎯 Requisitos

### Funcionalidades
1. **Configurar Socket.io** com Express
2. **Criar sistema de rooms** (salas de chat)
3. **Broadcast de mensagens** para usuários na mesma sala
4. **Lista de usuários online** por sala
5. **Eventos personalizados** (join, leave, message)

### Tecnologias
- Express
- Socket.io
- UUID para IDs únicos

## 📦 Instalação

```bash
npm install
```

## 🚀 Execução

```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 🧪 Testes

```bash
npm test
```

## 📋 Critérios de Avaliação

- [ ] Servidor Socket.io configurado corretamente
- [ ] Usuários podem entrar em salas específicas
- [ ] Mensagens são enviadas apenas para usuários da mesma sala
- [ ] Lista de usuários online atualizada em tempo real
- [ ] Eventos de entrada/saída funcionando
- [ ] Testes cobrindo eventos principais
- [ ] Código limpo e organizado

## 💡 Dicas

- Use `socket.join(room)` para adicionar usuário a uma sala
- `io.to(room).emit()` envia mensagem para todos na sala
- Armazene usuários em um Map ou objeto
- Teste eventos com socket.io-client

## 🔗 Recursos

- [Socket.io Docs](https://socket.io/docs/)
- [Socket.io Rooms](https://socket.io/docs/v4/rooms/)
- [Socket.io Events](https://socket.io/docs/v4/emitting-events/)
