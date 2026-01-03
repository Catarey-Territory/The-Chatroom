# GitHub Copilot Instructions for The Chatroom

## Quick Start for Contributors

When working on this codebase:
1. **Three servers required:** API (port 3001), Socket.IO (port 3002), Next.js (port 3000)
2. **Mixed TypeScript/JavaScript:** Respect existing file types, use TypeScript for new features
3. **Path aliases:** Use `@/*` imports, not relative paths across directories
4. **Security:** Never commit secrets, always validate user inputs
5. **Database changes:** Edit schema → migrate → generate → update code

## Project Overview

The Chatroom is a real-time chat application with multi-tier authentication, language-specific lounges, user marketplace, moderation, and verification system. Built with Node.js, Express, Socket.IO, Next.js, and PostgreSQL.

## Technology Stack


## Architecture & Project Structure

**📦 Monorepo Structure:** This project uses npm workspaces with separate packages for API, Socket.IO, frontend, and shared code.

```
The-Chatroom/
├── packages/
│   ├── api/             # Backend REST API
│   │   └── src/
│   │       ├── server.js        # Express API server (port 3001)
│   │       ├── routes/          # API routes (auth, etc.)
│   │       ├── lib/             # Core libraries (JWT, crypto, Prisma, Twilio)
│   │       ├── middleware/      # Express middleware (CSRF, rate limiting)
│   │       ├── services/        # Background jobs and services
│   │       └── utils/           # Logger, security helpers
│   ├── socket/          # WebSocket server
│   │   └── src/
│   │       └── socket-server.js # Socket.IO server (port 3002)
│   ├── web/             # Next.js frontend
│   │   └── src/
│   │       ├── app/             # Next.js App Router
│   │       ├── pages/           # Next.js Pages Router (legacy)
│   │       ├── components/      # React UI components
│   │       │   ├── chat/       # Chat-related components
│   │       │   ├── auth/       # Authentication components
│   │       │   └── ui/         # shadcn/ui components
│   │       ├── lib/             # Frontend utilities
│   │       └── styles/          # Global CSS and Tailwind styles
│   └── shared/          # Shared types and utilities
│       └── src/
│           ├── types/           # TypeScript type definitions
│           ├── schemas/         # JSON schemas
│           └── utils/           # Shared utilities
├── prisma/              # Database schema and migrations
│   └── schema.prisma   # Prisma schema definition
├── public/              # Static assets & client scripts
└── docs/                # Documentation
```

## Development Setup

### Environment Variables

Required environment variables (see `.env.example`):

### Running the Application

Three separate processes are required for development:

```bash
# Terminal 1: API server (Express) - packages/api
npm run dev:api

# Terminal 2: Socket.IO server - packages/socket
npm run dev:socket

# Terminal 3: Next.js frontend - packages/web
npm run dev:web

# Or run all services at once:
npm run dev
```

### Database Setup

```bash
npm run prisma:migrate    # Run migrations
npm run prisma:generate   # Generate Prisma client
```

## Code Style & Conventions

### TypeScript Configuration

  - Use TypeScript (`.ts`, `.tsx`) for new components and features when possible
  - Respect existing file types when modifying existing code
  - Backend code (routes, middleware, services) is primarily JavaScript
  - Frontend components use both TypeScript and JavaScript

### Coding Standards

1. **Follow Conventional Commits:**
   - `feat: add lounge filter`
   - `fix: correct refresh token expiry`
   - `docs: update README links`
   - `refactor: move server files`

2. **Code formatting:**
   - Use Prettier and ESLint (if configured)
   - Keep TypeScript `strict: false` as configured
   - Respect existing code style in files you modify

3. **Imports:**
   - **API package:** Use relative imports (`./routes/`, `./lib/`, `./utils/`)
   - **Web package:** Use path aliases (`@/components/*`, `@/lib/*`, `@/utils/*`) from `packages/web/src`
   - **Shared package:** Import from `@chatroom/shared` in other packages
   - Prefer relative imports for files within the same package

