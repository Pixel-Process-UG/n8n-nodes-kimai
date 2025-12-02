#!/bin/bash

# Script to rebuild and reinstall the node without restarting the entire setup

set -e

echo "Rebuilding Kimai node..."
npm run build

echo "Copying files to container..."
docker exec n8n-kimai-test sh -c "rm -rf /tmp/n8n-nodes-kimai" || true
docker cp dist n8n-kimai-test:/tmp/n8n-nodes-kimai
docker cp package.json n8n-kimai-test:/tmp/n8n-nodes-kimai/
docker cp icons n8n-kimai-test:/tmp/n8n-nodes-kimai/ || true

echo "Installing in n8n nodes directory..."
docker exec n8n-kimai-test sh -c "rm -rf /home/node/.n8n/nodes/n8n-nodes-kimai" || true
docker exec n8n-kimai-test sh -c "cp -r /tmp/n8n-nodes-kimai /home/node/.n8n/nodes/n8n-nodes-kimai"
docker exec n8n-kimai-test sh -c "cd /home/node/.n8n/nodes/n8n-nodes-kimai && npm install --production --no-save"

echo "Restarting n8n..."
docker restart n8n-kimai-test

echo "Node rebuilt and installed!"

