const path = require('path');
const fs = require('fs');

// Helper pour lire la liste des jeux
function lireJeux() {
  const jeuxPath = path.join(__dirname, 'public', 'jeux.json');
  if (fs.existsSync(jeuxPath)) {
    return JSON.parse(fs.readFileSync(jeuxPath, 'utf-8'));
  }
  return [];
}

// Renvoie les jeux tirés avec leur clé associée
async function getJeuxAvecKeys() {
  
  const keysPath = path.join(__dirname, 'keys.json');
  const keys = JSON.parse(fs.readFileSync(keysPath, 'utf-8'));

  const jeux = lireJeux();
  if (!jeux || jeux.length === 0) {
    throw new Error("Aucun jeu trouvé dans jeux.json");
  }

  // Pour chaque jeu, on ajoute la propriété 'key' (ou 'cle') depuis keys.json :
  const jeuxAvecKeys = jeux.map(jeu => ({
    ...jeu,
    key: keys[jeu.nom] && keys[jeu.nom].length > 0 ? keys[jeu.nom][0] : null
  }));

  return jeuxAvecKeys;
}
module.exports = {
  getJeuxAvecKeys
};