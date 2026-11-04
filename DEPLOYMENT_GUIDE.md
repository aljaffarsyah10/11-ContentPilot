# DEPLOYMENT_GUIDE.md — ContentPilot

**Version:** 1.0.0  
**Phase:** 10 — Production Deployment  
**Date:** 2026-11-04  
**Status:** Release Candidate

---

## 1. Overview

ContentPilot is a Next.js 16 (App Router) application backed by PostgreSQL. This guide covers two deployment targets:

| Target | Recommended For |
|--------|----------------|
| **A. Docker + VPS** (primary) | Self-hosted, full control, affordable |
| **B. Vercel + Managed DB** (alternative) | Zero-ops, fastest to ship |

---

## 2. Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | ≥ 22 |
| PostgreSQL | ≥ 15 |
| Docker | ≥ 24 (Option A) |
| Docker Compose | ≥ 2.x (Option A) |
| Domain name | With DNS control |

---

## 3. Environment Variables

Create `.env.production` from the template. **Never commit this file.**

```bash
cp .env.example .env.production
```

Fill in all required values:

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | ✅ | Set to `production` |
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `AUTH_SECRET` | ✅ | Random 32-byte hex secret |
| `AUTH_URL` | ✅ | Your production HTTPS URL e.g. `https://app.yourdomain.com` |
| `OPENAI_API_KEY` | ✅ | OpenAI API key (server-side only) |
| `OPENAI_MODEL` | ✅ | Recommended: `gpt-4o-mini` |
| `NEXT_PUBLIC_APP_URL` | ✅ | Same as `AUTH_URL` |
| `POSTGRES_DB` | ⚠️ Docker only | Database name |
| `POSTGRES_USER` | ⚠️ Docker only | Database user |
| `POSTGRES_PASSWORD` | ⚠️ Docker only | Strong password |

Generate `AUTH_SECRET`:

```bash
openssl rand -hex 32
```

> [!CAUTION]
> Never expose `DATABASE_URL`, `AUTH_SECRET`, or `OPENAI_API_KEY` in client-side code or Git history.

---

## 4. Option A — Docker + VPS Deployment (Recommended)

### 4.1 Server Requirements

- Ubuntu 22.04 LTS or Debian 12
- Minimum: 1 vCPU, 1 GB RAM, 20 GB SSD
- Recommended: 2 vCPU, 2 GB RAM, 40 GB SSD
- Open ports: 80, 443, 22

### 4.2 Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install Nginx (reverse proxy)
sudo apt install nginx certbot python3-certbot-nginx -y
```

### 4.3 Clone & Configure

```bash
# Clone repository
git clone https://github.com/<your-username>/contentpilot.git
cd contentpilot

# Create production env
cp .env.example .env.production
nano .env.production
# Fill in all values
```

### 4.4 Build & Launch

```bash
# Build Docker image
docker compose --env-file .env.production build

# Start all services (postgres + migrate + app)
docker compose --env-file .env.production up -d

# Verify containers running
docker compose ps

