#!/bin/bash

# Script de test pour vérifier le bon fonctionnement du serveur en local
# Permet de tester les endpoints API avant de pusher vers GitHub
# et évite d'attendre la CI pour détecter les problèmes de base
echo "Test des corrections serveur..."

# Démarrer les services
echo "Démarrage des services..."
docker compose -f docker-compose.ci.yml up -d --build

# Attendre un peu
echo "Attente 30s pour que tout démarre..."
sleep 30

# Tester les endpoints
echo "Test API root..."
curl -s http://localhost:8000/ | jq '.' || echo "API root failed"

echo "Test users endpoint..."
curl -s http://localhost:8000/users | jq '.' || echo "Users endpoint failed"

echo "Test création user..."
curl -s -X POST http://localhost:8000/users \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","birthDate":"1990-01-01","city":"Test","postalCode":"12345"}' \
  | jq '.' || echo "User creation failed"

echo "Vérification users après création..."
curl -s http://localhost:8000/users | jq '.' || echo "Users check failed"

# Logs en cas de problème
echo "=== Logs server ==="
docker compose -f docker-compose.ci.yml logs server | tail -10

# Arrêter
docker compose -f docker-compose.ci.yml down

echo "Test terminé!"
