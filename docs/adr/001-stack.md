# ADR-001: Stack — NestJS + Postgres + Prisma + JWT

- **Status:** Accepted
- **Date:** 2026-07-29

## Context

PulseDesk is a learning fullstack product (React + Node) aimed at a Middle Fullstack level. The backend needs clear module boundaries, typed config, relational data with migrations, and a standard auth story that interviewers expect. The frontend already assumes a separate HTTP API (`/health` today; domain APIs next).

## Decision

### NestJS instead of Express

Use **NestJS** (TypeScript) for the API.

- Modules, DI, guards, pipes, and filters map well to RBAC, validation, and layered services.
- The structure scales from `/health` to auth, workspaces, and tasks without rewriting the app shape.
- Trade-off: steeper learning curve than a minimal Express app; acceptable for the target role.

### PostgreSQL instead of MongoDB

Use **PostgreSQL** as the system of record.

- Workspaces, memberships, tasks, and audit logs are relational and benefit from constraints and transactions.
- Multi-tenant isolation and joins (assignee, project, comments) are clearer in SQL.
- Trade-off: more upfront schema design; worth it for correctness and interview depth (`EXPLAIN`, indexes, migrations).

### Prisma as the default ORM

Use **Prisma** for schema, migrations, and type-safe queries (to be wired in Week 2).

- Migration workflow fits the pet-project cadence.
- Generated client types reduce glue code between Nest and the DB.
- Trade-off: some advanced SQL still needs `$queryRaw` / careful modeling; start with Prisma, drop to SQL when needed.

### JWT access + refresh tokens

Use a **short-lived access JWT** plus a **refresh token** (stored hashed server-side; rotation on refresh).

- Access token keeps API stateless for the common path.
- Refresh enables session continuity without long-lived bearer tokens in the browser.
- Fits httpOnly cookie or dual-token flows planned for Week 3.
- Trade-off: more moving parts than a single session cookie; needed for the security/RBAC story of this project.

## Consequences

- Local infra is Docker Compose: Postgres + Redis (queues/cache later).
- Env is documented in `.env.example`; secrets stay out of git.
- Frontend talks to the API over HTTP (CORS via `WEB_ORIGIN`); later WebSockets will reuse the same auth model.
- Future ADRs should cover invite emails/queues, file storage, and realtime room design when those land.
