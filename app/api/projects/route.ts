import { NextRequest, NextResponse } from 'next/server';
import { projects, randomId } from '@/lib/data';
import { Project } from '@/lib/types';

export async function GET() {
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<Project>;
  const project: Project = {
    id: randomId('proj'),
    businessName: body.businessName ?? 'My AI Store',
    theme: body.theme ?? 'modern',
    products: body.products ?? [],
    published: false,
    customDomain: body.customDomain
  };

  projects.push(project);
  return NextResponse.json(project, { status: 201 });
}
