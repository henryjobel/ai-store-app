export type Variant = {
  id: string;
  name: string;
  value: string;
  stock: number;
};

export type Product = {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  seoTitle: string;
  seoMetaDescription: string;
  price: number;
  discountedPrice?: number;
  sku: string;
  images: string[];
  variants: Variant[];
  stockTracking: boolean;
  reviewsEnabled: boolean;
  status: 'draft' | 'published';
  actionItems: string[];
};

export type ThemeId = 'modern' | 'minimal' | 'bold';

export type Project = {
  id: string;
  businessName: string;
  theme: ThemeId;
  products: string[];
  published: boolean;
  customDomain?: string;
  ownerEmail: string;
  websiteId?: string;
};

export type SectionConfig = {
  id: string;
  type: 'hero' | 'productGrid' | 'cta' | 'footer';
  heading: string;
  body: string;
  buttonLabel?: string;
  buttonColor?: string;
  roundedButtons?: boolean;
  spacing?: 'tight' | 'normal' | 'relaxed';
};

export type Website = {
  id: string;
  projectId: string;
  theme: ThemeId;
  sections: SectionConfig[];
  generatedAt: string;
  publishedAt?: string;
  subdomain: string;
  customDomain?: string;
};

export type Order = {
  id: string;
  customerName: string;
  total: number;
  status: 'pending' | 'shipped' | 'completed';
  email: string;
  createdAt: string;
};

export type UserProfile = {
  id: string;
  name: string;
  businessName: string;
  email: string;
};

export type BuildTask = {
  id: string;
  label: string;
  phase: 'setup' | 'catalog' | 'website' | 'publish' | 'operations';
  done: boolean;
};
