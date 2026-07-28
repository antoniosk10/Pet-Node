# PulseDesk

Командный таск-трекер (упрощённый Linear / Jira Lite). Pet-проект для прокачки fullstack: React + NestJS, Postgres, Redis, auth, real-time и деплой.

## Requirements

- Node.js 20+
- Docker + Docker Compose
- npm

## Quick start

```bash
# 1. Env
cp .env.example .env

# 2. Dependencies (root + apps)
npm install
npm install --prefix apps/api
npm install --prefix apps/web

# 3. Infrastructure (Postgres + Redis)
npm run compose:up

# 4. Start API and web (two terminals)
npm run api:dev
npm run web:dev

# Or both at once (infra must already be up):
npm run dev
```

Open:

- Web: http://localhost:5173
- API health: http://localhost:3000/health

## Project structure

```text
pulsedesk/
├── apps/
│   ├── api/          # NestJS backend
│   └── web/          # React + Vite frontend
├── docs/
│   └── adr/          # Architecture Decision Records
├── docker-compose.yml
├── package.json      # root scripts
└── .env.example
```

## Root scripts

| Script | Description |
|--------|-------------|
| `npm run compose:up` | Start Postgres + Redis in background |
| `npm run compose:down` | Stop containers |
| `npm run compose:ps` | Show container status |
| `npm run api:dev` | NestJS watch mode |
| `npm run web:dev` | Vite dev server |
| `npm run dev` | API + web together (`concurrently`) |
| `npm run lint` | Lint api + web |
| `npm run typecheck` | Typecheck api + web |

## Architecture notes

See [docs/adr/001-stack.md](docs/adr/001-stack.md) for stack decisions (Nest, Postgres, Prisma, JWT).
