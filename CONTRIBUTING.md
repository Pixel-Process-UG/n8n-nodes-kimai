# Contributing to n8n-nodes-kimai

Thank you for your interest in contributing to the Kimai n8n node!

## Development Setup

### Prerequisites
- Node.js 18+ and npm
- Docker and Docker Compose (for testing)
- Git

### Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Pixel-Process-UG/n8n-nodes-kimai.git
   cd n8n-nodes-kimai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the node**:
   ```bash
   npm run build
   ```

4. **Start test environment**:
   ```bash
   bash scripts/setup.sh
   ```

See [README.DOCKER.md](README.DOCKER.md) for detailed Docker setup instructions.

## Development Workflow

1. Make changes to TypeScript files in `credentials/` or `nodes/`
2. Build: `npm run build`
3. Test in Docker: `bash scripts/rebuild.sh`
4. Verify in n8n at http://localhost:5678

## Code Style

- Run `npm run format` to format code with Prettier
- Run `npm run lint` to check for linting errors
- Run `npm run lintfix` to auto-fix linting issues

## Project Structure

```
n8n-kimai/
├── credentials/          # Credential type definitions
├── nodes/               # Node implementations
├── icons/               # Node icons
├── dist/                # Compiled output (gitignored)
├── scripts/             # Build and deployment scripts
└── README.md
```

## Adding New Operations

1. Locate the resource in `nodes/Kimai/Kimai.node.ts`
2. Add operation to the operations array
3. Define routing configuration
4. Add required parameters
5. Test the operation

## Submitting Changes

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Make your changes**
4. **Test thoroughly** in the Docker environment
5. **Commit**: `git commit -m "Description of changes"`
6. **Push**: `git push origin feature/your-feature`
7. **Create a Pull Request**

## Pull Request Guidelines

- Provide a clear description of the changes
- Reference any related issues
- Ensure the build passes: `npm run build`
- Test in n8n before submitting
- Follow existing code style

## Reporting Issues

When reporting issues, please include:
- n8n version
- Node version
- Steps to reproduce
- Expected vs actual behavior
- Error messages or logs

## Questions?

- Open an issue on GitHub
- Join the [n8n Community Forum](https://community.n8n.io/)

Thank you for contributing! 🎉

