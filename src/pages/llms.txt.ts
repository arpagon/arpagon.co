import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { profile, copy, projects, UPDATED } from '../data/profile';
import { demos } from '../data/demos';
// https://llmstxt.org/
export const GET: APIRoute = async () => {
  const posts = (await getCollection('writing', (p) => !p.data.draft)).sort((a, b) => +b.data.date - +a.data.date);
  const t = copy.en;
  const body = [
    `# ${profile.name}`,
    '',
    `> ${t.role}. ${t.tagline} Based in ${profile.location}. Updated ${UPDATED}.`,
    '',
    'Personal site of Sebastián Rojo (@arpagon). Public facts only; for anything not listed here, ask him directly.',
    '',
    '## Profile',
    `- [Profile (markdown)](https://arpagon.co/index.md): about, projects, community, press, writing`,
    `- [Résumé (JSON Resume)](https://arpagon.co/resume.json): structured work history`,
    `- [Home (EN)](https://arpagon.co/) · [ES](https://arpagon.co/es/) · [PT, machine-translated](https://arpagon.co/pt/)`,
    '',
    '## Projects',
    ...projects.map((p) => `- [${p.name}](${p.url}): ${p.desc.en}`),
    '',
    `- [Pi extensions](https://arpagon.co/pi/): pi-rewind, pi-animations, pi-context-zone, pi-worktree-tui-status, pi-web-providers-codex-cf, pi-web-providers-az-cf`,
    `- [Demos](https://arpagon.co/demos/): ${demos.length} demo cards with public descriptions; edited Emilia editions require a personal viewing link, while original recordings require separate approval`,
    '',
    '## Writing',
    ...posts.map((p) => `- [${p.data.title}](https://arpagon.co/writing/${p.id}.md): ${p.data.description}`),
    '',
    '## Optional',
    `- [RSS](https://arpagon.co/rss.xml)`,
    ...profile.links.map((l) => `- [${l.label}](${l.url})`),
    `- Contact: ${profile.email}`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
