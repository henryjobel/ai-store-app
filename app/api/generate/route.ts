import { NextRequest, NextResponse } from 'next/server';
import { generateProductCopy, regenerateField } from '@/lib/ai';

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.field === 'shortDescription' || body.field === 'seoMetaDescription') {
    const value = await regenerateField({
      images: body.images ?? [],
      field: body.field,
      businessName: body.businessName
    });

    return NextResponse.json({ value });
  }

  const product = await generateProductCopy({
    images: body.images ?? [],
    businessName: body.businessName
  });

  return NextResponse.json(product);
}
