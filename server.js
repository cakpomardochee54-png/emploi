const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static('public'));

const fichier = path.join(__dirname, 'emploi.json');

app.get('/api/emploi', (req, res) => {
  fs.readFile(fichier, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erreur lecture');
    res.json(JSON.parse(data));
  });
});

app.post('/api/emploi', (req, res) => {
  fs.writeFile(fichier, JSON.stringify(req.body, null, 2), err => {
    if (err) return res.status(500).send('Erreur écriture');
    res.send('Données sauvegardées');
  });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
