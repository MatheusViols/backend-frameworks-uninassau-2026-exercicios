# 🔒 Política de Segurança

## 🛡️ Integridade Acadêmica

Este repositório implementa múltiplas camadas de proteção para garantir a integridade acadêmica:

### 1. Detecção Automática de Plágio

✅ **O que é verificado:**
- Similaridade de código entre submissões
- Padrões de código copiado da internet
- Comentários suspeitos
- Formatação anômala

⚠️ **Ações tomadas:**
- Submissões com similaridade >85% são sinalizadas
- Professor é notificado automaticamente
- Label `🔍 revisão-manual` é adicionada
- Aluno é alertado sobre as políticas

### 2. Proteção contra PRs de Forks Não Autorizados

🚫 **Bloqueios implementados:**
- Apenas PRs de forks de alunos matriculados
- Verificação de identidade via GitHub
- Limitação de submissões por período

### 3. Validação de Código

✅ **Testes automáticos:**
- Testes unitários obrigatórios
- Análise estática (ESLint)
- Cobertura de código mínima
- Verificação de segurança (npm audit)

## 🔐 Dados Sensíveis

### ❌ **NUNCA** commite:

- Senhas ou tokens de API
- Chaves privadas (.pem, .key)
- Dados pessoais de alunos
- Gabaritos completos (apenas em repos privados)
- Arquivos .env

### ✅ **Sempre use:**

- Variáveis de ambiente (.env)
- Secrets do GitHub Actions
- .gitignore adequado
- .env.example (sem valores reais)

## 🚨 Reportar Vulnerabilidades

Se você encontrar uma vulnerabilidade de segurança:

1. **NÃO** abra uma issue pública
2. Envie email para: petros.barreto@souunit.com
3. Inclua:
   - Descrição detalhada
   - Passos para reproduzir
   - Impacto potencial
   - Sugestão de correção (se houver)

## 📜 Penalidades por Violação

Violações das políticas de integridade acadêmica resultam em:

1. **Primeira ocorrência:** Aviso formal + exercício invalidado
2. **Segunda ocorrência:** Zero na disciplina
3. **Terceira ocorrência:** Processo disciplinar institucional

## ✅ Práticas Recomendadas

### Permitido:
- ✅ Consultar documentação oficial (Express, Node.js, etc.)
- ✅ Pesquisar conceitos gerais
- ✅ Discutir ideias (sem compartilhar código)
- ✅ Usar Stack Overflow para entender conceitos
- ✅ Assistir tutoriais (sem copiar código literal)

### Proibido:
- ❌ Copiar código de outros alunos
- ❌ Compartilhar suas soluções publicamente
- ❌ Usar soluções prontas da internet
- ❌ Submeter código gerado por IA sem compreensão
- ❌ Falsificar identidade em submissões

## 🤝 Compromisso de Honestidade

Ao submeter um exercício, você declara que:

- O código é de sua autoria
- Você compreende completamente a solução
- Não violou as políticas de integridade acadêmica
- Está ciente das penalidades por violação

---

**Última atualização:** 2026-02-20  
**Contato:** petros.barreto@souunit.com
