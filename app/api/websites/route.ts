import { NextRequest, NextResponse } from 'next/server';
import { defaultSections, projects, randomId, websites } from '@/lib/data';
import { Website } from '@/lib/types';

export async function GET() {
  return NextResponse.json(websites);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const project = projects.find((item) => item.id === body.projectId);

  if (!project) {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }

  const website: Website = {
    id: randomId('site'),
    projectId: project.id,
    theme: body.theme ?? project.theme,
    sections: defaultSections(body.theme ?? project.theme, project.businessName),
    generatedAt: new Date().toISOString(),
    subdomain: `${project.businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.storebuilder.app`
  };

  websites.push(website);
  project.websiteId = website.id;
  return NextResponse.json(website, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const website = websites.find((item) => item.id === body.websiteId);

  if (!website) {
    return NextResponse.json({ message: 'Website not found' }, { status: 404 });
  }

  if (body.prompt && body.sectionId) {
    const section = website.sections.find((item) => item.id === body.sectionId);
    if (!section) {
      return NextResponse.json({ message: 'Section not found' }, { status: 404 });
    }

    section.body = `${section.body} ${body.prompt}`.slice(0, 220);

    if (/rounded/i.test(body.prompt)) {
      section.roundedButtons = true;
    }

    if (/black|dark/i.test(body.prompt)) {
      section.buttonColor = '#111827';
    }

    if (/spacing/i.test(body.prompt)) {
      section.spacing = 'relaxed';
    }
  }

  if (body.publish) {
    website.publishedAt = new Date().toISOString();
    website.customDomain = body.customDomain;
    const project = projects.find((item) => item.id === website.projectId);
    if (project) {
      project.published = true;
      project.customDomain = body.customDomain;
    }
  }

  return NextResponse.json(website);
}
