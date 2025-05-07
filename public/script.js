const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota para salvar nome
app.post('/api/nome', async (req, res) => {
  const { nome } = req.body;
  try {
    await db.query('INSERT INTO nomes (nome) VALUES (?)', [nome]);
    res.json({ message: 'Nome salvo com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao salvar nome.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
