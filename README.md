# AI Commerce Builder (MVP)

This repository contains a full-stack MVP implementation for an AI Ecommerce Website Generator.

## Implemented Modules

- **Authentication scaffold** (`/auth`)
  - Email/password-style user profile state
  - Business profile management endpoint (`GET/PATCH /api/profile`)
- **User Dashboard / Product Builder** (`/builder`)
  - Product image URL input (placeholder for image upload)
  - AI product generation and per-field regeneration
  - Product + project creation flow
- **Website Studio** (`/studio`)
  - Generate storefront from project + theme
  - AI prompt-driven section customization
  - Publish with subdomain/custom-domain metadata
- **Store Dashboard** (`/dashboard`)
  - KPIs: orders, revenue, products, published sites
  - Low-stock list from variant-level inventory
- **Admin Panel** (`/admin`)
  - Orders queue with customer/status
  - Project governance and publish/domain visibility

## API Surface

- `POST /api/generate`
- `GET/POST /api/products`
- `PATCH/DELETE /api/products/:id`
- `GET/POST /api/projects`
- `PATCH /api/projects/:id`
- `GET /api/orders`
- `PATCH /api/orders/:id`
- `GET/POST/PATCH /api/websites`
- `GET/PATCH /api/profile`

## Stack

- Next.js 14 (App Router)
- React + TypeScript
- Tailwind CSS
- In-memory storage (replace with PostgreSQL/Prisma for production)

## Run

```bash
npm install
npm run dev
```

## Production Hardening Next Steps

- Real auth/session stack (NextAuth or custom JWT + DB)
- Upload pipeline to S3/R2 + image optimization jobs
- PostgreSQL + Prisma migrations
- Stripe/SSLCommerz payment and checkout validation
- Domain connection + SSL provisioning automation
- Advanced AI design policy engine with safer prompt constraints
