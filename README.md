# n8n-nodes-kimai

[![npm version](https://img.shields.io/npm/v/n8n-nodes-kimai.svg)](https://www.npmjs.com/package/n8n-nodes-kimai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An n8n community node for integrating with [Kimai](https://www.kimai.org/) time-tracking software. This node provides comprehensive access to the Kimai REST API, allowing you to automate time tracking, manage projects, customers, activities, teams, and more.

## Features

- **Complete API Coverage**: Supports all public Kimai API endpoints
- **Resource Management**: 
  - Activities (CRUD, rates, meta fields)
  - Customers (CRUD, rates, meta fields)
  - Projects (CRUD, rates, meta fields)
  - Tags (Create, Get, Delete)
  - Teams (CRUD, member management, access control)
  - Timesheets (CRUD, stop/restart/duplicate/export, meta fields, recent/active queries)
  - Users (CRUD, preferences, API token management)
  - Invoices (Read-only operations)
  - System (Config, colors, ping, version, plugins)
- **Declarative Style**: Uses n8n's declarative routing for clean, maintainable code
- **Full Query Support**: Filtering, sorting, pagination, and search capabilities
- **Array Parameters**: Support for array query parameters (projects[], customers[], etc.)

## Installation

### Community Nodes (Recommended)

Install directly from n8n:

1. Go to **Settings** → **Community Nodes**
2. Click **Install**
3. Enter: `n8n-nodes-kimai`
4. Click **Install**

### Manual Installation

```bash
cd ~/.n8n/nodes
npm install n8n-nodes-kimai
```

Restart n8n to load the node.

### Docker Installation

See [README.DOCKER.md](README.DOCKER.md) for Docker-based development setup.

## Credentials Setup

1. In n8n, go to **Credentials** → **Add Credential**
2. Search for **Kimai API**
3. Configure:
   - **API URL**: Base URL of your Kimai instance (e.g., `https://kimai.example.com`)
   - **API Token**: Your Kimai API token (Bearer token)

### Getting Your API Token

1. Log in to your Kimai instance
2. Go to your user profile → API Access
3. Create a new API token
4. Copy the token and use it in the credentials

## Resources and Operations

### Activity

- **Create**: Create a new activity
- **Get**: Get a specific activity by ID
- **Get All**: List all activities with filtering options
- **Update**: Update an existing activity
- **Delete**: Delete an activity
- **Update Meta**: Update activity custom field
- **Get Rates**: Get rates for an activity
- **Add Rate**: Add a rate for an activity
- **Delete Rate**: Delete a rate for an activity

### Customer

- **Create**: Create a new customer
- **Get**: Get a specific customer by ID
- **Get All**: List all customers with filtering options
- **Update**: Update an existing customer
- **Delete**: Delete a customer
- **Update Meta**: Update customer custom field
- **Get Rates**: Get rates for a customer
- **Add Rate**: Add a rate for a customer
- **Delete Rate**: Delete a rate for a customer

### Project

- **Create**: Create a new project
- **Get**: Get a specific project by ID
- **Get All**: List all projects with filtering options
- **Update**: Update an existing project
- **Delete**: Delete a project
- **Update Meta**: Update project custom field
- **Get Rates**: Get rates for a project
- **Add Rate**: Add a rate for a project
- **Delete Rate**: Delete a rate for a project

### Tag

- **Create**: Create a new tag
- **Get All**: List all tags (with optional name filter)
- **Delete**: Delete a tag by ID

### Team

- **Create**: Create a new team
- **Get**: Get a specific team by ID
- **Get All**: List all teams
- **Update**: Update an existing team
- **Delete**: Delete a team
- **Add Member**: Add a user to a team
- **Remove Member**: Remove a user from a team
- **Grant Customer Access**: Grant team access to a customer
- **Revoke Customer Access**: Revoke customer access from a team
- **Grant Project Access**: Grant team access to a project
- **Revoke Project Access**: Revoke project access from a team
- **Grant Activity Access**: Grant team access to an activity
- **Revoke Activity Access**: Revoke activity access from a team

### Timesheet

- **Create**: Create a new timesheet entry
- **Get**: Get a specific timesheet by ID
- **Get All**: List all timesheets with extensive filtering options
- **Update**: Update an existing timesheet
- **Delete**: Delete a timesheet
- **Stop**: Stop an active timesheet
- **Restart**: Restart a timesheet (creates new entry)
- **Duplicate**: Duplicate a timesheet
- **Toggle Export**: Toggle timesheet export state
- **Update Meta**: Update timesheet custom field
- **Get Recent**: Get recent user activities
- **Get Active**: Get active timesheets for current user

### User

- **Create**: Create a new user
- **Get**: Get a specific user by ID
- **Get All**: List all users with filtering options
- **Get Me**: Get current authenticated user
- **Update**: Update an existing user
- **Update Preferences**: Update user preferences
- **Delete API Token**: Delete an API token

### Invoice

- **Get**: Get a specific invoice by ID
- **Get All**: List all invoices with filtering options

### Default

- **Get Timesheet Config**: Get timesheet configuration
- **Get Colors**: Get configured color codes
- **Ping**: Test API connection
- **Get Version**: Get Kimai version information
- **Get Plugins**: Get installed plugins list

## Usage Examples

### Example 1: Create a Timesheet Entry

1. Add a **Kimai** node to your workflow
2. Select **Resource**: Timesheet
3. Select **Operation**: Create
4. Fill in:
   - **Project ID**: `1`
   - **Activity ID**: `5`
   - **Begin**: `2024-01-15T09:00:00`
   - **End**: `2024-01-15T17:00:00`
   - **Description**: `Working on project tasks`

### Example 2: Get All Active Timesheets

1. Add a **Kimai** node
2. Select **Resource**: Timesheet
3. Select **Operation**: Get Active
4. The node will return all active timesheets for the current user

### Example 3: Filter Timesheets by Date Range

1. Add a **Kimai** node
2. Select **Resource**: Timesheet
3. Select **Operation**: Get All
4. Configure filters:
   - **Begin**: `2024-01-01T00:00:00`
   - **End**: `2024-01-31T23:59:59`
   - **Active**: `Active` (value: `1`)

### Example 4: Create a Customer

1. Add a **Kimai** node
2. Select **Resource**: Customer
3. Select **Operation**: Create
4. Fill in required fields:
   - **Name**: `Acme Corporation`
   - **Country**: `US`
   - **Currency**: `USD`
   - **Timezone**: `America/New_York`

## Query Parameters

The node supports various query parameters for filtering and sorting:

- **Filtering**: `visible`, `customer`, `project`, `activity`, `user`, etc.
- **Date Ranges**: `begin`, `end` (ISO 8601 format)
- **Sorting**: `orderBy`, `order` (ASC/DESC)
- **Search**: `term` (free text search)
- **Pagination**: `page`, `size`
- **Array Filters**: `projects[]`, `customers[]`, `activities[]`, `users[]`, `tags[]`

## Array Parameters

For array query parameters (like `projects[]`), provide comma-separated values:
- **Projects**: `1,2,3` → `projects[]=1&projects[]=2&projects[]=3`
- **Tags**: `tag1,tag2` → `tags[]=tag1&tags[]=tag2`

## Date-Time Format

Timesheet operations use ISO 8601 date-time format:
- Format: `YYYY-MM-DDThh:mm:ss` (e.g., `2024-01-15T09:00:00`)
- Timezone: Handled by Kimai based on user/customer timezone settings

## Response Handling

All operations return JSON responses. The node automatically handles:
- Single entity responses (Get operations)
- Array responses (Get All operations)
- Empty responses (Delete operations return 204)

## Error Handling

The node will return error responses from the Kimai API. Common errors:
- **401**: Invalid or missing API token
- **403**: Insufficient permissions
- **404**: Resource not found
- **422**: Validation error (check request body)

## Compatibility

- Minimum n8n version: 0.180.0
- Tested against n8n version: 1.0.0+
- Kimai API: Compatible with Kimai v2.0+

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Kimai API documentation](https://www.kimai.org/documentation/rest-api.html)
- [Kimai website](https://www.kimai.org/)

## Development

### Prerequisites

- Node.js (v18.10.0 or higher)
- npm
- Docker and Docker Compose (for testing)

### Setup Development Environment

1. Clone the repository:
   ```bash
   git clone https://github.com/Pixel-Process-UG/n8n-nodes-kimai.git
   cd n8n-nodes-kimai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the node:
   ```bash
   npm run build
   ```

4. Start the development environment:
   ```bash
   bash scripts/setup.sh
   ```
   Or manually with Docker Compose:
   ```bash
   docker-compose up -d
   ```

5. Access n8n at http://localhost:5678
   - Default credentials are configured in your docker-compose.yml

### Watch Mode

To automatically rebuild on file changes:

```bash
npm run dev
```

### Testing the Node

1. Build the node:
   ```bash
   npm run build
   ```

2. Start the test environment:
   ```bash
   bash scripts/setup.sh
   ```

3. In n8n, add the Kimai node to a workflow and test the operations

### Project Structure

```
n8n-kimai/
├── credentials/
│   └── KimaiApi.credentials.ts    # API credentials configuration
├── nodes/
│   └── Kimai/
│       └── Kimai.node.ts          # Main node implementation
├── icons/
│   └── kimai.svg                  # Node icon
├── scripts/
│   ├── build.sh                   # Build script
│   ├── setup.sh                   # Development setup
│   └── rebuild.sh                 # Rebuild helper
├── docker-compose.yml             # Docker setup for local testing
├── package.json                   # Package configuration
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

### Available npm Scripts

- `npm run build`: Build the node
- `npm run dev`: Watch for changes and rebuild automatically
- `npm run format`: Format code with Prettier
- `npm run lint`: Lint code with ESLint
- `npm run lintfix`: Auto-fix linting issues

### Docker Environment

The project includes a Docker Compose setup for easy local testing:

- **n8n**: The workflow automation platform (port 5678)
- **postgres**: PostgreSQL database for n8n (optional, for production-like setup)

To start:

```bash
docker-compose up -d
```

To stop:

```bash
docker-compose down
```

To view logs:

```bash
docker-compose logs -f n8n
```

### API Coverage

This node implements all major Kimai API endpoints:

✅ Activities (CRUD + rates + meta fields)  
✅ Customers (CRUD + rates + meta fields)  
✅ Projects (CRUD + rates + meta fields)  
✅ Tags (CRUD operations)  
✅ Teams (CRUD + member management + access control)  
✅ Timesheets (CRUD + stop/restart/duplicate/export + meta fields)  
✅ Users (CRUD + preferences + API token management)  
✅ Invoices (Read operations)  
✅ System (Config, colors, ping, version, plugins)

Based on the official Kimai REST API.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

Quick start:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Publishing

### Automated Publishing

This project uses GitHub Actions to automatically publish to npm when a new release is created:

1. **Update version** in `package.json`
2. **Update** `CHANGELOG.md` with changes
3. **Commit and push** changes
4. **Create a tag**:
   ```bash
   git tag -a v1.0.1 -m "Release v1.0.1"
   git push origin v1.0.1
   ```
5. **Create GitHub Release** - Publishing to npm happens automatically

### GitHub Actions Workflows

- **Build & Test** - Runs on every push/PR
- **Version Check** - Ensures version is bumped in PRs
- **Publish to npm** - Automatic when GitHub release is created

## Issues

If you encounter any issues or have questions, please [open an issue on GitHub](https://github.com/Pixel-Process-UG/n8n-nodes-kimai/issues).

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

## License

MIT

## Author

**Pixel & Process UG (haftungsbeschränkt)**

- Email: info@pixel-process.com
- GitHub: [@Pixel-Process-UG](https://github.com/Pixel-Process-UG)

## Acknowledgments

- Built on top of [n8n](https://n8n.io/)
- Integrates with [Kimai](https://www.kimai.org/) time-tracking software
- Based on the Kimai REST API
- Created by Pixel & Process - Digital agency for marketing, web development, and automation

## About Pixel & Process

Pixel & Process is a digital agency based in Lübeck, Germany, specializing in:

- 📈 **Performance Marketing** - Google Ads, Meta, LinkedIn
- 🎨 **Web Design & Development** - Next.js, React, modern web technologies
- ⚙️ **Process Automation** - n8n, workflow automation, efficiency optimization
- 🔓 **Open Source Solutions** - GDPR-compliant, sustainable digital transformation

We build tools like this n8n-kimai node to help businesses automate their time tracking and improve efficiency.

🌐 **Website**: [pixelandprocess.de](https://pixelandprocess.de)  
📧 **Contact**: info@pixel-process.com  
📍 **Location**: Lübeck, Germany

---

**Note**: This is a community-created node and is not officially maintained by n8n GmbH or the Kimai project.

