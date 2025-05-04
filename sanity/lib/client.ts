// lib/sanity.ts
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

 const client = createClient({
  projectId: 'ey5yyr2p',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
}) 
export default client
const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)
