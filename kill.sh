#!/usr/bin/env bash
set -e

TASK_DIR="/root/task"

echo "[kill.sh] Changing to task directory..."
cd "$TASK_DIR" 2>/dev/null || echo "[kill.sh] Could not cd to $TASK_DIR, continuing..."

echo "[kill.sh] Stopping and removing Docker compose services (all images + volumes)..."
docker-compose down --rmi all --volumes --remove-orphans 2>/dev/null || true

echo "[kill.sh] Force stopping all running containers..."
RUNNING=$(docker ps -q 2>/dev/null)
if [ -n "$RUNNING" ]; then
  docker stop $RUNNING || true
fi

echo "[kill.sh] Removing all containers..."
ALL_CONTAINERS=$(docker ps -aq 2>/dev/null)
if [ -n "$ALL_CONTAINERS" ]; then
  docker rm -f $ALL_CONTAINERS || true
fi

echo "[kill.sh] Pruning all Docker volumes..."
docker volume prune -f || true

echo "[kill.sh] Pruning all Docker images..."
docker image prune -a -f || true

echo "[kill.sh] Running full Docker system prune..."
docker system prune -a --volumes -f || true

echo "[kill.sh] Removing /root/task directory..."
rm -rf /root/task || true

echo "[kill.sh] Cleanup completed."
