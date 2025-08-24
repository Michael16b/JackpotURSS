// Ouvre la modale au clic sur le bouton principal
document.getElementById('jackpot-btn').onclick = () => {
  const paiementModal = new bootstrap.Modal(document.getElementById('paiementModal'));
  paiementModal.show();
};

// Gestion du paiement fictif
document.getElementById('fake-paiement-form').onsubmit = function(e) {
  e.preventDefault();
  const form = this;
  const feedback = document.getElementById('paiement-feedback');
  if (!form.checkValidity()) {
    feedback.textContent = "Veuillez remplir correctement tous les champs.";
    feedback.style.color = "orange";
    return;
  }
  // Simulation : succès ou échec aléatoire
  const isSuccess = Math.random() > 0.2;
  if (isSuccess) {
    feedback.textContent = "Paiement réussi !";
    feedback.style.color = "green";
    setTimeout(() => {
      // Ferme la modale
      bootstrap.Modal.getInstance(document.getElementById('paiementModal')).hide();
      // Récupère les clés (ton code existant)
      fetch('/jackpot')
        .then(res => res.json())
        .then(data => {
          document.getElementById('result').innerHTML = `
            <h2>Voici tes clés camarade :</h2>
            <ul class="list-group">
              ${data.keys.map(key => `<li class="list-group-item urss-key">${key}</li>`).join('')}
            </ul>
          `;
        });
    }, 1100);
  } else {
    feedback.textContent = "Échec du paiement.";
    feedback.style.color = "red";
  }
};