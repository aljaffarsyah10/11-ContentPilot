# ============================================================
# ContentPilot — Production Dockerfile
# Multi-stage build: builder → runner (distroless-compatible)
# ============================================================

# ---- Stage 1: Dependencies ----
FROM node:22-alpine AS deps
WORKDIR /app

# Install OS packages needed for Prisma native binaries
RUN apk add --no-cache libc6-compat openssl

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# ---- Stage 2: Builder ----
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js for production (standalone output)
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- Stage 3: Runner ----
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only production artifacts
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run database migration then start the app
CMD ["node", "server.js"]

