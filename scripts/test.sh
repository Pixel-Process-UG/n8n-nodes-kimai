#!/bin/bash

# Testing helper script for n8n-kimai node

set -e

echo "=== Testing n8n-kimai node ==="

# Build the node
echo "Building node..."
npm run build

# Check if build was successful
if [ ! -f "dist/nodes/Kimai/Kimai.node.js" ]; then
    echo "❌ Build failed: dist/nodes/Kimai/Kimai.node.js not found"
    exit 1
fi

if [ ! -f "dist/credentials/KimaiApi.credentials.js" ]; then
    echo "❌ Build failed: dist/credentials/KimaiApi.credentials.js not found"
    exit 1
fi

if [ ! -f "dist/icons/kimai.svg" ]; then
    echo "❌ Build failed: dist/icons/kimai.svg not found"
    exit 1
fi

echo "✅ All required files built successfully"

# Lint the code
echo "Running linter..."
npm run lint

echo ""
echo "✅ All tests passed!"
echo ""
echo "To test in n8n:"
echo "  1. Run: ./scripts/setup.sh"
echo "  2. Open: http://localhost:5678"
echo "  3. Add the Kimai node to a workflow"
echo ""

