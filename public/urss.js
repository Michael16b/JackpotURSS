const liensChelous = [
  "https://www.yandex.ru/",
  "http://www.404page.ru/",
  "https://www.kulturologia.ru/",
  "https://www.komarovskiy.net/",
  "http://www.pikabu.ru/",

  "https://www.kaskus.co.id/",
  "https://www.klikindomaret.com/",
  "https://www.bola.com/",
  "https://www.jpnn.com/",
  "https://theuselessweb.com/",
  "http://pointerpointer.com/",
  "https://www.staggeringbeauty.com/",
  "https://www.patience-is-a-virtue.org/",
  "https://www.koalastothemax.com/",
  "https://www.zoomquilt.org/",
  "http://www.windows93.net/",
  "https://fakeupdate.net/",
  "https://www.trypap.com/",
  "https://north-verification.com/notif.html?an=at&cid=57687907c3c6082ad3d714afe91422e3&sid=26578321",
  "https://heroadblocker.pro/ext.php?ah=dgtr17hUtCI&ao=26578321&ak=5764133fdf643d66348c200bf600e637&aj=tr&an=2&am=1164916",
  "https://neollowerii.com/click.php?key=d2i8ifl92fb002n660b0&type=TBI&age=&creative_id=&campaign_id=&site_id=18746&placement_id=61914085&preset_id=&click_id=5768382c61838974a32fcb1c8023805f&entity_placement_id=61713",
  "https://siltable.com/click.php?key=d2ivck592fb0024prrfg&type=TBI&age=&creative_id=&campaign_id=&site_id=18941&placement_id=62010275&preset_id=&click_id=5767fae35870a7beaa936dc0f3446dca&entity_placement_id=61713",
  "https://lakns.com/afu.php?zoneid=5593108&var=5593108&rid=ksX-wKK1z8yLZCaWKyzJyw%3D%3D&rhd=false&ab2r=0&sf=1&os=windows&os_version=19.0.0&is_mobile=false&browser_version=130.0.6723.117",
  "https://lakns.com/afu.php?zoneid=5593108&var=5593108&rid=ksX-wKK1z8yLZCaWKyzJyw%3D%3D&rhd=false&ab2r=0&sf=1&os=windows&os_version=19.0.0&is_mobile=false&browser_version=130.0.6723.117"
];

let compteurClic = 0;

document.getElementById('jackpot-btn').onclick = () => {
  compteurClic++;
  if (compteurClic % 5 === 0) {
    // On peut afficher la vraie popup en plus si besoin :
    const paiementModal = new bootstrap.Modal(document.getElementById('paiementModal'));
    paiementModal.show();
    document.getElementById('paiement-feedback').textContent = "";
    document.getElementById('fake-paiement-form').reset();
    compteurClic = 0; // Remise à zéro après la popup/pub
  } else {
    const url = liensChelous[Math.floor(Math.random() * liensChelous.length)];
    window.open(url, '_blank');
    document.getElementById('result').innerHTML =
      `<div class="alert alert-warning mt-3">Encore ${3 - (compteurClic % 3)} clique${3 - (compteurClic % 3) === 1 ? '' : 's'} avant la vraie chance et... une surprise !</div>`;
  }
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
      // Redirection réelle vers /jackpot
      window.location.href = '/jackpot';
    }, 1100);
  } else {
    feedback.textContent = "Échec du paiement.";
    feedback.style.color = "red";
  }
};