4. **Naming conventions:**
   - Use camelCase for variables and functions
   - Use PascalCase for React components and classes
   - Use UPPER_CASE for constants and environment variables

### React Component Patterns


### Next.js Routing

- **App Router (primary):** Use `packages/web/src/app/` for new routes following Next.js 13+ conventions
- **Pages Router (legacy):** Located in `packages/web/src/pages/` - avoid adding new pages here
- **File-based routing:** Each folder in `app/` becomes a route segment
- **Dynamic routes:** Use `[param]` for dynamic segments (e.g., `app/lounge/[id]/page.tsx`)
- **Layouts:** Use `layout.tsx` for shared UI across routes
- **Route handlers:** Create `route.ts` files for API endpoints in App Router


### Database & Prisma


Key models:

## Security Practices

### Authentication & Authorization


### Security Headers


### Input Validation


### Secrets Management


## Common Patterns

### API Routes


Example:
```javascript
// packages/api/src/routes/auth.js
const router = require('express').Router();
const { authenticate } = require('../middleware/auth');

router.get('/endpoint', authenticate, async (req, res) => {
  // Handle request
  res.json({ data: 'response' });
});
```

### Socket.IO Events


### React Components


### Error Handling


## Testing Approach

This project uses manual testing during development. To test your changes:

1. Start the API server: `npm run dev:api`
2. Start the Socket.IO server: `npm run dev:socket`
3. Start the Next.js frontend: `npm run dev:web`
4. Or start all services at once: `npm run dev`

Test your changes by interacting with the application in the browser and verifying expected behavior.

## Common Tasks

### Adding a New API Endpoint

1. Create route handler in `packages/api/src/routes/` directory
2. Add middleware if needed (auth, CSRF, rate limiting)
3. Update Prisma schema if database changes needed
4. Run migrations: `npm run prisma:migrate`
5. Test with all three servers running: `npm run dev`

### Adding a New React Component

1. Create component in appropriate directory (`packages/web/src/components/chat/`, `components/auth/`, `components/ui/`)
2. Use TypeScript if possible (`.tsx`)
3. Import from path alias: `import Component from '@/components/...'`
4. Follow existing patterns in similar components

### Modifying Database Schema

1. Edit `prisma/schema.prisma`
2. Run `npm run prisma:migrate` to create and apply migration
3. Run `npm run prisma:generate` to update Prisma client
4. Update affected code to handle schema changes

### Adding New Dependencies

1. Use `npm install <package>` for production dependencies
2. Use `npm install -D <package>` for dev dependencies
3. Update documentation if the dependency changes workflow
4. Test that all servers still work after installation
5. **Optional dependencies:** Some features (AWS S3, face recognition, OCR) use optional dependencies
   - These are in `optionalDependencies` in `package.json`
   - The app works without them; they enable advanced features
   - Install individually if needed: `npm install <package>`

## Troubleshooting

### Common Issues


### Debugging


## Documentation

Available documentation resources:

- **README.md:** Project overview, setup instructions, and getting started guide
- **docs/COMPLETE_CODEBASE.md:** Comprehensive codebase documentation
- **docs/TODO.md:** Planned features and improvements
- **docs/*-schema.md:** Database schema documentation for each model
- **.github/copilot-instructions.md:** This file - contributor guidelines and conventions


## Important Notes

1. **Three servers:** Always remember this app requires three separate processes (API, Socket.IO, Next.js)
2. **Mixed codebase:** Both TypeScript and JavaScript - respect existing file types
3. **Path aliases:** Always use `@/*` imports, not relative paths across directories
4. **Prisma workflow:** Schema change → migrate → generate → update code
5. **Security first:** Never commit secrets, always validate inputs
6. **Minimal changes:** Keep PRs focused and avoid unnecessary refactoring
7. **Documentation:** Update relevant docs when making significant changes
8. **Environment setup:** Copy `.env.example` to `.env` before starting development
9. **Server startup order:** Start API server first, then Socket.IO, then Next.js frontend

## Getting Help

