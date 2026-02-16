import { randomId } from './data';

type GenerateOptions = {
  images: string[];
  businessName?: string;
};

async function callPollinations(prompt: string): Promise<string> {
  const encoded = encodeURIComponent(prompt);
  const url = `https://text.pollinations.ai/${encoded}`;
  const response = await fetch(url, { method: 'GET' });

  if (!response.ok) {
    throw new Error(`Pollinations API failed with ${response.status}`);
  }

  const text = await response.text();
  return text.trim();
}

function deriveNameFromImage(imageUrl?: string): string {
  if (!imageUrl) {
    return 'Signature Product';
  }

  const token = imageUrl.split('/').pop()?.split('?')[0] ?? 'signature-item';
  return token.replace(/[-_]/g, ' ').replace(/\.[a-z]+$/i, '').slice(0, 28) || 'Signature Product';
}

export async function generateProductCopy(options: GenerateOptions) {
  const baseName = deriveNameFromImage(options.images[0]);
  const businessContext = options.businessName ? ` for ${options.businessName}` : '';

  try {
    const descriptionPrompt = [
      'You are an ecommerce conversion copywriter.',
      `Write a high-converting short product description${businessContext}.`,
      `Product hint: ${baseName}.`,
      'Tone: premium, concise, benefits-first.',
      'Keep under 28 words.'
    ].join(' ');

    const longPrompt = [
      'You are an ecommerce conversion copywriter.',
      `Write one persuasive long product description${businessContext}.`,
      `Product hint: ${baseName}.`,
      'Include benefits, trust, and urgency in 70-110 words.'
    ].join(' ');

    const seoPrompt = [
      'Create an SEO meta description for ecommerce.',
      `Product: ${baseName}.`,
      'Keep under 155 characters and include shopping intent.'
    ].join(' ');

    const [shortDescription, longDescription, seoMetaDescription] = await Promise.all([
      callPollinations(descriptionPrompt),
      callPollinations(longPrompt),
      callPollinations(seoPrompt)
    ]);

    return {
      name: `Premium ${baseName}`,
      shortDescription,
      longDescription,
      seoTitle: `${baseName} | Buy Online`,
      seoMetaDescription,
      price: 99,
      discountedPrice: 79,
      sku: randomId('SKU').toUpperCase(),
      actionItems: ['Highlight premium quality', 'Add lifestyle image', 'Run launch discount for 48 hours'],
      variants: [
        { id: randomId('var'), name: 'Size', value: 'M', stock: 25 },
        { id: randomId('var'), name: 'Color', value: 'Black', stock: 32 }
      ]
    };
  } catch {
    return {
      name: `Premium ${baseName}`,
      shortDescription: 'High-converting AI generated short copy for modern shoppers.',
      longDescription:
        'This product is generated from your uploaded images and optimized for ecommerce conversion. It includes persuasive benefits, features, and social-proof oriented wording.',
      seoTitle: `${baseName} | Buy Online`,
      seoMetaDescription: 'Shop premium quality with fast shipping and secure checkout.',
      price: 99,
      discountedPrice: 79,
      sku: randomId('SKU').toUpperCase(),
      actionItems: ['Highlight premium quality', 'Add lifestyle image', 'Run launch discount for 48 hours'],
      variants: [
        { id: randomId('var'), name: 'Size', value: 'M', stock: 25 },
        { id: randomId('var'), name: 'Color', value: 'Black', stock: 32 }
      ]
    };
  }
}

export async function regenerateField(options: GenerateOptions & { field: 'shortDescription' | 'seoMetaDescription' }) {
  const baseName = deriveNameFromImage(options.images[0]);

  try {
    if (options.field === 'shortDescription') {
      const value = await callPollinations(
        `Write a short premium ecommerce description for ${baseName}. Max 28 words. Benefits-first.`
      );
      return value;
    }

    const value = await callPollinations(
      `Write SEO meta description for ${baseName} ecommerce product under 155 characters with shopping intent.`
    );
    return value;
  } catch {
    if (options.field === 'shortDescription') {
      return `Elevate your style with ${baseName}, crafted for all-day comfort and premium feel.`;
    }

    return `Discover ${baseName} with secure checkout, fast delivery, and launch discounts.`;
  }
}
