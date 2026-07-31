# FlowBoard AI

A production-ready Full Stack Task Management application.

## Tech Stack

- React
- TypeScript
- Express
- MongoDB
- Redis
- Socket.IO

## Project Structure

apps/
packages/
docs/

## Getting Started

```bash
npm install

npm run dev
```

---

## Development Roadmap

The project is structured into iterative agile sprints, focusing on scalable architecture and progressive feature delivery.

### ✅ Sprint 1: Authentication

- **Authentication Architecture:** Engineered a robust, JWT-based authentication mechanism for stateless session management.
- **Enhanced Security:** Implemented secure, HTTP-only cookies to safeguard refresh tokens against cross-site scripting (XSS) attacks.
- **Access Control:** Established comprehensive protected routing and authorization middleware for reliable user sessions.
- **Observability & Resilience:** Integrated centralized, structured logging via Pino and a global error handling framework.

### ✅ Sprint 2: Workspace

- **Workspace Management:** Implemented complete workspace lifecycle operations including creation, retrieval, updating, and deletion with structured REST APIs.

- **Role-Based Access Control:** Designed workspace permissions with Owner, Admin, and Member roles for secure team collaboration.

- **Member Management:** Developed member invitation, role modification, and removal features to support dynamic workspace collaboration.

- **Data Architecture:** Built scalable Mongoose schemas with relational user references, validation, and optimized workspace queries.

### ✅ Sprint 3: Project Management

- **Full Project Lifecycle:** Implemented complete CRUD operations for projects scoped to workspaces with owner-only authorization for mutations.

- **Advanced Querying:** Engineered a composable query layer supporting pagination, full-text search, multi-field sorting, and filtering by status and priority.

- **Soft Delete Strategy:** Adopted a non-destructive soft delete pattern using `isDeleted` and `deletedAt` fields to preserve data integrity and enable future recovery workflows.

- **Enum-Driven Modeling:** Defined `ProjectStatus` (active, archived, on_hold, completed) and `ProjectPriority` (low, medium, high, critical) enums for structured, type-safe data modeling.

- **Nested REST Design:** Structured project endpoints as a nested resource under workspaces (`/workspaces/:workspaceId/projects`) for clean, hierarchical API design.

---

# Folder Creation

```bash
mkdir apps
mkdir packages
mkdir docs
mkdir docker

mkdir apps/client
mkdir apps/server

mkdir packages/shared
mkdir packages/eslint-config
mkdir packages/tsconfig
```
