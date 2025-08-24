# JackpotURSS

Bienvenue sur **JackpotURSS**, le site d'anniversaire le plus révolutionnaire du web, où le rêve soviétique du jeu vidéo devient réalité !

## Concept

JackpotURSS est un faux site à l’ambiance URSS, créé pour offrir à un ami un cadeau d’anniversaire mémorable (et hilarant). Sur ce site, pour seulement **1€**, chaque citoyen peut tenter sa chance et recevoir **10 clés Steam aléatoires**, parmi lesquelles figure le légendaire GTA 6 et d’autres jeux "trop beaux pour être vrais" !

> **Attention camarade !**  
> Ici, la clé du bonheur est garantie… et parfois même authentique !

## Fonctionnalités

- Interface rouge et dorée, ambiance "propagande soviétique"
- Liste de jeux improbables et promesses révolutionnaires
- Système de paiement fictif (aucune carte bancaire réelle requise)
- Attribution aléatoire de "vraies" clés Steam cachées parmi les fausses
- Slogan officiel :  
  **« Avec JackpotURSS, le peuple a enfin accès au rêve vidéoludique ! »**

## Pour qui ?

Ce projet est 100% humoristique et destiné à un usage privé, pour amuser et surprendre un ami fan de l’URSS et des jeux vidéo.  
Aucune vraie arnaque, juste du fun et des cadeaux inattendus !

## Stack technique

- **Backend** : Node.js (Express)
- **Frontend** : HTML/CSS (style URSS, images et slogans)
- **Déploiement** : NGINX sur Raspberry Pi

## Mise en route (Raspberry Pi conseillé)

1. **Installer Node.js**  
   Si ce n'est pas déjà fait, installe Node.js sur le Raspberry Pi :
   ```sh
   sudo apt update
   sudo apt install nodejs npm
   ```

2. **Cloner le projet sur ton Raspberry Pi**
   ```sh
   git clone https://github.com/<ton-utilisateur>/JackpotURSS.git
   cd JackpotURSS
   ```

3. **Initialiser le projet et installer les dépendances**
   ```sh
   npm install
   ```
   Les dépendances principales sont :
   - `express` (serveur web)
   - `bootstrap` (frontend, via CDN dans le HTML)

4. **Lancer le serveur Node.js**
   ```sh
   node app.js
   ```
   Le serveur démarre par défaut sur le port 3000.

5. **Accéder au site en local**
   Sur le Raspberry Pi ou tout appareil du réseau local, ouvre :
   ```
   http://<ip-du-pi>:3000
   ```
   Pour obtenir l'IP du Pi :
   ```sh
   hostname -I
   ```

6. **Rendre le site accessible dans le monde**
   - Ouvre et redirige le port 3000 (ou 80 si tu utilises NGINX) sur ta box Internet vers l'IP du Raspberry Pi.
   - Accède au site via l'IP publique de ta connexion.
   - **Optionnel :** Configure NGINX en reverse proxy pour utiliser le port 80 et HTTPS (avec Let's Encrypt pour un certificat SSL gratuit).

---

## Exemple d'installation des dépendances

Si tu veux tout installer rapidement :
```sh
npm init -y
npm install express
```

---
---

**JackpotURSS** – Pour une révolution vidéoludique… et beaucoup de rires !