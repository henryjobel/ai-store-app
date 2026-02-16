import { NextRequest, NextResponse } from 'next/server';
import { products, randomId } from '@/lib/data';
import { Product } from '@/lib/types';

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<Product>;
  const product: Product = {
    id: randomId('prod'),
    name: body.name ?? 'Untitled product',
    shortDescription: body.shortDescription ?? '',
    longDescription: body.longDescription ?? '',
    seoTitle: body.seoTitle ?? '',
    seoMetaDescription: body.seoMetaDescription ?? '',
    price: body.price ?? 0,
    discountedPrice: body.discountedPrice,
    sku: body.sku ?? randomId('sku').toUpperCase(),
    images: body.images ?? [],
    variants: body.variants ?? [],
    stockTracking: body.stockTracking ?? true,
    reviewsEnabled: body.reviewsEnabled ?? true,
    status: body.status ?? 'draft',
    actionItems: body.actionItems ?? []
  };
  products.push(product);
  return NextResponse.json(product, { status: 201 });
}
