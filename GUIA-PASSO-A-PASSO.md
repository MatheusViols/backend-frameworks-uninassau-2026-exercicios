# 📚 Guia Passo a Passo - Sistema de Exercícios

## 🎯 Introdução ao Sistema de Exercícios

Bem-vindo ao sistema de exercícios de Backend Frameworks da UNINASSAU 2026! Este é um ambiente de aprendizado interativo onde você irá:

- **Resolver exercícios práticos** de desenvolvimento backend
- **Receber feedback automático** através de testes
- **Praticar Git e GitHub** no fluxo de trabalho real
- **Desenvolver habilidades** essenciais para o mercado de trabalho

O sistema funciona através de **Pull Requests (PRs)** - você resolve os exercícios no seu repositório e submete para avaliação automática.

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### 1. Node.js (versão 18 ou superior)
```bash
# Verificar se está instalado
node --version

# Deve retornar algo como: v18.x.x ou v20.x.x
```

**Como instalar:**
- **Windows/Mac:** Baixe em [nodejs.org](https://nodejs.org)
- **Linux (Ubuntu/Debian):**
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

### 2. Git
```bash
# Verificar se está instalado
git --version

# Deve retornar algo como: git version 2.x.x
```

**Como instalar:**
- **Windows:** Baixe em [git-scm.com](https://git-scm.com)
- **Mac:** `brew install git` (se tiver Homebrew)
- **Linux:** `sudo apt-get install git`

### 3. Conta no GitHub
- Crie uma conta gratuita em [github.com](https://github.com)
- Configure seu nome e email no Git:
  ```bash
  git config --global user.name "Seu Nome"
  git config --global user.email "[email protected]"
  ```

### 4. Editor de Código
Recomendamos:
- **VS Code** (mais popular): [code.visualstudio.com](https://code.visualstudio.com)
- Outras opções: WebStorm, Sublime Text, Atom

---

## 🍴 Tutorial Completo: Como Fazer Fork

O **fork** cria uma cópia do repositório na sua conta GitHub, onde você terá permissão para fazer alterações.

### Passo a passo detalhado:

1. **Acesse o repositório original:**
   - Vá para: `https://github.com/UNINASSAU/backend-frameworks-uninassau-2026-exercicios`
   - (Substitua pela URL real fornecida pelo professor)

2. **Clique no botão "Fork":**
   - Está localizado no canto superior direito da página
   - Você verá um ícone de duas setas divergentes

3. **Configure seu fork:**
   - **Owner:** Selecione sua conta pessoal
   - **Repository name:** Mantenha o nome original (ou personalize se preferir)
   - **Description:** Opcional
   - **Copy the main branch only:** Deixe marcado
   - Clique em **"Create fork"**

4. **Aguarde a criação:**
   - GitHub criará uma cópia completa do repositório na sua conta
   - Você será redirecionado para `https://github.com/SEU-USUARIO/backend-frameworks-uninassau-2026-exercicios`

✅ **Fork criado com sucesso!** Agora você tem sua própria cópia do repositório.

---

## 💻 Como Clonar e Configurar o Repositório

Agora vamos baixar o repositório para seu computador.

### 1. Obter a URL do seu fork

No **seu repositório** (não no original):
- Clique no botão verde **"Code"**
- Copie a URL HTTPS: `https://github.com/SEU-USUARIO/backend-frameworks-uninassau-2026-exercicios.git`

### 2. Clonar o repositório

Abra o terminal/prompt de comando e navegue até a pasta onde deseja salvar:

```bash
# Exemplo: ir para a pasta de projetos
cd ~/projetos  # Linux/Mac
cd C:\projetos  # Windows

# Clonar o repositório
git clone https://github.com/SEU-USUARIO/backend-frameworks-uninassau-2026-exercicios.git

# Entrar na pasta do projeto
cd backend-frameworks-uninassau-2026-exercicios
```

### 3. Instalar dependências

```bash
# Instalar todas as bibliotecas necessárias
npm install

# Aguarde a instalação (pode levar alguns minutos)
```

### 4. Configurar o remote upstream (importante!)

Isso permite que você receba atualizações do repositório original:

```bash
# Adicionar o repositório original como upstream
git remote add upstream https://github.com/UNINASSAU/backend-frameworks-uninassau-2026-exercicios.git

# Verificar se foi adicionado
git remote -v

# Deve mostrar:
# origin    https://github.com/SEU-USUARIO/... (seu fork)
# upstream  https://github.com/UNINASSAU/... (repositório original)
```

### 5. Verificar se tudo está funcionando

```bash
# Rodar os testes para verificar a instalação
npm test

# Você verá os testes rodando (provavelmente alguns falharão - é esperado!)
```

✅ **Configuração completa!** Você está pronto para começar a resolver exercícios.

---

## 🎯 Como Resolver um Exercício (Passo a Passo Detalhado)

Vamos resolver um exercício do início ao fim.

### Passo 1: Atualizar seu repositório

**Sempre faça isso antes de começar um novo exercício!**

```bash
# Buscar atualizações do repositório original
git fetch upstream

# Mesclar as atualizações na sua branch main
git checkout main
git merge upstream/main

# Enviar para seu fork no GitHub
git push origin main
```

### Passo 2: Criar uma branch para o exercício

**Nunca trabalhe diretamente na branch `main`!**

```bash
# Criar e mudar para uma nova branch
git checkout -b exercicio-01

# Padrão de nome: exercicio-XX (onde XX é o número do exercício)
```

### Passo 3: Abrir o exercício

```bash
# Abrir o projeto no VS Code
code .

# Ou abra manualmente a pasta no seu editor
```

### Passo 4: Localizar o arquivo do exercício

Estrutura típica:
```
exercicios/
├── ex01/
│   ├── README.md          ← Instruções do exercício
│   ├── exercicio.js       ← Seu código vai aqui
│   └── exercicio.test.js  ← Testes (NÃO MODIFICAR)
├── ex02/
└── ...
```

### Passo 5: Ler as instruções

1. Abra o arquivo `exercicios/ex01/README.md`
2. Leia **cuidadosamente** todas as instruções
3. Entenda o que é pedido antes de começar a codificar
4. Note os exemplos de entrada e saída esperada

### Passo 6: Implementar a solução

1. Abra o arquivo `exercicios/ex01/exercicio.js`
2. Você verá algo como:

```javascript
/**
 * Exercício 01: Somar dois números
 * 
 * Implemente uma função que recebe dois números e retorna a soma deles.
 * 
 * @param {number} a - Primeiro número
 * @param {number} b - Segundo número
 * @returns {number} A soma de a + b
 */
function somar(a, b) {
  // TODO: Implemente sua solução aqui
  
}

module.exports = { somar };
```

3. Implemente sua solução:

```javascript
function somar(a, b) {
  return a + b;
}

module.exports = { somar };
```

### Passo 7: Testar sua solução localmente

```bash
# Rodar apenas os testes do exercício 01
npm test -- ex01

# Ou rodar todos os testes
npm test
```

**Interpretar o resultado:**
- ✅ **PASS** - Teste passou! Sua solução está correta
- ❌ **FAIL** - Teste falhou. Leia a mensagem de erro e corrija

Exemplo de saída:
```
PASS exercicios/ex01/exercicio.test.js
  ✓ deve somar 2 + 3 e retornar 5 (2ms)
  ✓ deve somar números negativos (-1 + -2 = -3) (1ms)
  ✓ deve somar zero (0 + 5 = 5) (1ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
```

### Passo 8: Ajustar até todos os testes passarem

- Se algum teste falhar, leia a mensagem de erro
- Ajuste seu código
- Rode os testes novamente
- Repita até todos passarem ✅

---

## 🧪 Como Rodar Testes Localmente

### Comandos básicos de teste:

```bash
# Rodar TODOS os testes
npm test

# Rodar testes de um exercício específico
npm test -- ex01

# Rodar testes em modo watch (re-executa ao salvar arquivos)
npm test -- --watch

# Rodar testes com cobertura de código
npm test -- --coverage

# Rodar apenas testes que falharam na última execução
npm test -- --onlyFailures
```

### Entendendo a saída dos testes:

#### ✅ Teste passou:
```
✓ deve retornar a soma correta (3ms)
```

#### ❌ Teste falhou:
```
✕ deve retornar a soma correta (5ms)

  expect(received).toBe(expected)

  Expected: 5
  Received: 8

    4 |   test('deve somar 2 + 3', () => {
  > 5 |     expect(somar(2, 3)).toBe(5);
      |                        ^
    6 |   });
```

**Como interpretar:**
- **Expected:** O que o teste esperava (5)
- **Received:** O que sua função retornou (8)
- **Linha 5:** Onde o erro aconteceu

### Dicas para debugging:

```javascript
// Use console.log para debug
function somar(a, b) {
  console.log('a:', a, 'b:', b); // Debug: ver os valores
  const resultado = a + b;
  console.log('resultado:', resultado); // Debug: ver o resultado
  return resultado;
}
```

---

## 📤 Como Fazer Commit e Push

Quando todos os testes estiverem passando, é hora de salvar suas alterações.

### Passo 1: Verificar o que foi modificado

```bash
# Ver arquivos modificados
git status

# Ver as diferenças no código
git diff
```

### Passo 2: Adicionar arquivos ao commit

```bash
# Adicionar um arquivo específico
git add exercicios/ex01/exercicio.js

# Ou adicionar todos os arquivos modificados
git add .
```

### Passo 3: Fazer o commit

```bash
# Commit com mensagem descritiva
git commit -m "feat: resolver exercício 01 - soma de números"
```

**Padrão de mensagens de commit:**
- `feat: descrição` - Nova funcionalidade/exercício resolvido
- `fix: descrição` - Correção de bug
- `docs: descrição` - Mudanças na documentação
- `test: descrição` - Adicionar ou modificar testes
- `refactor: descrição` - Refatoração de código

### Passo 4: Enviar para o GitHub

```bash
# Push da branch para seu fork
git push origin exercicio-01

# Na primeira vez, pode pedir suas credenciais do GitHub
```

✅ **Alterações enviadas!** Agora você pode criar um Pull Request.

---

## 🔀 Como Abrir Pull Request

O Pull Request (PR) é a submissão oficial do seu exercício para avaliação.

### Passo 1: Acessar seu fork no GitHub

- Vá para: `https://github.com/SEU-USUARIO/backend-frameworks-uninassau-2026-exercicios`

### Passo 2: Criar o Pull Request

1. Você verá um banner amarelo: **"exercicio-01 had recent pushes"**
   - Clique em **"Compare & pull request"**

2. **OU** clique em:
   - Tab **"Pull requests"**
   - Botão verde **"New pull request"**
   - **"compare across forks"**
   - Base repository: `UNINASSAU/backend-frameworks-uninassau-2026-exercicios` (base: `main`)
   - Head repository: `SEU-USUARIO/backend-frameworks-uninassau-2026-exercicios` (compare: `exercicio-01`)

### Passo 3: Preencher o Pull Request

**Título:**
```
Exercício 01 - [Seu Nome]
```

**Descrição (template):**
```markdown
## Exercício Resolvido
- [x] Exercício 01: Soma de números

## Checklist
- [x] Todos os testes estão passando localmente
- [x] Código está limpo e comentado
- [x] Segui as convenções de código do projeto

## Observações
(Adicione qualquer observação relevante, dúvidas ou comentários)
```

### Passo 4: Criar o PR

- Clique em **"Create pull request"**
- Aguarde os checks automáticos rodarem

✅ **Pull Request criado!** Agora aguarde o feedback automático.

---

## 🤖 Como Interpretar o Feedback do Bot

Após criar o PR, o bot executará os testes automaticamente.

### Status do PR:

#### ✅ Checks Passed (Verde)
```
✅ All checks have passed
```
**Significado:** Todos os testes passaram! Seu exercício está correto.

**Próximos passos:**
- Aguarde a revisão do professor (se houver)
- Seu PR pode ser aprovado e mergeado

#### ❌ Checks Failed (Vermelho)
```
❌ Some checks were not successful
```
**Significado:** Alguns testes falharam.

**Próximos passos:**
1. Clique em **"Details"** para ver os logs
2. Identifique qual teste falhou
3. Corrija seu código localmente
4. Faça commit e push das correções
5. O bot rodará os testes novamente automaticamente

### Ver detalhes dos testes:

1. Na página do PR, vá até a seção **"Checks"**
2. Clique em **"Details"** ao lado do check que falhou
3. Você verá os logs completos dos testes:

```
FAIL exercicios/ex01/exercicio.test.js
  ✕ deve somar 2 + 3 e retornar 5

  Expected: 5
  Received: 8
```

### Corrigir e reenviar:

```bash
# Corrigir o código
# (editar o arquivo exercicio.js)

# Testar localmente
npm test -- ex01

# Commit e push
git add .
git commit -m "fix: corrigir lógica da soma"
git push origin exercicio-01

# O bot rodará automaticamente de novo!
```

### Comentários automáticos do bot:

O bot pode deixar comentários no seu PR:

- **"Todos os testes passaram! ✅"** - Sucesso!
- **"X testes falharam. Veja os detalhes."** - Corrija e reenvie
- **"Código não segue as convenções"** - Problemas de estilo (lint)

---

## 🔧 Troubleshooting Comum

### Problema 1: "npm install" falha

**Erro:**
```
npm ERR! code ENOENT
npm ERR! syscall open
```

**Solução:**
```bash
# Limpar cache do npm
npm cache clean --force

# Deletar node_modules e package-lock.json
rm -rf node_modules package-lock.json  # Linux/Mac
rmdir /s node_modules & del package-lock.json  # Windows

# Reinstalar
npm install
```

### Problema 2: Testes não rodam

**Erro:**
```
'jest' is not recognized as an internal or external command
```

**Solução:**
```bash
# Certifique-se de que instalou as dependências
npm install

# Verificar se Jest está instalado
npm list jest

# Se não estiver, instalar manualmente
npm install --save-dev jest
```

### Problema 3: Git push pede senha o tempo todo

**Solução (usar SSH):**

```bash
# Gerar chave SSH
ssh-keygen -t ed25519 -C "[email protected]"

# Copiar a chave pública
cat ~/.ssh/id_ed25519.pub  # Linux/Mac
type %USERPROFILE%\.ssh\id_ed25519.pub  # Windows

# Adicionar no GitHub:
# Settings → SSH and GPG keys → New SSH key → Colar a chave

# Mudar o remote para SSH
git remote set-url origin [email protected]:SEU-USUARIO/backend-frameworks-uninassau-2026-exercicios.git
```

### Problema 4: Branch desatualizada

**Erro:**
```
Your branch is behind 'origin/main' by 3 commits
```

**Solução:**
```bash
# Voltar para main
git checkout main

# Atualizar do upstream
git fetch upstream
git merge upstream/main

# Atualizar seu fork
git push origin main

# Voltar para sua branch de trabalho
git checkout exercicio-01

# Atualizar com as mudanças da main
git rebase main
```

### Problema 5: Conflitos de merge

**Erro:**
```
CONFLICT (content): Merge conflict in exercicios/ex01/exercicio.js
```

**Solução:**
```bash
# Abrir o arquivo com conflito
# Procurar por marcadores:
<<<<<<< HEAD
seu código
=======
código conflitante
>>>>>>> upstream/main

# Editar manualmente, removendo os marcadores e escolhendo o código correto

# Marcar como resolvido
git add exercicios/ex01/exercicio.js
git commit -m "fix: resolver conflito de merge"
```

### Problema 6: Esqueci de criar uma branch

**Solução:**
```bash
# Se você já fez commits na main:
# Criar uma nova branch a partir da main atual
git checkout -b exercicio-01

# Voltar a main para o estado original
git checkout main
git reset --hard origin/main

# Voltar para sua branch com os commits
git checkout exercicio-01
```

### Problema 7: Quero descartar todas as mudanças

**Solução:**
```bash
# ATENÇÃO: Isso apaga todas as mudanças não commitadas!

# Descartar mudanças em arquivos específicos
git checkout -- exercicios/ex01/exercicio.js

# Descartar TODAS as mudanças
git reset --hard HEAD

# Limpar arquivos não rastreados
git clean -fd
```

---

## 💡 Dicas de Boas Práticas

### 1. Organização

✅ **Faça:**
- Resolva um exercício por vez
- Crie uma branch para cada exercício
- Commit frequentemente com mensagens descritivas
- Mantenha seu fork atualizado com o upstream

❌ **Evite:**
- Resolver múltiplos exercícios na mesma branch
- Commits com mensagens vagas ("update", "fix", "teste")
- Trabalhar diretamente na branch `main`

### 2. Testes

✅ **Faça:**
- Rode os testes antes de fazer push
- Entenda por que um teste falhou antes de corrigir
- Teste casos extremos (números negativos, zero, valores grandes)

❌ **Evite:**
- Modificar os arquivos de teste
- Fazer push sem rodar os testes localmente
- "Trapacear" nos testes (hardcoding resultados específicos)

### 3. Código Limpo

✅ **Faça:**
```javascript
// Bom: nomes descritivos, código claro
function calcularMedia(notas) {
  const soma = notas.reduce((acc, nota) => acc + nota, 0);
  return soma / notas.length;
}
```

❌ **Evite:**
```javascript
// Ruim: nomes vagos, código confuso
function calc(n) {
  let s = 0;
  for(let i = 0; i < n.length; i++) s += n[i];
  return s / n.length;
}
```

**Convenções:**
- Use `camelCase` para variáveis e funções
- Nomes descritivos e em português (se o projeto usar PT)
- Indentação de 2 espaços
- Comente apenas o que não é óbvio

### 4. Mensagens de Commit

✅ **Boas mensagens:**
```bash
git commit -m "feat: implementar função de soma"
git commit -m "fix: corrigir validação de entrada para números negativos"
git commit -m "refactor: simplificar lógica do cálculo de média"
git commit -m "docs: adicionar exemplos no README do ex02"
```

❌ **Mensagens ruins:**
```bash
git commit -m "update"
git commit -m "fix"
git commit -m "asdasd"
git commit -m "tentativa 3"
```

### 5. Pull Requests

✅ **Faça:**
- Título claro: "Exercício XX - Seu Nome"
- Descrição completa do que foi feito
- Marque o checklist
- Responda aos comentários de revisão

❌ **Evite:**
- PRs sem descrição
- Múltiplos exercícios no mesmo PR
- Ignorar feedback de revisão

### 6. Aprendizado

✅ **Faça:**
- Entenda a solução, não apenas copie
- Pesquise conceitos que não entender
- Peça ajuda quando travar (mas tente primeiro!)
- Revise PRs de colegas (se permitido)

❌ **Evite:**
- Copiar código sem entender
- Pular exercícios "difíceis"
- Não ler a documentação/instruções

### 7. Workflow eficiente

```bash
# Fluxo ideal para cada exercício:

# 1. Atualizar
git checkout main
git pull upstream main
git push origin main

# 2. Nova branch
git checkout -b exercicio-XX

# 3. Resolver
# (editar código)

# 4. Testar
npm test -- exXX

# 5. Commit
git add .
git commit -m "feat: resolver exercício XX"

# 6. Push
git push origin exercicio-XX

# 7. Abrir PR no GitHub

# 8. Após aprovação, voltar para main
git checkout main
git pull upstream main
```

---

## 🎓 Próximos Passos

Agora que você domina o fluxo de trabalho:

1. **Explore os exercícios** disponíveis
2. **Comece pelo mais fácil** e avance gradualmente
3. **Não tenha medo de errar** - é assim que se aprende!
4. **Peça ajuda** quando precisar (Discord/Fórum da turma)
5. **Ajude seus colegas** quando puder

**Recursos úteis:**
- 📖 Documentação do Node.js: [nodejs.org/docs](https://nodejs.org/docs)
- 📖 Documentação do Git: [git-scm.com/doc](https://git-scm.com/doc)
- 📖 GitHub Guides: [guides.github.com](https://guides.github.com)

---

## 📞 Suporte

**Problemas técnicos?**
- Consulte a seção [Troubleshooting](#-troubleshooting-comum)
- Abra uma Issue no GitHub
- Pergunte no Discord/Fórum da turma

**Dúvidas sobre exercícios?**
- Releia as instruções do exercício
- Consulte a documentação oficial
- Peça ajuda ao professor ou monitores

---

**Bom trabalho e bons estudos! 🚀**
