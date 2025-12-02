# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2024-12-02

### Fixed
- Fixed "This form should not contain extra fields" validation error when creating/updating resources
- All create and update operations now properly filter out empty/undefined optional fields
- Applied fix to all resources: Activity, Customer, Project, Tag, Team, Timesheet, User
- Boolean fields now use nullish coalescing to preserve explicit `false` values
- Rate operations now properly handle optional fields

## [1.0.1] - 2024-12-02

### Fixed
- Fixed 400 Bad Request error when using "Get all activities" operation
- Removed duplicate `projects[]` query parameter that was causing parameter conflicts
- Optional query parameters (`project`, `term`) now only sent when they have values to prevent API rejection of empty parameters

## [1.0.0] - 2024-12-02

### Added
- Initial release of n8n-nodes-kimai
- Full API coverage for Kimai time-tracking software
- Support for 9 resources:
  - Activity (CRUD, rates, meta fields)
  - Customer (CRUD, rates, meta fields)
  - Project (CRUD, rates, meta fields)
  - Tag (Create, Get All, Delete)
  - Team (CRUD, member management, access control)
  - Timesheet (CRUD, stop/restart/duplicate/export, meta fields, recent/active)
  - User (CRUD, preferences, API token management)
  - Invoice (Read operations)
  - Default (Config, colors, ping, version, plugins)
- 60+ operations covering all public Kimai API endpoints
- Declarative routing style for clean, maintainable code
- Bearer token authentication
- Query parameter support (filtering, sorting, pagination, search)
- Array parameter handling (projects[], customers[], activities[], users[], tags[])
- Date-time field support for timesheet operations
- Meta field updates for activities, customers, projects, timesheets
- Rate management for activities, customers, projects
- Team access control (customers, projects, activities)
- User preferences and API token management
- Official Kimai SVG icon
- Comprehensive documentation
- Docker-based development environment

### Technical Details
- Built with n8n-workflow API version 1
- TypeScript implementation
- ES2020 target
- CommonJS module format

[1.0.2]: https://github.com/Pixel-Process-UG/n8n-nodes-kimai/releases/tag/v1.0.2
[1.0.1]: https://github.com/Pixel-Process-UG/n8n-nodes-kimai/releases/tag/v1.0.1
[1.0.0]: https://github.com/Pixel-Process-UG/n8n-nodes-kimai/releases/tag/v1.0.0

