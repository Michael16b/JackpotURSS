const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');
const { getJeuxAvecKeys } = require('./jeuService');

const app = express();

// Sert le dossier public (JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/jackpot', (req, res) => {
  try {
    const jeuxAvecKeys = getJeuxAvecKeys();
    res.json({ jeux: jeuxAvecKeys });
  } catch (error) {
    console.error("Erreur dans /jackpot :", error);
    res.status(500).json({ error: "Erreur interne serveur" });
  }
});


app.get('/jackpot', (req, res) => {
  try {
    const jeuxAvecKeys = getJeuxAvecKeys();
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
}).listen(80);
console.log('Serveur HTTP démarré sur http://jackpoturss.ddns.net, redirection vers HTTPS');