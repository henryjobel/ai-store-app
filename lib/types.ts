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

export type Project = {
  id: string;
  businessName: string;
  theme: 'modern' | 'minimal' | 'bold';
  products: string[];
  published: boolean;
  customDomain?: string;
};

export type Order = {
  id: string;
  customerName: string;
  total: number;
  status: 'pending' | 'shipped' | 'completed';
};
