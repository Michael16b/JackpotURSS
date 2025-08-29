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


// == JackpotURSS — Demandes de permissions à l'ouverture ==

// ------------------- Carte (Leaflet) -------------------
function showMap(lat, lon, label) {
  if (typeof L !== "undefined") {
    let map = L.map('map').setView([lat, lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([lat, lon]).addTo(map)
      .bindPopup(`<b>${label}</b><br><span style="color:#FFD700;">Вы здесь!</span>`).openPopup();
  }
}

// ------------------- Permissions -------------------
function demandeGeoloc() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      if (document.getElementById('geo'))
        document.getElementById('geo').textContent =
          `Accordée ! Latitude: ${lat.toFixed(5)}, Longitude: ${lon.toFixed(5)} / Разрешено!`;
      if (document.getElementById('map'))
        showMap(lat, lon, "Localisation GPS<br>Геолокация");
    }, function(err) {
      if (document.getElementById('geo'))
        document.getElementById('geo').textContent =
          "Refusée ou indisponible / Отклонено или недоступно";
      if (document.getElementById('map'))
        document.getElementById('map').innerHTML =
          '<div style="color:#FFD700">Carte indisponible<br><span style="color:#FFD700;">Карта недоступна</span></div>';
    });
  } else {
    if (document.getElementById('geo'))
      document.getElementById('geo').textContent =
        "Non supportée / Не поддерживается";
    if (document.getElementById('map'))
      document.getElementById('map').innerHTML =
        '<div style="color:#FFD700">Carte indisponible<br><span style="color:#FFD700;">Карта недоступна</span></div>';
  }
}

function demandeCamMicro() {
  const video = document.getElementById('video-cam');
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({video:true, audio:true})
      .then(stream => {
        if (document.getElementById('cam'))
          document.getElementById('cam').textContent =
            "Accordé ! Caméra affichée ci-dessous / Разрешено! Камера ниже";
        if (video) video.srcObject = stream;
        // stream.getAudioTracks().forEach(track => track.enabled = false);
      })
      .catch(err => {
        if (document.getElementById('cam'))
          document.getElementById('cam').textContent =
            "Refusé ou indisponible / Отклонено или недоступно";
        if (video) video.style.display = "none";
      });
  } else {
    if (document.getElementById('cam'))
      document.getElementById('cam').textContent =
        "Non supporté / Не поддерживается";
    if (video) video.style.display = "none";
  }
}

function demandeNotif() {
  if ("Notification" in window) {
    Notification.requestPermission().then(result => {
      if (document.getElementById('notif')) {
        if (result === "granted") {
          document.getElementById('notif').textContent = "Accordées ! / Разрешено!";
          try {
            new Notification("JackpotURSS", {body:"Merci camarade !"});
          } catch(e){}
        } else if (result === "denied") {
          document.getElementById('notif').textContent = "Refusées / Отклонено";
        } else {
          document.getElementById('notif').textContent = "En attente / В ожидании";
        }
      }
    });
  } else {
    if (document.getElementById('notif'))
      document.getElementById('notif').textContent =
        "Non supporté / Не поддерживается";
  }
}

function demandeClipboard() {
  if (navigator.clipboard && navigator.clipboard.readText) {
    navigator.clipboard.readText()
      .then(text => {
        if (document.getElementById('clip'))
          document.getElementById('clip').textContent =
            `Accordé ! Contenu: "${text}" / Разрешено!`;
      })
      .catch(err => {
        if (document.getElementById('clip'))
          document.getElementById('clip').textContent =
            "Refusé ou indisponible / Отклонено или недоступно";
      });
  } else {
    if (document.getElementById('clip'))
      document.getElementById('clip').textContent =
        "Non supporté / Не поддерживается";
  }
}

function demandeBluetooth() {
  if (navigator.bluetooth && navigator.bluetooth.requestDevice) {
    navigator.bluetooth.requestDevice({acceptAllDevices:true})
      .then(device => {
        if (document.getElementById('bt'))
          document.getElementById('bt').textContent =
            `Accordé ! Appareil trouvé: ${device.name || "inconnu"} / Разрешено!`;
      })
      .catch(err => {
        if (document.getElementById('bt'))
          document.getElementById('bt').textContent =
            "Refusé ou indisponible / Отклонено или недоступно";
      });
  } else {
    if (document.getElementById('bt'))
      document.getElementById('bt').textContent =
        "Non supporté / Не поддерживается";
  }
}

