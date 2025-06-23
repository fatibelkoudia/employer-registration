# Système d'Inscription d'Employés

Un système d'inscription d'employés full-stack avec frontend React, backend Python et base de données MySQL.

## Liens

- **Frontend**: [https://fatibelkoudia.github.io/employer-registration/](https://fatibelkoudia.github.io/employer-registration/)
- **Backend API**: [https://employer-registration-fz.vercel.app/](https://employer-registration-fz.vercel.app/)
- **Repository**: [https://github.com/fatibelkoudia/employer-registration](https://github.com/fatibelkoudia/employer-registration)
- **Documentation**: [https://fatibelkoudia.github.io/employer-registration/docs](https://fatibelkoudia.github.io/employer-registration/docs)

## Fonctionnalités

### Frontend

- Validation en temps réel avec Material-UI
- Dashboard administrateur avec gestion des utilisateurs
- Design responsive

### Backend

- API RESTful avec authentification JWT
- Base de données MySQL hébergée sur AlwaysData
- Opérations CRUD complètes sur les utilisateurs

### Tests

- Couverture de tests 97%+ (unitaires, intégration, E2E)
- Tests Cypress pour les flux utilisateurs complets
- Tests Jest pour les composants et utilitaires

## Démarrage Rapide

### Avec Docker

```bash
git clone https://github.com/fatibelkoudia/employer-registration.git
cd employer-registration
docker-compose up --build
```

### Installation Locale

```bash
npm install --legacy-peer-deps
npm start
```

## Stack Technique

- **Frontend**: React 19, Material-UI, Axios
- **Backend**: Python/Flask, JWT, bcrypt
- **Base de données**: MySQL
- **Tests**: Cypress, Jest
- **DevOps**: Docker, GitHub Actions, Vercel, GitHub Pages

## Scripts Principaux

| Script              | Description                               |
| ------------------- | ----------------------------------------- |
| `npm start`         | Lance l'application en mode développement |
| `npm test`          | Exécute les tests unitaires               |
| `npm run test:e2e`  | Lance les tests E2E avec Cypress          |
| `npm run build`     | Build de production                       |
| `docker-compose up` | Démarre la stack complète                 |

## Règles de Validation

| Champ                 | Règle                             |
| --------------------- | --------------------------------- |
| **Prénom/Nom**        | Obligatoire, lettres uniquement   |
| **Email**             | Adresse email valide              |
| **Date de Naissance** | Au moins 18 ans                   |
| **Code Postal**       | Code postal français (5 chiffres) |

## Déploiement

- **Frontend**: GitHub Pages avec déploiement automatique
- **Backend**: Vercel avec fonctions serverless Python
- **Base de données**: MySQL sur AlwaysData
- **CI/CD**: GitHub Actions pour tests et déploiement

---
