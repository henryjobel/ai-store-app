# AI Commerce Builder MVP Execution Plan

## Phase 1: Setup
1. Configure account profile (name, business name, email).
2. Create a project and choose theme.

## Phase 2: Product Intelligence
1. Upload product image URL (replace with S3/R2 upload in production).
2. Generate product copy using free AI endpoint.
3. Review and regenerate specific fields.
4. Save product with variants, stock tracking, and SEO fields.

## Phase 3: Website Generation
1. Generate store sections from project data.
2. Apply section-level AI prompts for tone/layout changes.
3. Preview generated configuration.

## Phase 4: Publish
1. Publish to subdomain.
2. Attach custom domain metadata.
3. Open live storefront route for smoke testing.

## Phase 5: Operations
1. Monitor KPIs from store dashboard.
2. Review order queue and governance in admin panel.
3. Track low-stock items and update catalog.

## Production Hardening Backlog
- Replace in-memory storage with PostgreSQL + Prisma.
- Replace placeholder image URL input with real object storage uploads.
- Add auth sessions (NextAuth/JWT).
- Integrate payments (Stripe/SSLCommerz).
- Add webhook-based order sync and email automation.
