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
