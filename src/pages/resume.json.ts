import type { APIRoute } from 'astro';
import { profile, copy, work, projects, UPDATED } from '../data/profile';
// https://jsonresume.org/schema
export const GET: APIRoute = () => {
  const resume = {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: profile.name, label: copy.en.role, image: `${profile.url}${profile.photo}`, email: profile.email, url: profile.url,
      summary: copy.en.about.join(' '),
      location: { city: 'Medellín', countryCode: 'CO' },
      profiles: profile.links.map((l) => ({ network: l.label, url: l.url, username: 'arpagon' })),
    },
    work,
    education: [{ institution: 'Universidad Santo Tomás', area: 'Telecommunications Engineering', studyType: 'Engineering', startDate: '2001', endDate: '2006' }],
    skills: [
      { name: 'Real-time video', keywords: ['GStreamer', 'RTSP', 'MediaMTX', 'FFmpeg', 'WebRTC'] },
      { name: 'AI / computer vision', keywords: ['YOLO', 'RF-DETR', 'VLMs', 'LLMs', 'Whisper', 'voice agents', 'RAG'] },
      { name: 'Infrastructure', keywords: ['Kubernetes', 'AWS', 'GCP', 'Terraform', 'Docker', 'Prometheus', 'Grafana', 'OpenTelemetry'] },
      { name: 'Backend & data', keywords: ['Python', 'FastAPI', 'ClickHouse', 'PostgreSQL', 'NATS', 'Supabase'] },
      { name: 'Edge & networking', keywords: ['Go', 'Rust', 'NAT traversal', 'SIP', 'Asterisk', 'FreeSWITCH', 'Matrix'] },
      { name: 'AI-agent engineering', keywords: ['AGENTS.md', 'agent skills', 'Pi coding agent'] },
    ],
    languages: [{ language: 'Spanish', fluency: 'Native' }, { language: 'English', fluency: 'Professional' }],
    projects: projects.map((p) => ({ name: p.name, description: p.desc.en, url: p.url, roles: [p.role.en], keywords: p.tags })),
    meta: { canonical: `${profile.url}/resume.json`, version: 'v1.0.0', lastModified: UPDATED },
  };
  return new Response(JSON.stringify(resume, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
