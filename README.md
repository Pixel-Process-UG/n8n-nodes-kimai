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

### Manual Installation

1. Navigate to your n8n custom nodes directory:
   ```bash
   mkdir -p ~/.n8n/nodes
   cd ~/.n8n/nodes
   ```

2. Install the node:
   ```bash
   npm install n8n-nodes-kimai
   ```

3. Restart n8n to load the new node.

### Using npm

```bash
npm install n8n-nodes-kimai
```

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

## Development

### Building

```bash
npm run build
```

### Linting

```bash
npm run lint
```

### TypeScript

The node is written in TypeScript and compiled to JavaScript in the `dist` directory.

## API Documentation

For detailed API documentation, refer to:
- [Kimai REST API Documentation](https://www.kimai.org/documentation/rest-api.html)
- [Kimai API Reference](https://www.kimai.org/documentation/rest-api.html)

## License

MIT

## Support

- [Kimai Documentation](https://www.kimai.org/documentation/)
- [n8n Community Forum](https://community.n8n.io/)
- [GitHub Issues](https://github.com/fwartner/n8n-kimai/issues)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

### 1.0.0
- Initial release
- Full API coverage for all public endpoints
- Support for all resources: Activity, Customer, Project, Tag, Team, Timesheet, User, Invoice, Default

