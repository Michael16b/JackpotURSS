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


async function getGameImage(gameName) {
  const apiUrl = `https://api.rawg.io/api/games?search=${encodeURIComponent(gameName)}&key=a9d70e59dc724545b9d2b2a77e9901a2`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  // Vérifie que le jeu existe et récupère l'image
  if (data.results && data.results.length > 0) {
    return data.results[0].background_image;
  }
  return null;
}


// Tirage aléatoire de 10 jeux dont GTA 6
function tirageJeux(jeux) {
  const gta6 = jeux.find(j => j.nom === "GTA 6");
  const autres = jeux.filter(j => j.nom !== "GTA 6");
  const melange = autres.sort(() => Math.random() - 0.5).slice(0, 9);
  melange.push(gta6);
  return melange.sort(() => Math.random() - 0.5);
}

// Renvoie les jeux tirés avec leur clé associée
async function getJeuxAvecKeys() {
  
  const keysPath = path.join(__dirname, 'keys.json');
  let keys = {};
  if (fs.existsSync(keysPath)) keys = JSON.parse(fs.readFileSync(keysPath, 'utf-8'));

  const jeux = lireJeux();
  if (!jeux || jeux.length === 0) {
    throw new Error("Aucun jeu trouvé dans jeux.json");
  }

  const selection = tirageJeux(jeux);

  // Pour chaque jeu, ajoute l'image récupérée via l'API RAWG
  const jeuxComplet = await Promise.all(selection.map(async j => {
    const image = await getGameImage(j.nom);
    return {
      nom: j.nom,
      image, // image dynamique
      cle: keys[j.nom] && keys[j.nom].length > 0 ? keys[j.nom][0] : null
    };
  }));

  return jeuxComplet;
}

module.exports = {
  getJeuxAvecKeys
};