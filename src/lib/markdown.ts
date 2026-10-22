import { profile, copy, projects, community, press, archive, UPDATED } from '../data/profile';
import { demos } from '../data/demos';

/** Markdown profile used by /index.md and llms-full context. English, public facts only. */
export function profileMarkdown(posts: { id: string; data: { title: string; date: Date } }[]) {
  const t = copy.en;
  return [
    `# ${profile.name} (${profile.handle})`,
    '',
    `> ${t.role}. ${t.tagline}`,
    '',
    `Location: ${profile.location} · Email: ${profile.email} · Updated: ${UPDATED}`,
    '',
    '## About',
    ...t.about.flatMap((p) => [p, '']),
    '## Projects',
    ...projects.map((p) => `- [${p.name}](${p.url}) (${p.period}, ${p.role.en}): ${p.desc.en}`),
    '',
    '## Demos',
    `Videos at https://arpagon.co/demos/. Emilia product demos show real customer deployments: descriptions are public, videos are shared privately on request.`,
    ...demos.map((d) => `- ${d.i18n.en.title}${d.company ? ` (${d.company})` : d.year ? ` (${d.year})` : ''}: ${d.i18n.en.description} Role: ${d.i18n.en.role}${d.visibility === 'privado' ? ' [private video]' : ''}`),
    '',
    '## Community',
    ...community.map((c) => `- ${c.date ? c.date + ': ' : ''}${c.text.en}`),
    '',
    '## Press',
    ...press.map((p) => `- [${p.title}](${p.url}) (${p.outlet}, ${p.date})`),
    '',
    '## Writing',
    ...posts.map((p) => `- [${p.data.title}](https://arpagon.co/writing/${p.id}/) (${p.data.date.toISOString().slice(0, 10)}; markdown: https://arpagon.co/writing/${p.id}.md)`),
    ...archive.map((a) => `- [${a.title}](https://arpagon.co${a.url}) (${a.period}, ${a.count} pages, ${a.lang}; original: ${a.originalUrl})`),
    '',
    '## Elsewhere',
    ...profile.links.map((l) => `- [${l.label}](${l.url})`),
    '',
  ].join('\n');
}
