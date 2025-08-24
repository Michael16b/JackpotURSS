const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Pour servir les fichiers statiques (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Pour servir la page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Endpoint pour recevoir les clés Steam
app.get('/jackpot', (req, res) => {
  // Charge les clés
  const keys = JSON.parse(fs.readFileSync('keys.json'));
  // Tire 10 clés aléatoires
  const randomKeys = keys.sort(() => 0.5 - Math.random()).slice(0, 10);
  res.json({ keys: randomKeys });
});

app.listen(PORT, () => {
  console.log(`JackpotURSS tourne sur http://localhost:${PORT}`);
});