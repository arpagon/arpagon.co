import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
export async function getStaticPaths() {
  const posts = await getCollection('writing', (p) => !p.data.draft);
  return posts.map((p) => ({ params: { id: p.id }, props: { post: p } }));
}
export const GET: APIRoute = ({ props }) => {
  const { post } = props as any;
  const head = `# ${post.data.title}\n\n_${post.data.date.toISOString().slice(0, 10)} · Sebastián Rojo · https://arpagon.co/writing/${post.id}/_\n\n`;
  return new Response(head + (post.body ?? ''), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
