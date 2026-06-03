---
name: Física de las Atracciones — static serving approach
description: How the React Vite frontend is served in this project (not via Vite dev server)
---

## Rule
The `fisica-atracciones` Vite app is served as a **pre-built static bundle** via the Express API server (port 8080), NOT via its own Vite dev server.

## Why
The Replit health-check system consistently fails to detect Vite dev servers started for newly-created artifacts (`DIDNT_OPEN_A_PORT` error), regardless of port (tried 18933, 5173, 5000, 3000). The pre-existing api-server workflow (port 8080) is the only reliably running web server. Serving static files from Express bypasses the issue entirely.

## How to apply
- **After any frontend code change**, rebuild: `cd /home/runner/workspace && PORT=3000 BASE_PATH=/ pnpm --filter @workspace/fisica-atracciones run build`
- The build outputs to `artifacts/fisica-atracciones/dist/public/`
- Express serves those files via `express.static(STATIC_DIR)` in `artifacts/api-server/src/app.ts`
- The api-server artifact.toml routes both `/api` and `/` to port 8080
- **Do NOT try to use the `fisica-atracciones` Vite dev server or restart its workflow** — it will always fail the health check
