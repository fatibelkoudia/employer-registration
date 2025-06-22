#!/bin/bash

# Script pour vérifier que tout marche bien en local
echo "Test de l'environnement CI..."

echo "1. Services Docker actifs ?"
docker compose -f docker-compose.ci.yml ps

echo "2. API en vie ?"
curl -f http://localhost:8000/ || echo "API racine HS"

echo "3. Endpoint users OK ?"
curl -f http://localhost:8000/users || echo "Users endpoint HS"

echo "4. React répond ?"
curl -I http://localhost:3000 | head -1

echo "5. Test création utilisateur..."
curl -X POST http://localhost:8000/users \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","birthDate":"1990-01-01","city":"Test City","postalCode":"12345"}' \
  || echo "Création user ratée"

echo "Check terminé !"
