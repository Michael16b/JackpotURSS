const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');

const app = express();

// Sert le dossier public (JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/jackpot', (req, res) => {
  try {
    const keysPath = path.join(__dirname, 'keys.json');
    let keys = {};
    if (fs.existsSync(keysPath)) keys = JSON.parse(fs.readFileSync(keysPath, 'utf-8'));

    // Lecture des jeux
    const jeux = lireJeux();

    // Tirage jeux
    const selection = tirageJeux(jeux);

    // Pour chaque jeu, associe une clé Steam (si dispo)
    const jeuxAvecKeys = selection.map(j => ({
      nom: j.nom,
      image: j.image,
      cle: keys[j.nom] && keys[j.nom].length > 0 ? keys[j.nom][0] : null
    }));

    res.json({ jeux: jeuxAvecKeys });
  } catch (error) {
    console.error("Erreur dans /jackpot :", error);
    res.status(500).json({ error: "Erreur interne serveur" });
  }
});

// Options SSL Let's Encrypt
const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/jackpoturss.ddns.net/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/jackpoturss.ddns.net/fullchain.pem')
};

// Serveur HTTPS sur le port 443
https.createServer(sslOptions, app).listen(443, () => {
  console.log('Serveur HTTPS démarré sur https://jackpoturss.ddns.net');
});

// Serveur HTTP sur le port 80, redirige vers HTTPS
http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers.host + req.url });
  res.end();
}).listen(80);ça
console.log('Serveur HTTP démarré sur http://jackpoturss.ddns.net, redirection vers HTTPS');