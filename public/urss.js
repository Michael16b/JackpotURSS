document.getElementById('jackpot-btn').onclick = () => {
  const paiementModal = new bootstrap.Modal(document.getElementById('paiementModal'));
  paiementModal.show();
  document.getElementById('paiement-feedback').textContent = "";
  document.getElementById('fake-paiement-form').reset();
};

document.getElementById('fake-paiement-form').onsubmit = function(e) {
  e.preventDefault();
  const form = this;
  const feedback = document.getElementById('paiement-feedback');
  if (!form.checkValidity()) {
    feedback.textContent = "Veuillez remplir correctement tous les champs.";
    feedback.style.color = "orange";
    return;
  }
  // Simulation du paiement
  const isSuccess = Math.random() > 0.2;
  if (isSuccess) {
    feedback.textContent = "Paiement réussi !";
    feedback.style.color = "green";
    setTimeout(() => {
      bootstrap.Modal.getInstance(document.getElementById('paiementModal')).hide();
      fetch('/jackpot')
        .then(res => res.json())
        .then(data => {
          // Affiche les jeux tirés avec image et clé
          document.body.innerHTML = `
            <div class="container mt-5">
              <h2 class="mb-4">Voici tes jeux camarade :</h2>
              <div class="row">
                ${data.jeux.map(j => `
                  <div class="col-md-4 mb-4">
                    <div class="card h-100">
                      <img src="${j.image}" class="card-img-top" alt="${j.nom}">
                      <div class="card-body">
                        <h5 class="card-title">${j.nom}</h5>
                        <p class="card-text"><strong>Clé Steam :</strong> ${j.cle || "Non disponible"}</p>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
              <a href="/" class="btn btn-danger mt-4">Revenir à l'accueil</a>
            </div>
          `;
        })
        .catch(err => {
          document.body.innerHTML = "<div class='alert alert-danger'>Erreur serveur : impossible de récupérer les jeux.</div>";
          console.error("Erreur côté client : ", err);
        });
    }, 1100);
  } else {
    feedback.textContent = "Échec du paiement.";
    feedback.style.color = "red";
  }
};