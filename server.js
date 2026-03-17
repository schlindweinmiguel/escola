// server.js

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let reclamacoes = [];

app.post('/reclamacao', (req, res) => {
  reclamacoes.push(req.body);
  res.send('OK');
});

app.get('/reclamacoes', (req, res) => {
  res.json(reclamacoes);
});

app.listen(3000, () => console.log('Servidor rodando'));
