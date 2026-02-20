# Solução: Exercício 11 - Upload

## src/server.js
```javascript
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo inválido. Use JPG ou PNG.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

// Servir arquivos estáticos
app.use('/uploads', express.static('uploads'));

app.post('/upload/avatar', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }
  
  res.json({
    message: 'Upload realizado com sucesso',
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`
  });
});

// Error handler para erros do Multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'Arquivo muito grande (max 2MB)' });
    }
  }
  res.status(400).json({ error: err.message });
});

if (require.main === module) {
  app.listen(3000, () => console.log('Servidor na porta 3000'));
}

module.exports = app;
```
