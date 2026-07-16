#!/bin/bash
set -e

echo "[run.sh] Starting Docker services..."
docker-compose up -d

echo "[run.sh] Waiting for MongoDB to be ready..."
MONGO_CONTAINER=$(docker-compose ps -q mongodb)

if [ -z "$MONGO_CONTAINER" ]; then
  echo "[run.sh] Failed to find MongoDB container."
  exit 1
fi

ATTEMPTS=0
until docker exec "$MONGO_CONTAINER" mongosh -u utkrusht -p utkrushtpass --authenticationDatabase admin --quiet --eval "db.adminCommand({ ping: 1 })" >/dev/null 2>&1; do
  ATTEMPTS=$((ATTEMPTS+1))
  if [ "$ATTEMPTS" -ge 60 ]; then
    echo "[run.sh] MongoDB did not become ready in time."
    exit 1
  fi
  echo "[run.sh] Waiting for MongoDB (attempt $ATTEMPTS)..."
  sleep 2
done

echo "[run.sh] MongoDB is ready. Checking backend API..."
ATTEMPTS=0
until curl -sSf http://localhost:5000/health >/dev/null 2>&1; do
  ATTEMPTS=$((ATTEMPTS+1))
  if [ "$ATTEMPTS" -ge 90 ]; then
    echo "[run.sh] Backend API did not respond in time."
    docker-compose logs backend || true
    exit 1
  fi
  echo "[run.sh] Waiting for backend API (attempt $ATTEMPTS)..."
  sleep 2
done

echo "[run.sh] Backend API is responding. Checking frontend..."
ATTEMPTS=0
until curl -sSf http://localhost:3000 >/dev/null 2>&1; do
  ATTEMPTS=$((ATTEMPTS+1))
  if [ "$ATTEMPTS" -ge 240 ]; then
    echo "[run.sh] Frontend did not respond in time."
    docker-compose logs frontend || true
    exit 1
  fi
  echo "[run.sh] Waiting for frontend (attempt $ATTEMPTS)..."
  sleep 2
done

echo "[run.sh] All services are up and responding."
