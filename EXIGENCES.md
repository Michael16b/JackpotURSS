# EXIGENCES – Projet JackpotURSS

Ce document recense **toutes les exigences fonctionnelles** et techniques à réaliser dans le cadre du projet JackpotURSS.  
Chaque point doit être respecté ; les choix techniques et précisions d’implémentation seront détaillés dans le fichier `TECHNICAL_DECISION.md`.

---

## 1. **Fausse implémentation de paiement CB**

- Simuler un paiement par carte bancaire (CB) sur le site.
- Aucune vraie transaction ou demande d’informations réelles de paiement.
- L’utilisateur doit avoir l’impression de payer 1€, mais cela reste fictif.
- Le workflow doit comporter : saisie de fausses coordonnées, feedback de succès ou d’échec.

---

## 2. **Ajout aléatoire de jeux vidéo avec images**

- Lors du tirage, afficher 10 jeux vidéo aléatoires (dont GTA 6).
- Les jeux doivent être variés à chaque tentative.
- Chaque jeu affiché doit comporter son image (visuel).
- Les images et la liste de jeux peuvent s’appuyer sur une API publique (Steam, IGDB, RAWG…) ou une base locale.
- La clé Steam associée au jeu tiré est ensuite fournie (si disponible).

---

## 3. **Gestion des publicités et parcours utilisateur**

- Intégrer des publicités fictives ou réelles sur le site.
- Le parcours utilisateur doit obligatoirement passer par plusieurs écrans (clics) avant d’accéder à la page des clés.
- Possibilité d’ajouter des bannières, pop-ups, interstitiels, etc.
- Objectif : maximiser le nombre de clics nécessaires pour obtenir les clés.

---

## 4. **Gestion du fichier keys.json**

- Les clés Steam (fausses et vraies) sont stockées dans un fichier `keys.json`.
- Ce fichier **ne doit jamais être diffusé sur GitHub** (ajouter dans `.gitignore`).
- Le projet doit être paramétré pour lire ce fichier localement et pour faciliter son ajout/édition en dehors du dépôt.
- Prévoir une gestion simple pour ajouter ou retirer des clés.

---

## 5. **Possibilité d’internationalisation en russe**

- Préparer le site pour la traduction complète en russe.
- Les textes, boutons, messages, etc. doivent pouvoir être affichés en russe.
- À terme, possibilité de basculer facilement entre le français et le russe pour l’interface utilisateur.

---

## 6. **UI qui fasse peur avec les couleurs de l’URSS**

- L’interface du site doit provoquer un effet “peur” ou “propagande” typique des visuels URSS.
- Utiliser un design agressif : rouge intense, doré, noir, images de propagande, gros caractères, slogans, effets visuels marquants.
- L’ensemble du site doit rappeler l’ambiance autoritaire soviétique.

---

## 7. **Documentation technique**

- Toute précision technique, choix d’API, format des données, gestion spécifique (pubs, images, paiement, etc.)  
  **doit être détaillée dans le fichier `TECHNICAL_DECISION.md`.**

---

**NB :**  
Ce fichier est évolutif. Toute nouvelle exigence ou modification doit être ajoutée ici, puis précisée dans le fichier de décisions techniques si besoin.
