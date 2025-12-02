#!/bin/bash

# Complete setup script for Docker-based n8n with Kimai node

set -e

echo "=== Setting up n8n with Kimai node ==="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Error: Docker is not running. Please start Docker and try again."
    exit 1
fi

# Install npm dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
fi

# Build the node
echo "Building Kimai node..."
npm run build

# Start Docker Compose
echo "Starting n8n container..."
docker-compose up -d

# Wait for n8n to be ready
echo "Waiting for n8n to start..."
max_attempts=30
attempt=0
while [ $attempt -lt $max_attempts ]; do
    if docker exec n8n-kimai-test wget --quiet --tries=1 --spider http://localhost:5678/healthz 2>/dev/null; then
        echo "n8n is ready!"
        break
    fi
    attempt=$((attempt + 1))
    echo "Waiting for n8n... ($attempt/$max_attempts)"
    sleep 2
done

if [ $attempt -eq $max_attempts ]; then
    echo "Warning: n8n may not be fully ready, but continuing with installation..."
fi

# Install the node in the container using npm install method
echo "Installing Kimai node in container..."
docker exec n8n-kimai-test sh -c "mkdir -p /home/node/.n8n/nodes" || true

# Copy the built files to a temp location
docker exec n8n-kimai-test sh -c "rm -rf /tmp/n8n-nodes-kimai" || true
docker cp dist n8n-kimai-test:/tmp/n8n-nodes-kimai
docker cp package.json n8n-kimai-test:/tmp/n8n-nodes-kimai/
docker cp icons n8n-kimai-test:/tmp/n8n-nodes-kimai/ || true

# Create a proper package structure and install
docker exec n8n-kimai-test sh -c "cd /home/node/.n8n/nodes && cp -r /tmp/n8n-nodes-kimai . && cd n8n-nodes-kimai && npm install --production --no-save"

# Restart n8n to load the node
echo "Restarting n8n to load the node..."
docker restart n8n-kimai-test

echo ""
echo "=== Setup Complete ==="
echo "n8n is available at: http://localhost:5678"
echo "Login credentials:"
echo "  Username: admin"
echo "  Password: admin"
echo ""
echo "The Kimai node should now be available in the node list."
echo ""
echo "To stop n8n: docker-compose down"
echo "To view logs: docker-compose logs -f"
echo "To rebuild node: ./scripts/rebuild.sh"

