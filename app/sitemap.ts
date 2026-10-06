import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hadiramdhani.site'; // Ganti dengan domain asli Anda

  const routes = [
    '',
    '/tools',
    '/tools/diff-checker',
    '/tools/img-to-base64',
    '/tools/html-encoder',
    '/tools/image-resizer',
    '/tools/url-scanner',
    '/tools/ai-readme',
    '/tools/timestamp-converter',
    '/tools/base64-to-img',
    '/tools/regex-tester',
    '/tools/code-screenshot',
    '/tools/url-encoder',
    '/tools/text-counter',
    '/tools/color-converter',
    '/tools/ig-post-resizer',
    '/tools/social-resizer',
    '/tools/uuid-gen',
    '/tools/markdown-preview',
    '/tools/base64-tool',
    '/tools/json-formatter',
    '/tools/screenshot-beautifier',
    '/tools/format-converter',
    '/tools/malware-scanner',
    '/tools/css-minifier',
    '/tools/color-picker',
    '/tools/ip-lookup',
    '/tools/hash-gen',
    '/tools/palette-gen',
    '/tools/mac-lookup',
    '/tools/image-compressor',
    '/tools/image-rotator',
  ];

  const sitemapData = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return sitemapData;
}

