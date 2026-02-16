# AI Commerce Builder (MVP Scaffold)

This repository contains a full-stack MVP scaffold for an **AI Ecommerce Website Generator** with:

- Landing page + product builder (user dashboard)
- Admin panel + store dashboard
- API routes for AI generation, product/project management, and orders
- Theme-ready structure for website generation

## Stack

- Next.js 14 (App Router)
- React + TypeScript
- Tailwind CSS
- In-memory data store (replace with PostgreSQL/Prisma in production)

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Implemented MVP Modules

- **Frontend/User Dashboard**: `/builder`
  - Product image URL input (placeholder for upload)
  - AI product generation
  - Product editing and save flow
- **Store Dashboard**: `/dashboard`
  - KPI widgets (orders, revenue, products, low-stock)
- **Admin Panel**: `/admin`
  - Orders queue, project + product visibility, operations checklist
- **Backend APIs**:
  - `POST /api/generate`
  - `GET/POST /api/products`
  - `GET/POST /api/projects`
  - `GET /api/orders`

## Next Steps to Productionize

- Add authentication (NextAuth/email+password + Google OAuth)
- Replace mock image URL input with real upload to S3/R2
- Persist data in PostgreSQL with Prisma
- Add checkout and Stripe integration
- Add domain publish pipeline and SSL automation
- Expand AI frontend prompt customization to section-level configuration model
