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
- **Task Planner** (`/planner`)
  - Task-by-task plan view by project
  - Completion progress indicator
- **Live Storefront** (`/store/:projectId`)
  - Product listing, add-to-cart and checkout summary (MVP)
- **Store Dashboard** (`/dashboard`)
  - KPIs: orders, revenue, products, published sites
  - Low-stock list from variant-level inventory
- **Admin Panel** (`/admin`)
  - Orders queue with customer/status
  - Project governance and publish/domain visibility

## Free AI API Integration

The API route `POST /api/generate` uses a free text-generation endpoint (`text.pollinations.ai`) to generate:
- short description
- long description
- SEO description

When the free API is unavailable, the app gracefully falls back to built-in copy so the workflow still completes.

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
- `GET /api/plan`

## Execution Plan

See `docs/mvp-plan.md` for the step-by-step delivery plan and production backlog.

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
