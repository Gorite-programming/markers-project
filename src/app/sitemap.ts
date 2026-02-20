// src/app/sitemap.ts
import { MetadataRoute } from 'next'

export const revalidate = 0  // ← これ追加！キャッシュさせない

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://markers-project.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://markers-project.vercel.app/ja',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://markers-project.vercel.app/en',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ]
}