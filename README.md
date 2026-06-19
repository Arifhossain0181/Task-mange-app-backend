# Task Manage App - Backend

Simple REST API backend for managing tasks built with TypeScript and Prisma.

Features
- Create, read, update, and delete tasks
- Validation with Zod schemas
- Prisma ORM for Postgres

Prerequisites
- Node.js >= 18
- npm or yarn
- Postgres database

Quick start
1. Install dependencies:

	npm install

2. Set environment variables (example `.env`):

	DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

3. Run Prisma migrations (if needed):

	npx prisma migrate deploy

4. Start the server in development:

	npm run dev

Project layout
- `src/` — application source
- `prisma/` — schema and migrations
- `src/modules` — task controller, service, routes, and schema

Working with the repo
- To run tests, linting, or build, use the scripts defined in `package.json`.

License
MIT

Contributing
Open a PR or an issue to propose changes.

Contact
Repo owner: https://github.com/Arifhossain0181
