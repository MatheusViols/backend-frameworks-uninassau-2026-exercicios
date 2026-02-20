# Exercício 15: Transações com Sequelize

## 🎯 Objetivo
Aprender a usar transações para garantir consistência de dados em operações complexas que envolvem múltiplas mudanças no banco de dados.

## 📚 Conceitos Abordados
- Transações SQL (BEGIN, COMMIT, ROLLBACK)
- ACID (Atomicity, Consistency, Isolation, Durability)
- Managed Transactions vs Unmanaged Transactions
- Rollback automático em caso de erro
- Operações atômicas

## 🔧 Tecnologias
- Sequelize
- SQLite
- Jest

## 📝 Tarefas

### 1. Criar Models de Conta Bancária

**Account**
- id, accountNumber, holder (titular), balance (saldo)

**Transaction**
- id, fromAccountId, toAccountId, amount, type, createdAt

### 2. Implementar Transferência com Transação

A transferência bancária deve:
1. Verificar se conta origem tem saldo suficiente
2. Debitar valor da conta origem
3. Creditar valor na conta destino
4. Registrar a transação
5. **TUDO ou NADA** - se qualquer passo falhar, desfazer tudo

### 3. Cenários a Implementar

**Cenário 1: Transferência bem-sucedida**
- Saldo suficiente
- Ambas as contas existem
- Commit da transação

**Cenário 2: Saldo insuficiente**
- Rollback automático
- Saldos não alterados

**Cenário 3: Conta destino inexistente**
- Rollback automático
- Nada alterado

**Cenário 4: Erro durante operação**
- Rollback automático
- Estado consistente mantido

## 🚀 Como Executar

```bash
npm install
npm test
```

## ✅ Critérios de Aceite
- [ ] Transferência bem-sucedida altera ambos os saldos
- [ ] Rollback em caso de saldo insuficiente
- [ ] Rollback em caso de erro
- [ ] ACID garantido
- [ ] Todos os testes passando
- [ ] Registro de transações criado apenas em caso de sucesso

## 📖 Recursos
- [Sequelize Transactions](https://sequelize.org/docs/v6/other-topics/transactions/)

## 🎓 Dicas
- Use `sequelize.transaction()` para managed transactions
- Sequelize faz rollback automático se houver throw dentro da transação
- Passe `{ transaction: t }` para todas as operações
- Em caso de sucesso, Sequelize faz commit automaticamente
- Teste SEMPRE os cenários de erro