# Check app logs
docker compose logs -f app
```

Expected output after `docker compose ps`:
```
NAME                   STATUS          PORTS
contentpilot_db        Up (healthy)    5432/tcp
contentpilot_migrate   Exited (0)      (migration complete)
contentpilot_app       Up              0.0.0.0:3000->3000/tcp
```

### 4.5 Nginx Reverse Proxy + HTTPS

Create Nginx config:

```bash
sudo nano /etc/nginx/sites-available/contentpilot
```

```nginx
server {
    listen 80;
    server_name app.yourdomain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name app.yourdomain.com;

    # SSL (Certbot will fill these in)
    ssl_certificate /etc/letsencrypt/live/app.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/app.yourdomain.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self';" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/contentpilot /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Issue SSL certificate
sudo certbot --nginx -d app.yourdomain.com
```

### 4.6 DNS Configuration

Point your domain at the VPS IP:

| Record | Type | Value | TTL |
|--------|------|-------|-----|
| `app` | A | `<VPS_IP>` | 300 |
| `@` | A | `<VPS_IP>` | 300 (optional for root) |

---

## 5. Option B — Vercel + Neon Postgres Deployment (Alternative)

### 5.1 Setup

```bash
# Install Vercel CLI
npm i -g vercel

# Login and link project
vercel login
vercel link

# Add environment variables
vercel env add DATABASE_URL production
vercel env add AUTH_SECRET production
vercel env add AUTH_URL production
vercel env add OPENAI_API_KEY production
vercel env add OPENAI_MODEL production
vercel env add NEXT_PUBLIC_APP_URL production
```

### 5.2 Database

Use [Neon](https://neon.tech) or [Supabase](https://supabase.com) for managed PostgreSQL. Set `DATABASE_URL` to the connection string from your provider.

Run migrations against the production DB:

```bash
DATABASE_URL="<production-db-url>" npx prisma migrate deploy
```

### 5.3 Deploy

```bash
vercel --prod
```

> [!NOTE]
> `output: "standalone"` is set in `next.config.ts` for Docker compatibility. Vercel automatically handles this for Vercel deployments — it has no negative impact.

---

## 6. Database Migration (Production)

**Always run this before starting the application for the first time and after each schema change.**

### Docker (auto-runs via `migrate` service):
```bash
docker compose --env-file .env.production up migrate
```

### Manual:
```bash
DATABASE_URL="<prod-db-url>" npx prisma migrate deploy
```

> [!CAUTION]
> Never run `prisma migrate dev` in production. Use only `prisma migrate deploy`.

---

## 7. Backup Strategy

### 7.1 Automated Database Backup (Docker)

Create a cron job on the VPS:

```bash
sudo crontab -e
```

Add (daily backup at 02:00 UTC, retain 30 days):

```
0 2 * * * docker exec contentpilot_db pg_dump -U contentpilot contentpilot | gzip > /backups/contentpilot_$(date +\%Y\%m\%d).sql.gz
0 3 * * * find /backups -name "contentpilot_*.sql.gz" -mtime +30 -delete
```

Create backup directory:

```bash
sudo mkdir -p /backups
sudo chmod 700 /backups
```

### 7.2 Restore from Backup

```bash
gunzip -c /backups/contentpilot_20261104.sql.gz | docker exec -i contentpilot_db psql -U contentpilot contentpilot
```

---

## 8. Monitoring

### 8.1 Container Health

```bash
# Live container status
docker compose ps

# App logs (live tail)
docker compose logs -f app

# DB logs
docker compose logs -f postgres
```

### 8.2 Application Uptime Check

Set up a free uptime monitor at [UptimeRobot](https://uptimerobot.com) or [Better Uptime](https://betteruptime.com):

- Monitor URL: `https://app.yourdomain.com/api/health` (see Section 9)
- Interval: 5 minutes
- Alert: Email + SMS on downtime

### 8.3 Health Check Endpoint

The application exposes a lightweight health route at `/api/health` (see Section 9).

---

## 9. Health Check Endpoint

Add a production health check at `src/app/api/health/route.ts`:

```typescript
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { status: "ok", timestamp: new Date().toISOString(), version: "1.0.0" },
    { status: 200 }
  );
}
```

Test after deployment:

```bash
curl https://app.yourdomain.com/api/health
# Expected: {"status":"ok","timestamp":"...","version":"1.0.0"}
```

---

## 10. Update / Redeploy

```bash
# Pull latest code
git pull origin main

# Rebuild and restart (zero-downtime is not guaranteed on single-instance VPS)
docker compose --env-file .env.production build
docker compose --env-file .env.production up -d --remove-orphans
```

---

## 11. Rollback

```bash
# View commit history
git log --oneline

# Rollback to previous release
git checkout <previous-commit-hash>
docker compose --env-file .env.production build
docker compose --env-file .env.production up -d
```

---

## 12. Production Smoke Test Checklist

After deployment, manually verify each step:

| Step | URL / Action | Expected |
|------|--------------|----------|
| Landing page | `GET /` | 200, page loads |
| Health check | `GET /api/health` | `{"status":"ok"}` |
| Register | `POST /api/auth/register` | 201 created |
| Login | `GET /login` → submit form | Redirect to `/dashboard` |
| Dashboard | `GET /dashboard` | Metrics visible |
| Create content | `POST /api/contents` | Content appears in list |
| AI generation | `POST /api/ai/generate-caption` | Caption returned |
| Calendar | `GET /calendar` | Monthly view loads |
| Logout | Click logout | Redirect to `/login` |

> [!IMPORTANT]
> Do NOT mark deployment as complete until all smoke test steps pass on the production URL.

---

## 13. Security Hardening (Post-Deploy)

- [ ] Confirm `AUTH_SECRET` is unique and not reused from dev
- [ ] Confirm `OPENAI_API_KEY` is not in any Git commit
- [ ] Confirm Nginx security headers are active (`curl -I https://app.yourdomain.com`)
- [ ] Confirm HTTPS redirect from HTTP works
- [ ] Confirm database is not publicly reachable (only via Docker network)
- [ ] Enable fail2ban on SSH port
- [ ] Disable root SSH login (`PermitRootLogin no` in `/etc/ssh/sshd_config`)

---

## 14. Known Limitations (MVP)

| Limitation | Notes |
|------------|-------|
| No automatic publishing to social media | MVP scope: planning only |
| No background jobs / queues | Redis/worker not in MVP |
| Single-instance deployment | No horizontal scaling in this config |
| No real-time notifications | Not in MVP |
| AI rate limiting | Basic — no Redis-backed rate limiter |
