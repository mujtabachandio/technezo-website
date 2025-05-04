// app/storage/[slug]/page.tsx
import { notFound } from 'next/navigation';
import client from '@/sanity/lib/client';
import ProductClient from './ProductClient';

export const revalidate = 60; // ISR: re-fetch every 60s

// 1. Tell Next.js which slugs to prerender
export async function generateStaticParams() {
  const query = `*[_type == "storage"]{ "slug": slug.current }`;
  const products = await client.fetch<{ slug: string }[]>(query);
  return products.map((p) => ({ slug: p.slug }));
}

async function fetchProduct(slug: string) {
  const query = `*[_type=="storage" && slug.current==$slug][0]{
    _id, title, brand, type, capacity, interface,
    readSpeed, writeSpeed, price, inStock, stockQuantity,
    description,
    "image": { "asset": { "url": image.asset->url } },
    slug
  }`;
  return client.fetch<any>(query, { slug });
}

async function fetchRelated(type: string, brand: string, slug: string) {
  const relatedQuery = `*[_type=="storage" 
    && (type==$type || brand==$brand)
    && slug.current != $slug][0...4]{
      _id, title, brand, type, capacity, interface,
      readSpeed, writeSpeed, price, inStock,
      "image": { "asset": { "url": image.asset->url } },
      slug
  }`;
  return client.fetch<any[]>(relatedQuery, { type, brand, slug });
}

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await fetchProduct(params.slug);
  if (!product) return notFound();

  const related = await fetchRelated(
    product.type,
    product.brand,
    params.slug
  );

  return <ProductClient product={product} relatedProducts={related} />;
}
