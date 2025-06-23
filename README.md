# Système d'Inscription d'Employés

Un système d'inscription d'employés full-stack avec frontend React, backend Python et base de données MySQL. Inclut l'inscription d'utilisateurs, l'authentification admin et des tests complets avec pipeline CI/CD.

## 🔗 Démo en Direct & Liens

- **🌐 Frontend (React)** : [https://fatibelkoudia.github.io/employer-registration/](https://fatibelkoudia.github.io/employer-registration/)
- **🚀 API Backend (Python)** : [https://employer-registration-fz.vercel.app/](https://employer-registration-fz.vercel.app/)
- **📦 Dépôt** : [https://github.com/fatibelkoudia/employer-registration](https://github.com/fatibelkoudia/employer-registration)
- **📚 Documentation** : [https://fatibelkoudia.github.io/employer-registration/docs](https://fatibelkoudia.github.io/employer-registration/docs)
- **📊 Couverture de Code** : [Voir les Rapports](https://github.com/fatibelkoudia/employer-registration/actions)

---

## 📋 Table des Matières

1. [Fonctionnalités](#-fonctionnalités)
2. [Démarrage Rapide](#-démarrage-rapide)
3. [Architecture & Stack Technique](#️-architecture--stack-technique)
4. [Scripts Disponibles](#-scripts-disponibles)
5. [Stratégie de Test](#-stratégie-de-test)
6. [Règles de Validation](#-règles-de-validation-du-formulaire)
7. [Déploiement & CI/CD](#-déploiement--cicd)
8. [Configuration d'Environnement](#️-configuration-denvironnement)

---

## ✨ Fonctionnalités

### 🎨 Frontend (React)

- **Validation en temps réel** avec retour d'erreur immédiat
- **Composants Material-UI** pour un design moderne et cohérent
- **Notifications toast** pour le feedback utilisateur
- **Design responsive** adapté à tous les appareils
- **Dashboard administrateur** avec gestion des utilisateurs
- **Authentification JWT** sécurisée

### ⚙️ Backend (Python/Flask)

- **API RESTful** avec authentification JWT
- **Base de données MySQL** hébergée sur AlwaysData
- **Authentification et autorisation admin** avec bcrypt
- **Opérations CRUD** complètes sur les utilisateurs
- **Configuration CORS** pour les requêtes cross-origin
- **Gestion d'erreurs** robuste et logging

### 🧪 Tests & Qualité

- **Couverture de tests 97%+** (unitaires + intégration + E2E)
- **Tests E2E Cypress** pour les flux utilisateurs complets
- **Tests unitaires Jest** pour les composants et utilitaires
- **Documentation JSDoc** générée automatiquement
- **Vérifications ESLint** pour la qualité du code
- **Rapports de couverture** intégrés

### 🚀 DevOps & Déploiement

- **Environnement de développement dockerisé**
- **CI/CD avec GitHub Actions** entièrement automatisé
- **Déploiement séparé** : Frontend (GitHub Pages) + Backend (Vercel)
- **Configurations spécifiques** par environnement
- **Pipeline de tests automatisé** avec validation continue

---

## 🚀 Démarrage Rapide

### 🐳 Avec Docker (Recommandé)

```bash
# 1. Cloner le dépôt
git clone https://github.com/fatibelkoudia/employer-registration.git
cd employer-registration

# 2. Démarrer la stack complète
docker-compose up --build

# 3. Accéder à l'application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# Adminer: http://localhost:8080
```

### 💻 Installation Locale

```bash
# 1. Installer les dépendances
npm install --legacy-peer-deps

# 2. Démarrer en mode développement
npm start

# 3. Lancer les tests
npm test                # Tests unitaires
npm run test:e2e        # Tests E2E
```

### ⚡ Tests Rapides

```bash
# Vérification de santé du serveur
./test-server.sh

# Suite complète de tests E2E
./run-e2e-tests.sh

# Tests ciblés
npm run test:smoke      # Tests de base
npm run test:admin      # Tests admin
```

---

## 🏗️ Architecture & Stack Technique

### 🎨 Frontend

| Technologie        | Version | Usage                             |
| ------------------ | ------- | --------------------------------- |
| **React**          | 19.x    | Framework principal avec hooks    |
| **Material-UI**    | 6.x     | Système de design et composants   |
| **Axios**          | 1.x     | Client HTTP pour les requêtes API |
| **React-Toastify** | 11.x    | Notifications utilisateur         |
| **React Router**   | -       | Navigation et routage             |

### ⚙️ Backend

| Technologie | Version | Usage                         |
| ----------- | ------- | ----------------------------- |
| **Python**  | 3.9+    | Langage backend               |
| **Flask**   | 2.x     | Framework web RESTful         |
| **PyJWT**   | -       | Authentification JWT          |
| **bcrypt**  | -       | Hachage des mots de passe     |
| **MySQL**   | 8.x     | Base de données relationnelle |

### 🛠️ DevOps & Tests

| Outil                       | Usage                             |
| --------------------------- | --------------------------------- |
| **Docker & Docker Compose** | Conteneurisation et orchestration |
| **GitHub Actions**          | Pipeline CI/CD                    |
| **Cypress**                 | Tests end-to-end                  |
| **Jest**                    | Tests unitaires et d'intégration  |
| **ESLint**                  | Qualité et style de code          |
| **JSDoc**                   | Documentation automatique         |

---

## 🚀 Scripts Disponibles

### 🧪 Développement & Tests

| Script               | Description                                 |
| -------------------- | ------------------------------------------- |
| `npm start`          | Lance l'app en mode développement           |
| `npm test`           | Exécute les tests unitaires avec couverture |
| `npm run test:e2e`   | Lance tous les tests E2E avec Cypress       |
| `npm run test:smoke` | Tests de fumée de base                      |
| `npm run test:admin` | Tests E2E du système admin                  |
| `npm run test:user`  | Tests E2E d'inscription utilisateur         |
| `npm run build`      | Build de production                         |

### 🐳 Docker & Infrastructure

| Script                                       | Description                                |
| -------------------------------------------- | ------------------------------------------ |
| `docker-compose up`                          | Démarre la stack complète de développement |
| `docker-compose -f docker-compose.ci.yml up` | Stack pour les tests CI                    |
| `./test-server.sh`                           | Teste la santé et les endpoints du serveur |
| `./run-e2e-tests.sh`                         | Lance la suite complète de tests E2E       |

### 📚 Documentation & Déploiement

| Script                 | Description                   |
| ---------------------- | ----------------------------- |
| `npm run jsdoc`        | Génère la documentation JSDoc |
| `npm run deploy`       | Déploie sur GitHub Pages      |
| `npm run build-npm-ci` | Build pour publication npm    |
| `npm run lint`         | Vérification ESLint           |
| `npm run lint:fix`     | Correction automatique ESLint |

---

## 🧪 Stratégie de Test

### 📊 Couverture de Tests

- **Tests Unitaires** : Logique des composants, utilitaires, fonctions de validation
- **Tests d'Intégration** : Interactions entre composants, appels API
- **Tests E2E** : Flux utilisateurs complets avec Cypress
- **Couverture** : 97%+ sur tous les types de tests

### 📁 Structure des Fichiers de Test

```
cypress/e2e/
├── basic.cy.js          # Tests de fumée
├── spec.cy.js           # Flux d'inscription utilisateur
├── admin.cy.js          # Authentification & dashboard admin
└── integration.cy.js    # Cycle de vie utilisateur complet

src/tests/
├── UserForm.test.js     # Tests du formulaire utilisateur
├── UserList.test.js     # Tests de la liste des utilisateurs
├── Admin.test.js        # Tests des composants admin
└── validators.test.js   # Tests des fonctions de validation
```

### 🎯 Exécution des Tests

```bash
# Tests unitaires avec couverture
npm test

# Tous les tests E2E
npm run test:e2e

# Suites de tests spécifiques
npm run test:smoke      # Fonctionnalité de base
npm run test:admin      # Fonctionnalités admin
npm run test:user       # Inscription utilisateur
npm run test:integration # Flux complets
```

### 📋 Scénarios de Test E2E

1. **Tests de Fumée** (`basic.cy.js`)

   - Chargement de la page d'accueil
   - Présence des éléments UI essentiels
   - Navigation de base

2. **Tests Utilisateur** (`spec.cy.js`)

   - Inscription complète d'un utilisateur
   - Validation des champs en temps réel
   - Affichage dans la liste des utilisateurs

3. **Tests Admin** (`admin.cy.js`)

   - Connexion administrateur
   - Accès au dashboard admin
   - Gestion des utilisateurs (suppression)

4. **Tests d'Intégration** (`integration.cy.js`)
   - Flux complet : inscription → admin → gestion
   - Interaction frontend-backend
   - Persistance des données

---

## 📋 Règles de Validation du Formulaire

| Champ                 | Règle de Validation                                           |
| --------------------- | ------------------------------------------------------------- |
| **Prénom**            | Obligatoire, lettres uniquement (accents et tirets autorisés) |
| **Nom**               | Même règle que le prénom                                      |
| **Email**             | Doit être une adresse email valide                            |
| **Date de Naissance** | Doit avoir au moins 18 ans                                    |
| **Ville**             | Lettres uniquement                                            |
| **Code Postal**       | Code postal français valide (exactement 5 chiffres)           |

### 🔍 Validation en Temps Réel

- **Feedback immédiat** : Les erreurs s'affichent en rouge sous chaque champ
- **Bouton désactivé** : Le bouton de soumission reste désactivé tant que tous les champs ne sont pas valides
- **Messages d'erreur** : Messages clairs et en français pour chaque type d'erreur
- **Notifications toast** : Confirmations de succès et messages d'erreur globaux

---

## 🚀 Déploiement & CI/CD

### 🔄 Pipeline Automatisé

GitHub Actions automatise le pipeline de déploiement complet :

1. **🔍 Qualité du Code** : Vérifications ESLint et formatage
2. **🧪 Tests Unitaires** : Jest avec rapports de couverture
3. **🎭 Tests E2E** : Suite complète Cypress
4. **🎨 Déploiement Frontend** : Déploiement automatique sur GitHub Pages
5. **⚙️ Déploiement Backend** : Déploiement continu sur Vercel
6. **📚 Documentation** : Mise à jour automatique de la JSDoc

### 🌐 Environnement de Production

| Service             | Plateforme     | Configuration                                |
| ------------------- | -------------- | -------------------------------------------- |
| **Frontend**        | GitHub Pages   | Domaine personnalisé, HTTPS                  |
| **Backend**         | Vercel         | Fonctions serverless Python                  |
| **Base de Données** | AlwaysData     | MySQL avec identifiants de production        |
| **Monitoring**      | GitHub Actions | Vérifications de santé et tracking d'erreurs |

### ⚙️ Configuration d'Environnement

```bash
# 🔧 Développement
docker-compose up  # Stack locale complète

# 🚀 Production
# Frontend: GitHub Pages
# Backend: Vercel avec variables d'environnement
# Base de données: MySQL AlwaysData
```

### � Variables d'Environnement

```bash
# Backend (Vercel)
MYSQL_HOST=@mysql_host_prod
MYSQL_USER=@mysql_user_prod
MYSQL_PASSWORD=@mysql_password_prod
MYSQL_DATABASE=@mysql_database_prod

# Frontend (GitHub Pages)
REACT_APP_API_URL=https://employer-registration-fz.vercel.app
```

---

## 🎯 Prêt à Utiliser !

🌟 **Démo en direct** : [https://fatibelkoudia.github.io/employer-registration/](https://fatibelkoudia.github.io/employer-registration/)

📖 **Documentation complète** : [https://fatibelkoudia.github.io/employer-registration/docs](https://fatibelkoudia.github.io/employer-registration/docs)

🚀 **API Backend** : [https://employer-registration-fz.vercel.app/](https://employer-registration-fz.vercel.app/)

---

### 👨‍💻 Développé avec ❤️

Un projet full-stack moderne démontrant les meilleures pratiques en développement web, tests automatisés et déploiement continu.
