import { NextRequest, NextResponse } from 'next/server';
import { randomId } from '@/lib/data';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const firstImage = body.images?.[0] ?? 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200';
  const token = firstImage.split('/').pop()?.split('?')[0] ?? 'item';
  const baseName = token.replace(/[-_]/g, ' ').replace(/\.[a-z]+$/i, '').slice(0, 24);

  return NextResponse.json({
    name: `Premium ${baseName}`,
    shortDescription: 'High-converting AI generated short copy for modern shoppers.',
    longDescription:
      'This product is generated from your uploaded images and optimized for ecommerce conversion. It includes persuasive benefits, features, and social-proof oriented wording.',
    seoTitle: `${baseName} | Buy Online`,
    seoMetaDescription: 'Shop premium quality with fast shipping and secure checkout.',
    price: 99,
    discountedPrice: 79,
    sku: randomId('SKU').toUpperCase(),
    actionItems: ['Highlight premium quality', 'Add lifestyle image', 'Run launch discount for 48 hours'],
    variants: [
      { id: randomId('var'), name: 'Size', value: 'M', stock: 25 },
      { id: randomId('var'), name: 'Color', value: 'Black', stock: 32 }
    ]
  });
}
