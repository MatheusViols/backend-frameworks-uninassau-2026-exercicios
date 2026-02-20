const express = require('express');
const sequelize = require('./config/database');
const postsRouter = require('./routes/posts');

const app = express();
app.use(express.json());

app.use('/posts', postsRouter);

const PORT = process.env.PORT || 3000;

// Sincronizar banco e iniciar servidor
if (require.main === module) {
  sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

module.exports = app;
