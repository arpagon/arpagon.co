import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
export async function getStaticPaths() {
  const posts = await getCollection('writing', (p) => !p.data.draft);
  return posts.map((p) => ({ params: { id: p.id }, props: { post: p } }));
}
export const GET: APIRoute = async ({ props }) => {
  const { post } = props as any;
  const translations = post.data.translationKey
    ? (await getCollection('writing', (p) => !p.data.draft && p.data.translationKey === post.data.translationKey))
        .map((p) => `[${p.data.lang.toUpperCase()}](https://arpagon.co/writing/${p.id}.md)`).join(' · ')
    : '';
  const head = [
    `# ${post.data.title}`, '',
    `_${post.data.date.toISOString().slice(0, 10)} · Sebastián Rojo · ${post.data.lang.toUpperCase()} · https://arpagon.co/writing/${post.id}/_`, '',
    ...(post.data.originalUrl ? [`Originally published: ${post.data.originalUrl}`, 'Historical archive; software and advice reflect the original publication date.', ''] : []),
    ...(translations ? [`Translations: ${translations}`, ''] : []),
  ].join('\n');
  return new Response(head + '\n' + (post.body ?? ''), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
