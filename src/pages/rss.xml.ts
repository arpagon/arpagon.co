import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
export async function GET(context: APIContext) {
  const posts = (await getCollection('writing', (p) => !p.data.draft)).sort((a, b) => +b.data.date - +a.data.date);
  return rss({
    title: 'Sebastián Rojo — Writing',
    description: 'Notes and essays by Sebastián Rojo (@arpagon).',
    site: context.site!,
    items: posts.map((p) => ({ title: p.data.title, pubDate: p.data.date, description: p.data.description, link: `/writing/${p.id}/` })),
  });
}
