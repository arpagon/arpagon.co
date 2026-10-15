// Single source of truth for public profile facts and UI copy.
// Pages, terminal mode, llms.txt, resume.json and JSON-LD are all generated from this file.
// Public site: only publishable facts belong here.

export const LOCALES = ['en', 'es', 'pt'] as const;
export type Locale = (typeof LOCALES)[number];
export type L10n = Record<Locale, string>;

export const UPDATED = '2026-10-14';

export const profile = {
  name: 'Sebastián Rojo',
  handle: '@arpagon',
  email: 'info@arpagon.co',
  url: 'https://arpagon.co',
  location: 'Medellín, Colombia',
  photo: '/media/me-480.webp',
  avatar: '/media/me-240.webp',
  links: [
    { label: 'GitHub', url: 'https://github.com/arpagon' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/arpagon/' },
    { label: 'X', url: 'https://x.com/arpagon' },
    { label: 'Hugging Face', url: 'https://huggingface.co/arpagon' },
    { label: 'Mastodon', url: 'https://mastodon.social/@arpagon' },
  ],
};

export const copy: Record<Locale, {
  htmlLang: string;
  role: string;
  tagline: string;
  description: string;
  about: string[];
  proof: string[];
  nav: { about: string; projects: string; writing: string; community: string; now: string };
  sections: { projects: string; writing: string; community: string; press: string; now: string; archive: string };
  allWriting: string;
  terminal: string;
  exitTerminal: string;
  email: string;
  now: string[];
  updated: string;
  machineNote?: string;
}> = {
  en: {
    htmlLang: 'en',
    role: 'Co-founder & CTO at Emilia AI',
    tagline: 'I build AI copilots for the physical world, and open-source tools for the agents that build them.',
    description: 'Sebastián Rojo builds AI copilots for the physical world: real-time video, computer vision and edge AI. Co-founder & CTO at Emilia AI.',
    about: [
      "For 15+ years I've built open-source real-time systems. In 2024 I co-founded Emilia AI, where the cameras, point-of-sale data and real-time signals restaurants already have turn into timely action for frontline teams, with humans in the loop.",
      "I wrote the first commit and most of the platform: real-time video ingestion and recording, computer vision and vision-language model pipelines, secure edge connectivity to cameras behind NAT, and the cloud platform on Kubernetes and AWS. In 2026 Emilia raised a US$1.5M pre-seed round led by Prosus Ventures, and we're now a team of 10.",
      "Before that I was open-source maintainer at Vocode (YC W23), founded WunderComm and ArtisanLabs, was CTO at RisePal, and spent 13 years as CTO of Sapian building open-source real-time communications. I organize the Supabase meetups in Medellín, and I've been part of the city's Linux and free-software community since the Asterisk days.",
    ],
    proof: ['15+ years in open source', 'ex-maintainer at Vocode (YC W23)', '13 years CTO at Sapian', 'Medellín, Colombia'],
    nav: { about: 'About', projects: 'Projects', writing: 'Writing', community: 'Community', now: 'Now' },
    sections: { projects: 'Projects', writing: 'Writing', community: 'Community', press: 'Press', now: 'Now', archive: 'Archive' },
    allWriting: 'All writing',
    terminal: 'terminal mode',
    exitTerminal: '[esc] exit terminal',
    email: 'Email',
    now: [
      'Building Emilia AI: copilots for restaurant frontline teams.',
      'Maintaining pi-rewind and bzz.',
      'Rebuilding this site and bringing back 15 years of writing (Asterisk, data analysis, ArtisanLabs).',
    ],
    updated: 'Updated',
  },
  es: {
    htmlLang: 'es',
    role: 'Cofundador y CTO de Emilia AI',
    tagline: 'Construyo copilotos de IA para el mundo físico, y herramientas open source para los agentes que los construyen.',
    description: 'Sebastián Rojo construye copilotos de IA para el mundo físico: video en tiempo real, visión por computadora e IA en el borde. Cofundador y CTO de Emilia AI.',
    about: [
      'Llevo más de 15 años construyendo sistemas open source en tiempo real. En 2024 cofundé Emilia AI, donde las cámaras, los datos del POS y las señales en tiempo real que ya tienen los restaurantes se convierten en acciones oportunas para los equipos de primera línea, con humanos en el ciclo.',
      'Escribí el primer commit y la mayor parte de la plataforma: ingesta y grabación de video en tiempo real, pipelines de visión por computadora y modelos visión-lenguaje, conectividad segura en el borde hacia cámaras detrás de NAT, y la plataforma cloud en Kubernetes y AWS. En 2026 Emilia levantó una ronda pre-seed de US$1.5M liderada por Prosus Ventures, y hoy somos un equipo de 10.',
      'Antes fui maintainer open source en Vocode (YC W23), fundé WunderComm y ArtisanLabs, fui CTO de RisePal y pasé 13 años como CTO de Sapian construyendo comunicaciones en tiempo real open source. Organizo los meetups de Supabase en Medellín, y hago parte de la comunidad Linux y de software libre de la ciudad desde los tiempos de Asterisk.',
    ],
    proof: ['15+ años en open source', 'ex-maintainer en Vocode (YC W23)', '13 años CTO de Sapian', 'Medellín, Colombia'],
    nav: { about: 'Sobre mí', projects: 'Proyectos', writing: 'Escritos', community: 'Comunidad', now: 'Ahora' },
    sections: { projects: 'Proyectos', writing: 'Escritos', community: 'Comunidad', press: 'Prensa', now: 'Ahora', archive: 'Archivo' },
    allWriting: 'Todos los escritos',
    terminal: 'modo terminal',
    exitTerminal: '[esc] salir de la terminal',
    email: 'Correo',
    now: [
      'Construyendo Emilia AI: copilotos para equipos de primera línea en restaurantes.',
      'Manteniendo pi-rewind y bzz.',
      'Reconstruyendo este sitio y recuperando 15 años de escritos (Asterisk, análisis de datos, ArtisanLabs).',
    ],
    updated: 'Actualizado',
  },
  pt: {
    htmlLang: 'pt-BR',
    role: 'Cofundador e CTO da Emilia AI',
    tagline: 'Construo copilotos de IA para o mundo físico, e ferramentas open source para os agentes que os constroem.',
    description: 'Sebastián Rojo constrói copilotos de IA para o mundo físico: vídeo em tempo real, visão computacional e IA na borda. Cofundador e CTO da Emilia AI.',
    about: [
      'Há mais de 15 anos construo sistemas open source em tempo real. Em 2024 cofundei a Emilia AI, onde as câmeras, os dados do PDV e os sinais em tempo real que os restaurantes já têm se transformam em ações oportunas para as equipes da linha de frente, com humanos no circuito.',
      'Escrevi o primeiro commit e a maior parte da plataforma: ingestão e gravação de vídeo em tempo real, pipelines de visão computacional e modelos de visão-linguagem, conectividade segura na borda com câmeras atrás de NAT, e a plataforma em nuvem com Kubernetes e AWS. Em 2026 a Emilia captou uma rodada pre-seed de US$1,5M liderada pela Prosus Ventures, e hoje somos um time de 10 pessoas.',
      'Antes fui maintainer open source na Vocode (YC W23), fundei a WunderComm e a ArtisanLabs, fui CTO da RisePal e passei 13 anos como CTO da Sapian construindo comunicações em tempo real open source. Organizo os meetups de Supabase em Medellín e faço parte da comunidade Linux e de software livre da cidade desde a época do Asterisk.',
    ],
    proof: ['15+ anos em open source', 'ex-maintainer na Vocode (YC W23)', '13 anos CTO da Sapian', 'Medellín, Colômbia'],
    nav: { about: 'Sobre', projects: 'Projetos', writing: 'Textos', community: 'Comunidade', now: 'Agora' },
    sections: { projects: 'Projetos', writing: 'Textos', community: 'Comunidade', press: 'Imprensa', now: 'Agora', archive: 'Arquivo' },
    allWriting: 'Todos os textos',
    terminal: 'modo terminal',
    exitTerminal: '[esc] sair do terminal',
    email: 'E-mail',
    now: [
      'Construindo a Emilia AI: copilotos para equipes da linha de frente em restaurantes.',
      'Mantendo o pi-rewind e o bzz.',
      'Reconstruindo este site e recuperando 15 anos de textos (Asterisk, análise de dados, ArtisanLabs).',
    ],
    updated: 'Atualizado',
    machineNote: 'Esta página foi traduzida automaticamente do inglês.',
  },
};

export type Project = {
  name: string;
  status: 'active' | 'past';
  period: string;
  url: string;
  role: L10n;
  desc: L10n;
  tags: string[];
};

export const projects: Project[] = [
  {
    name: 'Emilia AI', status: 'active', period: '2024 →', url: 'https://emiliavision.com',
    role: { en: 'Co-founder & CTO', es: 'Cofundador y CTO', pt: 'Cofundador e CTO' },
    desc: {
      en: 'AI copilots for restaurant frontline teams: cameras, POS data and humans in the loop. Real-time video, computer vision, VLMs and edge connectivity.',
      es: 'Copilotos de IA para equipos de primera línea en restaurantes: cámaras, datos del POS y humanos en el ciclo. Video en tiempo real, visión por computadora, VLMs y conectividad en el borde.',
      pt: 'Copilotos de IA para equipes da linha de frente em restaurantes: câmeras, dados do PDV e humanos no circuito. Vídeo em tempo real, visão computacional, VLMs e conectividade na borda.',
    },
    tags: ['computer vision', 'VLM', 'GStreamer', 'edge', 'Kubernetes', 'AWS'],
  },
  {
    name: 'pi-rewind', status: 'active', period: '2026 →', url: 'https://arpagon.github.io/pi-rewind/',
    role: { en: 'Author', es: 'Autor', pt: 'Autor' },
    desc: {
      en: 'Checkpoint and rewind for the Pi coding agent: roll files and conversation back to any earlier point.',
      es: 'Checkpoints y rewind para el agente de código Pi: devuelve archivos y conversación a cualquier punto anterior.',
      pt: 'Checkpoints e rewind para o agente de código Pi: volte arquivos e conversa para qualquer ponto anterior.',
    },
    tags: ['AI agents', 'TypeScript', 'open source'],
  },
  {
    name: 'bzz', status: 'active', period: '2026 →', url: 'https://getbzz.dev',
    role: { en: 'Author', es: 'Autor', pt: 'Autor' },
    desc: {
      en: 'A human-first terminal client for Buzz: fast keyboard navigation, local offline history, native Nostr authentication.',
      es: 'Un cliente de terminal para Buzz pensado para humanos: navegación rápida con teclado, historial local offline y autenticación nativa con Nostr.',
      pt: 'Um cliente de terminal para o Buzz pensado para humanos: navegação rápida pelo teclado, histórico local offline e autenticação nativa com Nostr.',
    },
    tags: ['Rust', 'TUI', 'Nostr'],
  },
  {
    name: 'Vocode (YC W23)', status: 'past', period: '2023–2024', url: 'https://github.com/vocodedev/vocode-core',
    role: { en: 'Open-source maintainer', es: 'Maintainer open source', pt: 'Maintainer open source' },
    desc: {
      en: 'Maintainer of the open-source voice-AI framework: Pydantic v2 support, OpenAI upgrades, CI, docs and a voice-RAG demo; community and events.',
      es: 'Maintainer del framework open source de IA de voz: soporte para Pydantic v2, upgrades de OpenAI, CI, documentación y un demo de RAG por voz; comunidad y eventos.',
      pt: 'Maintainer do framework open source de IA de voz: suporte a Pydantic v2, upgrades da OpenAI, CI, documentação e uma demo de RAG por voz; comunidade e eventos.',
    },
    tags: ['voice AI', 'LLM', 'Python'],
  },
  {
    name: 'Sapian', status: 'past', period: '2009–2022', url: 'https://github.com/sapianco',
    role: { en: 'CTO', es: 'CTO', pt: 'CTO' },
    desc: {
      en: '13 years building open-source real-time communications: cloud call center, corporate voice, WebRTC and SIP. Grew ARR by US$374K and cut latency 30% with a hybrid-cloud RTC stack.',
      es: '13 años construyendo comunicaciones en tiempo real open source: call center en la nube, voz corporativa, WebRTC y SIP. Creció el ARR en US$374K y redujo la latencia 30% con un stack RTC de nube híbrida.',
      pt: '13 anos construindo comunicações em tempo real open source: call center em nuvem, voz corporativa, WebRTC e SIP. Aumentou o ARR em US$374K e reduziu a latência em 30% com um stack RTC de nuvem híbrida.',
    },
    tags: ['WebRTC', 'SIP', 'Asterisk', 'Kubernetes'],
  },
  {
    name: 'whisper-large-v2-es', status: 'past', period: '2022', url: 'https://huggingface.co/arpagon/whisper-large-v2-es',
    role: { en: 'Author', es: 'Autor', pt: 'Autor' },
    desc: {
      en: 'Whisper large-v2 fine-tuned for Spanish at the Hugging Face × Lambda community event. WER 5.29 on Common Voice 11 (es).',
      es: 'Whisper large-v2 ajustado para español en el evento comunitario de Hugging Face × Lambda. WER 5.29 en Common Voice 11 (es).',
      pt: 'Whisper large-v2 ajustado para espanhol no evento comunitário Hugging Face × Lambda. WER 5,29 no Common Voice 11 (es).',
    },
    tags: ['ASR', 'Whisper', 'Hugging Face'],
  },
];

export const community: { date: string; text: L10n; url?: string }[] = [
  { date: '2025-04-22', text: { en: 'Organizer · LW14 Supabase Meetup Medellín (Supabase + v0 + MCP)', es: 'Organizador · LW14 Supabase Meetup Medellín (Supabase + v0 + MCP)', pt: 'Organizador · LW14 Supabase Meetup Medellín (Supabase + v0 + MCP)' } },
  { date: '2024-12-03', text: { en: 'Organizer · LW13 Supabase Meetup Medellín (Elixir & Realtime)', es: 'Organizador · LW13 Supabase Meetup Medellín (Elixir y Realtime)', pt: 'Organizador · LW13 Supabase Meetup Medellín (Elixir e Realtime)' } },
  { date: '2024-08-12', text: { en: 'Organizer · Supabase Meetup Medellín (Postgres, realtime, auth, storage)', es: 'Organizador · Supabase Meetup Medellín (Postgres, realtime, auth, storage)', pt: 'Organizador · Supabase Meetup Medellín (Postgres, realtime, auth, storage)' } },
  { date: '2024', text: { en: 'Speaker · UbuConLA 2024: fully open-source conversational AI on Linux', es: 'Speaker · UbuConLA 2024: IA conversacional 100% open source en Linux', pt: 'Palestrante · UbuConLA 2024: IA conversacional 100% open source no Linux' } },
  { date: '', text: { en: "Long-time member of Medellín's Linux & free-software community", es: 'Parte desde hace años de la comunidad Linux y de software libre de Medellín', pt: 'Membro de longa data da comunidade Linux e de software livre de Medellín' } },
];

export const press = [
  { date: '2026-09', outlet: 'Prosus', title: 'Emilia AI raises $1.5M led by Prosus Ventures', url: 'https://www.prosus.com/news-insights/2026/emilia-ai-raises-dollars-1-point-5-m-led-by-prosus-ventures' },
  { date: '2026-09', outlet: 'The Intelligent', title: 'Startup colombiana Emilia AI logra US$1,5 millones en ronda pre-seed', url: 'https://theintelligent.com.co/tecnologia/2026/startup-colombiana-emilia-ai-logra-15-millones-de-dolares-en-ronda-pre-seed-para' },
];

// Imported series. Counts are pages in their original languages, not unique essays.
export const archive = [
  { id: 'artisanlabs', period: '2023', title: 'ArtisanLabs Tech Blog', count: 5, lang: 'EN/ES', url: '/writing/#artisanlabs', originalUrl: 'https://blog.artisanlabs.io/' },
  { id: 'data-analysis', period: '2015–2016', title: 'Arpagon Data Analysis', count: 17, lang: 'EN/ES', url: '/writing/#data-analysis', originalUrl: 'https://arpagondata.tumblr.com/' },
  { id: 'medellin-asterisk', period: '2008–2009', title: 'Medellín Asterisk', count: 17, lang: 'ES', url: '/writing/#medellin-asterisk', originalUrl: 'https://medellinasterisk.blogspot.com/' },
];

export const homePath = (l: Locale) => (l === 'en' ? '/' : `/${l}/`);

// Work history for /resume.json (JSON Resume v1). Public facts only.
export const work = [
  { name: 'Emilia AI', position: 'Co-founder & CTO', url: 'https://emiliavision.com', startDate: '2024-06',
    summary: 'AI copilots for the physical world: real-time video, computer vision, VLMs, edge connectivity and cloud platform for restaurant frontline teams.',
    highlights: ['Wrote the first commit and most of the platform', 'Led the migration from GCP/GKE to AWS', 'US$1.5M pre-seed led by Prosus Ventures (2026)', 'Grew the team to 10'] },
  { name: 'Vocode (YC W23)', position: 'Open Source Maintainer', url: 'https://github.com/vocodedev/vocode-core', startDate: '2023-12', endDate: '2024-09',
    summary: 'Community and maintenance of the open-source voice-AI framework.', highlights: ['15 merged PRs: Pydantic v2, OpenAI upgrades, CI, docs, voice-RAG demo', 'Speaker at UbuConLA 2024'] },
  { name: 'ArtisanLabs', position: 'Founder', url: 'https://blog.artisanlabs.io', startDate: '2023-05', endDate: '2024-06',
    summary: 'Generative AI and real-time voice for workplace coaching.', highlights: ['AI coaching at 150x lower cost than average coaching'] },
  { name: 'RisePal', position: 'CTO', startDate: '2023-03', endDate: '2023-10',
    summary: 'Led Arouse, an AI career assistant (LangChain, pgvector), and designed all infrastructure (Kubernetes, GCP, Terraform, FastAPI).', highlights: [] },
  { name: 'WunderComm', position: 'Founder, CEO & CTO', startDate: '2021-11', endDate: '2024-01',
    summary: 'Conversation CRM for small businesses on Matrix, WhatsApp and AI.', highlights: [] },
  { name: 'Sapian', position: 'CTO', url: 'https://github.com/sapianco', startDate: '2009-10', endDate: '2022-06',
    summary: 'Built and led the team behind open-source real-time communication products: cloud call center, corporate voice, WebRTC, SIP.',
    highlights: ['Grew ARR by US$374K', 'Exceeded organizational goals by 20%', 'Cut latency 30% with a hybrid-cloud RTC solution'] },
  { name: 'dataware sistemas', position: 'Telecommunications Specialist', startDate: '2007-06', endDate: '2009-09', summary: 'Telecom and unified communications projects.', highlights: [] },
  { name: 'uniredes', position: 'Telecommunications Engineer', startDate: '2007-01', endDate: '2007-06', summary: 'Telecom projects.', highlights: [] },
];
