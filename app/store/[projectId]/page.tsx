import { notFound } from 'next/navigation';
import { StorefrontClient } from '@/components/storefront-client';
import { products, projects } from '@/lib/data';

export default function StorefrontPage({ params }: { params: { projectId: string } }) {
  const project = projects.find((item) => item.id === params.projectId);
  if (!project) {
    notFound();
  }

  const projectProducts = products.filter((product) => project.products.includes(product.id));
  return <StorefrontClient businessName={project.businessName} products={projectProducts} />;
}
