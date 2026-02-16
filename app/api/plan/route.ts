import { NextRequest, NextResponse } from 'next/server';
import { getProjectPlan } from '@/lib/data';

export async function GET(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get('projectId') ?? undefined;
  return NextResponse.json(getProjectPlan(projectId));
}
