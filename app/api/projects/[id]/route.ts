import { NextRequest, NextResponse } from 'next/server';
import { projects } from '@/lib/data';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const index = projects.findIndex((item) => item.id === params.id);

  if (index === -1) {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }

  projects[index] = { ...projects[index], ...body };
  return NextResponse.json(projects[index]);
}
