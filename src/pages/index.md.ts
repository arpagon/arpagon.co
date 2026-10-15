import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { profileMarkdown } from '../lib/markdown';
export const GET: APIRoute = async () => {
  const posts = (await getCollection('writing', (p) => !p.data.draft)).sort((a, b) => +b.data.date - +a.data.date);
  return new Response(profileMarkdown(posts), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
