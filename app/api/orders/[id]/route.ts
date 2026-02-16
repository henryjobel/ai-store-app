import { NextRequest, NextResponse } from 'next/server';
import { orders } from '@/lib/data';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const index = orders.findIndex((item) => item.id === params.id);

  if (index === -1) {
    return NextResponse.json({ message: 'Order not found' }, { status: 404 });
  }

  orders[index] = { ...orders[index], ...body };
  return NextResponse.json(orders[index]);
}
