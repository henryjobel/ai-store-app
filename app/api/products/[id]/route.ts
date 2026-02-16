import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/lib/data';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const index = products.findIndex((item) => item.id === params.id);

  if (index === -1) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }

  products[index] = { ...products[index], ...body };
  return NextResponse.json(products[index]);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const index = products.findIndex((item) => item.id === params.id);

  if (index === -1) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }

  const [removed] = products.splice(index, 1);
  return NextResponse.json(removed);
}
