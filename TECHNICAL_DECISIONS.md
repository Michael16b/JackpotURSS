# TECHNICAL_DECISION – Projet JackpotURSS

Ce document précise les choix techniques, explications d’architecture, de structure, d’API et d’implémentation pour le projet JackpotURSS.  
**Chaque exigence du fichier EXIGENCES.md doit être détaillée ici, avec la solution retenue et les alternatives éventuelles.**

---

## 1. **Fausse implémentation de paiement CB**

- **UI** : Formulaire classique (nom, numéro de carte, date, cryptogramme).
- **Backend** : Aucune vérification réelle. Validation aléatoire (succès/échec).
- **Sécurité** : Les infos ne sont ni stockées ni transmises.
- **Feedback** : Message humoristique ou propagandiste en cas de succès ou d’échec.

---

## 2. **Ajout aléatoire de jeux vidéo avec images**

- **Source des jeux** : Utilisation d’une API publique (préférée : RAWG ou IGDB pour simplicité et nombre d’images).
- **Fallback** : Liste statique en local si API indisponible.
- **Backend** : Tirage aléatoire de 10 jeux à chaque tentative.
- **Frontend** : Affichage des images et titres. GTA 6 est toujours dans la liste.
- **API** : Clé API à stocker hors du repo (via variable d’environnement).

---

## 3. **Gestion des publicités et parcours utilisateur**

- **Publicités fictives** : Création de fausses pubs style URSS (affiches, slogans).
- **Publicités réelles** : Option d’intégrer du code AdSense ou similaire (non prioritaire).
- **Parcours** : Plusieurs écrans/interstitiels (ex : slogans, validation, promesses, etc.) avant d’arriver à la page des clés.
- **Objectif** : Minimum 3 écrans avant la révélation des clés.

---

## 4. **Gestion du fichier keys.json**

- **Emplacement** : Stocké dans le dossier du backend, jamais versionné (ajout dans `.gitignore`).
- **Format** : JSON, clé unique par ligne, possibilité de marquer les “vraies” clés.
- **Accès** : Lecture/écriture uniquement côté serveur.
- **Sécurité** : Jamais exposé au frontend ni transmis au client.
- **Mise à jour** : Ajout manuel ou via interface admin locale (à prévoir).

---

## 5. **Internationalisation (russe/français)**

- **Technique** : Utilisation de fichiers de traduction (i18n) ou d’un module JS (ex : i18next).
- **UI** : Switch de langue sur l’interface.
- **Backend** : Toutes les chaînes de caractères doivent passer par le système de traduction.
- **Images** : Privilégier les images universelles ou prévoir les variantes par langue.

---

## 6. **UI qui fait peur (style URSS)**

- **Framework CSS** : Bootstrap avec style custom (voir public/style.css).
- **Palette** : Rouge #D90429, doré #FFD700, noir #222, blanc pour contraste.
- **Police** : Oswald ou police URSS sur Google Fonts.
- **Effets** : Textes massifs, ombres portées, slogans en majuscule, images de propagande, étoiles, faucille-marteau, etc.
- **Animations** : Possibilité d’ajouter des effets sonores ou visuels (clignotement, transition, etc.).

---

## 7. **API et clés**

- **API jeux vidéo** : RAWG (https://rawg.io/apidocs) ou IGDB (https://api-docs.igdb.com).
- **Clé API** : À obtenir et stocker dans une variable d’environnement.
- **Gestion de la clé API** : Jamais dans le dépôt, à configurer localement.
- **Documenter l’utilisation et le format attendu dans ce fichier.**

---

## 8. **Autres décisions techniques**

- **Déploiement** : Prévu sur Raspberry Pi avec NGINX en reverse proxy.
- **Sécurité** : Pas d’accès externe à l’admin ou au fichier keys.json.
- **Tests** : Scripts de test manuel pour valider chaque exigence.
- **Évolution** : Ce fichier doit être mis à jour à chaque modification d’architecture ou choix technique significatif.

---

**Ce document évolue selon les besoins du projet et la discussion de l’équipe.**