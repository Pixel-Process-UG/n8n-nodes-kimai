# Docker Test Setup for n8n Kimai Node

This guide explains how to set up a local Docker-based n8n instance with the Kimai node installed for testing.

## Prerequisites

- Docker and Docker Compose installed
- Node.js and npm installed (for building the node)

## Quick Start

### Option 1: Automated Setup (Recommended)

Run the setup script which will build the node and start n8n:

```bash
./scripts/setup.sh
```

This script will:
1. Install npm dependencies
2. Build the Kimai node
3. Start n8n in Docker
4. Install the node in the container
5. Restart n8n to load the node

### Option 2: Manual Setup

1. **Install dependencies and build:**
   ```bash
   npm install
   npm run build
   ```

2. **Start n8n:**
   ```bash
   docker compose up -d
   ```
   (or `docker-compose up -d` if using older Docker Compose)

3. **Install the node:**
   ```bash
   ./scripts/install-node.sh
   ```

## Accessing n8n

Once the setup is complete:

- **URL**: http://localhost:5678
- **Username**: `admin`
- **Password**: `admin`

## Rebuilding the Node

After making changes to the node code, rebuild and reinstall:

```bash
./scripts/rebuild.sh
```

This will:
1. Rebuild the TypeScript code
2. Copy files to the container
3. Reinstall dependencies
4. Restart n8n

## Docker Commands

### Start n8n
```bash
docker compose up -d
```
(or `docker-compose up -d` for older versions)

### Stop n8n
```bash
docker compose down
```
(or `docker-compose down` for older versions)

### View logs
```bash
docker compose logs -f
```
(or `docker-compose logs -f` for older versions)

### Access container shell
```bash
docker exec -it n8n-kimai-test sh
```

### Check if node is installed
```bash
docker exec n8n-kimai-test ls -la /home/node/.n8n/nodes/
```

## Troubleshooting

### Node not appearing in n8n

1. Check if the node files are in the container:
   ```bash
   docker exec n8n-kimai-test ls -la /home/node/.n8n/nodes/n8n-nodes-kimai/
   ```

2. Check n8n logs for errors:
   ```bash
   docker-compose logs n8n | grep -i error
   ```

3. Verify the node structure:
   ```bash
   docker exec n8n-kimai-test cat /home/node/.n8n/nodes/n8n-nodes-kimai/package.json
   ```

4. Restart n8n:
   ```bash
   docker restart n8n-kimai-test
   ```

### Build errors

If you encounter build errors:

1. Clean and rebuild:
   ```bash
   rm -rf dist node_modules
   npm install
   npm run build
   ```

2. Check TypeScript errors:
   ```bash
   npm run lint
   ```

### Container not starting

1. Check if port 5678 is already in use:
   ```bash
   lsof -i :5678
   ```

2. Check Docker logs:
   ```bash
   docker-compose logs
   ```

## Development Workflow

1. Make changes to the node code
2. Run `./scripts/rebuild.sh` to rebuild and reinstall
3. Test in n8n UI at http://localhost:5678
4. Repeat as needed

## Data Persistence

n8n data (workflows, credentials, etc.) is stored in a Docker volume `n8n_data`. To reset everything:

```bash
docker-compose down -v
docker-compose up -d
./scripts/install-node.sh
```

## Notes

- The node is installed in `/home/node/.n8n/nodes/n8n-nodes-kimai` inside the container
- n8n automatically discovers nodes in the `nodes` directory
- Changes to the node require a rebuild and container restart
- The container uses basic auth for security (admin/admin)

