# Exercício 11: Upload de Arquivos com Multer

## Objetivo
Implementar upload de imagens com validação.

## Requisitos
- POST /upload/avatar - Upload de imagem
- Validar tipo (jpg, png)
- Validar tamanho (max 2MB)
- Salvar em /uploads
- Servir arquivos estáticos
- GET /uploads/:filename - Visualizar arquivo

## Dependências
```bash
npm install multer
```

## Teste
```bash
# Upload de arquivo
curl -X POST http://localhost:3000/upload/avatar \
  -F "avatar=@foto.jpg"

# Acessar arquivo
curl http://localhost:3000/uploads/nome-do-arquivo.jpg
```
