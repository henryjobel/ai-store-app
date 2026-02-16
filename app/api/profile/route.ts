import { NextRequest, NextResponse } from 'next/server';
import { users } from '@/lib/data';

export async function GET() {
  return NextResponse.json(users[0]);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  users[0] = { ...users[0], ...body };
  return NextResponse.json(users[0]);
}
