#!/bin/bash

# Development helper script for n8n-kimai node

set -e

echo "=== Starting development environment ==="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Error: Docker is not running. Please start Docker and try again."
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
fi

# Build the node once
echo "Building Kimai node..."
npm run build

# Start n8n if not already running
if ! docker ps | grep -q n8n-kimai-test; then
    echo "Starting n8n container..."
    docker compose up -d 2>/dev/null || docker-compose up -d
    sleep 5
fi

echo ""
echo "=== Development Environment Ready ==="
echo "n8n is available at: http://localhost:5678"
echo ""
echo "To watch for changes and rebuild automatically, run:"
echo "  npm run dev"
echo ""
echo "To manually rebuild and reinstall the node:"
echo "  ./scripts/rebuild.sh"
echo ""
echo "To view n8n logs:"
echo "  docker compose logs -f n8n"
echo ""

