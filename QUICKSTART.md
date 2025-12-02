# Quick Start Guide

## Docker Test Setup

### Prerequisites
- Docker and Docker Compose installed
- Node.js and npm installed

### Setup Steps

1. **Install dependencies and build:**
   ```bash
   npm install
   npm run build
   ```

2. **Start n8n with Docker:**
   ```bash
   docker compose up -d
   ```
   (or `docker-compose up -d` if using older Docker Compose)

3. **Install the Kimai node:**
   ```bash
   ./scripts/install-node.sh
   ```

   Or use the automated setup:
   ```bash
   ./scripts/setup.sh
   ```

4. **Access n8n:**
   - URL: http://localhost:5678
   - Username: `admin`
   - Password: `admin`

5. **Verify the node:**
   - Open n8n
   - Click "Add Node"
   - Search for "Kimai"
   - The Kimai node should appear in the list

### Rebuilding After Changes

After making code changes:

```bash
./scripts/rebuild.sh
```

Or manually:
```bash
npm run build
./scripts/install-node.sh
```

### Troubleshooting

**Node not appearing:**
1. Check container logs: `docker compose logs n8n` (or `docker-compose logs n8n`)
2. Verify files in container: `docker exec n8n-kimai-test ls -la /home/node/.n8n/nodes/n8n-nodes-kimai/`
3. Restart container: `docker restart n8n-kimai-test`

**Build errors:**
- The zod type errors are expected and can be ignored
- The build will complete successfully despite these warnings

### Stopping n8n

```bash
docker compose down
```
(or `docker-compose down` for older versions)

To remove all data:
```bash
docker compose down -v
```
(or `docker-compose down -v` for older versions)