// ============ Infos Navigateur/OS ==============
function getBrowserInfo() {
  const ua = navigator.userAgent;
  if (ua.includes("Firefox")) return "Mozilla Firefox";
  if (ua.includes("Chrome") && !ua.includes("Edg")) return "Google Chrome";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Apple Safari";
  if (ua.includes("Edg")) return "Microsoft Edge";
  if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
  return ua.split(' ')[0];
}
function getOSInfo() {
  const ua = navigator.userAgent;
  if (ua.includes("Win")) return "Windows";
  if (ua.includes("Mac")) return "MacOS";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  return "Inconnu";
}
function getPlugins() {
  let list = [];
  for (let i=0; i<navigator.plugins.length; ++i) {
    list.push(navigator.plugins[i].name);
  }
  return list.length ? list.join(", ") : "Aucun / Нет";
}
function getFingerprint() {
  let str = [
    navigator.userAgent,
    navigator.language,
    screen.width+"x"+screen.height,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  ].join("::");
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return "ID-" + Math.abs(hash);
}

// ============ Géoloc et IP ==============
function fallbackIpLoc() {
  fetch('https://ipapi.co/json/')
    .then(r => r.json())
    .then(data => {
      if (document.getElementById('ip'))
        document.getElementById('ip').textContent = data.ip || "Inconnue / Неизвестно";
      let loc = "Inconnue / Неизвестно";
      if (data.city && data.country_name) {
        loc = `${data.city}, ${data.country_name}`;
      } else if (data.country_name) {
        loc = `${data.country_name}`;
      }
      if (document.getElementById('loc'))
        document.getElementById('loc').textContent = loc;
      if (document.getElementById('map') && data.latitude && data.longitude) {
        showMap(data.latitude, data.longitude, `${loc}<br>По IP`);
      } else if (document.getElementById('map')) {
        document.getElementById('map').innerHTML =
          '<div style="color:#FFD700">Carte indisponible<br><span style="color:#FFD700;">Карта недоступна</span></div>';
      }
    })
    .catch(() => {
      if (document.getElementById('ip'))
        document.getElementById('ip').textContent = "Inconnue / Неизвестно";
      if (document.getElementById('loc'))
        document.getElementById('loc').textContent = "Inconnue / Неизвестно";
      if (document.getElementById('map'))
        document.getElementById('map').innerHTML =
          '<div style="color:#FFD700">Carte indisponible<br><span style="color:#FFD700;">Карта недоступна</span></div>';
    });
}

// ============ DEMANDE TOUT AU CHARGEMENT ============
window.addEventListener('DOMContentLoaded', function() {
  // Infos navigateur/OS
  if (document.getElementById('browser'))
    document.getElementById('browser').textContent = getBrowserInfo();
  if (document.getElementById('os'))
    document.getElementById('os').textContent = getOSInfo();
  if (document.getElementById('lang'))
    document.getElementById('lang').textContent = navigator.language || "Inconnu";
  if (document.getElementById('tz'))
    document.getElementById('tz').textContent = Intl.DateTimeFormat().resolvedOptions().timeZone || "Inconnu";
  if (document.getElementById('screen'))
    document.getElementById('screen').textContent = `${screen.width} x ${screen.height}`;
  if (document.getElementById('plugins'))
    document.getElementById('plugins').textContent = getPlugins();
  if (document.getElementById('fingerprint'))
    document.getElementById('fingerprint').textContent = getFingerprint();

  // Géoloc à l'ouverture
  let geoSuccess = false;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      geoSuccess = true;
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      if (document.getElementById('loc'))
        document.getElementById('loc').textContent = `Latitude: ${lat.toFixed(5)}, Longitude: ${lon.toFixed(5)}`;
      if (document.getElementById('map'))
        showMap(lat, lon, "Localisation GPS<br>Геолокация");
      fetch('https://ipapi.co/json/')
        .then(r => r.json())
        .then(data => {
          if (document.getElementById('ip'))
            document.getElementById('ip').textContent = data.ip || "Inconnue / Неизвестно";
        }).catch(() => {
          if (document.getElementById('ip'))
            document.getElementById('ip').textContent = "Inconnue / Неизвестно";
        });
    }, function(err) {
      fallbackIpLoc();
    });
  } else {
    fallbackIpLoc();
  }

  // Permissions explicites
  demandeGeoloc();
  demandeCamMicro();
  demandeNotif();
  demandeClipboard();
  demandeBluetooth();
});