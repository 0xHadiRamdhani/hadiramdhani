import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://hadiramdhani.site'; // Ganti dengan domain asli Anda

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Sesuaikan jika ada route yang tidak ingin diindex
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

