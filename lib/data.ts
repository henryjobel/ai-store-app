import { BuildTask, Order, Product, Project, SectionConfig, ThemeId, UserProfile, Website } from './types';

export const products: Product[] = [];
export const projects: Project[] = [];

export const users: UserProfile[] = [
  {
    id: 'usr_demo',
    name: 'Demo Owner',
    businessName: 'Nova D2C',
    email: 'owner@novad2c.com'
  }
];

export const websites: Website[] = [];

export const orders: Order[] = [
  {
    id: 'ord_1',
    customerName: 'Emma Stone',
    total: 89,
    status: 'pending',
    email: 'emma@example.com',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  },
  {
    id: 'ord_2',
    customerName: 'Liam Grey',
    total: 120,
    status: 'shipped',
    email: 'liam@example.com',
    createdAt: new Date().toISOString()
  }
];

export const themes = [
  { id: 'modern', label: 'Modern Clean' },
  { id: 'minimal', label: 'Minimal Mono' },
  { id: 'bold', label: 'Bold Promo' }
] as const;

export function randomId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function lowStockProducts(): Product[] {
  return products.filter((product) => product.variants.some((variant) => variant.stock < 5));
}

export function defaultSections(theme: ThemeId, businessName: string): SectionConfig[] {
  const base = [
    {
      id: randomId('sec'),
      type: 'hero' as const,
      heading: `${businessName} — AI Generated Storefront`,
      body: 'Launch in minutes with conversion-focused copy and mobile-first layout.',
      buttonLabel: 'Shop Now',
      buttonColor: theme === 'minimal' ? '#0f172a' : '#1d4ed8',
      roundedButtons: theme !== 'minimal',
      spacing: 'normal' as const
    },
    {
      id: randomId('sec'),
      type: 'productGrid' as const,
      heading: 'Featured Products',
      body: 'AI-selected products from your catalog optimized for conversion.',
      spacing: 'relaxed' as const
    },
    {
      id: randomId('sec'),
      type: 'cta' as const,
      heading: 'Limited Launch Discount',
      body: 'Use code LAUNCH10 at checkout.',
      buttonLabel: 'Claim Offer',
      buttonColor: '#0f766e',
      roundedButtons: true,
      spacing: 'normal' as const
    },
    {
      id: randomId('sec'),
      type: 'footer' as const,
      heading: 'Need support?',
      body: 'Email support@storebuilder.app',
      spacing: 'tight' as const
    }
  ];

  return base;
}

export function getProjectPlan(projectId?: string): BuildTask[] {
  const project = projects.find((item) => item.id === projectId);
  const website = websites.find((item) => item.id === project?.websiteId);

  return [
    { id: 'setup-profile', label: 'Setup account and business profile', phase: 'setup', done: true },
    {
      id: 'catalog-products',
      label: 'Generate product data from image and save product',
      phase: 'catalog',
      done: Boolean(project?.products.length)
    },
    {
      id: 'website-generate',
      label: 'Generate storefront with selected theme',
      phase: 'website',
      done: Boolean(website)
    },
    {
      id: 'website-customize',
      label: 'Customize sections with AI prompt',
      phase: 'website',
      done: Boolean(website?.sections.some((section) => section.body.length > 100))
    },
    {
      id: 'publish-domain',
      label: 'Publish with subdomain/custom domain',
      phase: 'publish',
      done: Boolean(project?.published)
    },
    {
      id: 'ops-monitor',
      label: 'Monitor orders and inventory in dashboards',
      phase: 'operations',
      done: orders.length > 0
    }
  ];
}
