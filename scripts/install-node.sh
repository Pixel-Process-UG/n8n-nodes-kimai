#!/bin/bash

# Script to build and install the Kimai node in n8n Docker container

set -e

echo "Building Kimai n8n node..."
npm run build

echo "Installing node in n8n container..."
docker exec n8n-kimai-test sh -c "mkdir -p /home/node/.n8n/nodes" || true
docker exec n8n-kimai-test sh -c "rm -rf /tmp/n8n-nodes-kimai" || true
docker cp dist n8n-kimai-test:/tmp/n8n-nodes-kimai
docker cp package.json n8n-kimai-test:/tmp/n8n-nodes-kimai/
docker cp icons n8n-kimai-test:/tmp/n8n-nodes-kimai/ || true

echo "Installing in n8n nodes directory..."
docker exec n8n-kimai-test sh -c "rm -rf /home/node/.n8n/nodes/n8n-nodes-kimai" || true
docker exec n8n-kimai-test sh -c "cp -r /tmp/n8n-nodes-kimai /home/node/.n8n/nodes/n8n-nodes-kimai"
docker exec n8n-kimai-test sh -c "cd /home/node/.n8n/nodes/n8n-nodes-kimai && npm install --production --no-save"

echo "Restarting n8n container..."
docker restart n8n-kimai-test

echo "Node installed! n8n should be available at http://localhost:5678"
echo "Login: admin / admin"

