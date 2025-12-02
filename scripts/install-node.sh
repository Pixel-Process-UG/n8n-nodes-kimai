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

echo "Installing node as npm package..."
docker exec n8n-kimai-test sh -c "rm -rf /home/node/.n8n/nodes/n8n-nodes-kimai" || true
docker exec n8n-kimai-test sh -c "cp -r /tmp/n8n-nodes-kimai /home/node/.n8n/nodes/n8n-nodes-kimai"
docker exec n8n-kimai-test sh -c "cd /home/node/.n8n/nodes/n8n-nodes-kimai && npm install --production --no-save"

# Fix package.json to point to correct paths (not dist/)
docker exec n8n-kimai-test sh -c 'cd /home/node/.n8n/nodes/n8n-nodes-kimai && cat > package.json << "EOF"
{
	"name": "n8n-nodes-kimai",
	"version": "1.0.0",
	"description": "n8n community node for Kimai time-tracking software API integration",
	"keywords": ["n8n-community-node-package", "kimai", "time-tracking", "timesheet"],
	"license": "MIT",
	"main": "index.js",
	"n8n": {
		"n8nNodesApiVersion": 1,
		"credentials": ["credentials/KimaiApi.credentials.js"],
		"nodes": ["nodes/Kimai/Kimai.node.js"]
	}
}
EOF
'

# Install as npm package in n8n
echo "Linking node in n8n node_modules..."
docker exec n8n-kimai-test sh -c "cd /home/node/.n8n && npm install ./nodes/n8n-nodes-kimai --no-save"

echo "Restarting n8n container..."
docker restart n8n-kimai-test

echo "Node installed! n8n should be available at http://localhost:5678"
echo "Login: admin / admin"

