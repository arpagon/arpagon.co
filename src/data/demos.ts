// Demo library: public cards (generated, see demos.json) and UI copy in EN/ES/PT.
// demos.json is exported from the private review workspace and contains ONLY the approved public
// layer: no customers, places or metrics. Private videos and their private notes are served by the
// arpagon-demos-vault Worker to approved visitors (personal, expiring links).
import data from './demos.json';
import type { Locale } from './profile';

export type DemoText = { title: string; description: string; stack: string[]; role: string; credit?: string };
export type Demo = {
  id: string;
  category: string;
  visibility: 'publico' | 'enlace-externo' | 'privado';
  company: string | null;
  year: string | null;
  duration: string;
  credit_url: string | null;
  original_urls: string[];
  videos: { src: string; width: number; height: number }[];
  poster: string | null;
  i18n: Record<'es' | 'en' | 'pt', DemoText>;
};

export const demos = data.demos as Demo[];
export const categories = data.categories as Record<string, Record<Locale, string>>;

// Emilia product demos first, then open source and experiments.
export const GROUPS: { id: 'emilia' | 'open'; categories: string[] }[] = [
  { id: 'emilia', categories: ['video-pos', 'vision-multimodal', 'voz-audio', 'operaciones', 'configuracion'] },
  { id: 'open', categories: ['agentes', 'voz-conversacional', 'ia-generativa', 'edge-ai'] },
];

export const demosPath = (l: Locale, page: '' | 'acceso/' | 'privado/' = '') => `${l === 'en' ? '' : `/${l}`}/demos/${page}`;

export const TURNSTILE_SITE_KEY: string = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? '0x4AAAAAAFf_Gu64dBDI_MKb';

export const demosCopy: Record<Locale, {
  title: string; description: string; kicker: string; h1: string; h1em: string; lede: string;
  stats: (all: number, open: number, priv: number) => string;
  groups: Record<'emilia' | 'open', { title: string; blurb: string }>;
  role: string; watch: string; watchOn: string; credit: string; video: string; videos: string;
  privateBadge: string; privateBox: string; request: string; haveAccess: string;
  access: {
    title: string; h1: string; lede: string; name: string; email: string; company: string; reason: string; submit: string; back: string;
    states: Record<'enviado' | 'captcha' | 'email' | 'name' | 'reason' | 'send' | 'expirado' | 'sesion', string>;
    sentTitle: string; privacy: string;
  };
  library: { title: string; h1: string; loading: string; shared: (email: string, until: string) => string; signOut: string; note: string; empty: string };
}> = {
  en: {
    title: 'Demos', description: 'Demos by Sebastián Rojo: computer vision and voice AI at the point of sale (Emilia AI), coding-agent tools, conversational voice AI and generative AI experiments.',
    kicker: '❯ demos', h1: 'Things I built,', h1em: 'on video.',
    lede: 'Public demos play right here. Demos of Emilia products running at real customers are private: their descriptions are public and the videos are shared personally, on request.',
    stats: (all, open, priv) => `${all} demos · ${open} public videos · ${priv} private`,
    groups: {
      emilia: { title: 'Emilia AI · vision and voice at the point of sale', blurb: 'Products I designed at Emilia AI, from proof of concept to production. The videos show real customer deployments, so they are private.' },
      open: { title: 'Open source and experiments', blurb: 'Coding-agent tools, conversational voice AI and generative AI experiments, most of them first shared on X.' },
    },
    role: 'Role', watch: 'Watch', watchOn: 'Watch on X ↗', credit: 'Credit', video: 'video', videos: 'videos',
    privateBadge: 'Private video', privateBox: 'Real customer deployment. Shared personally on request.',
    request: 'Request access →', haveAccess: 'Already have access? Open the library →',
    access: {
      title: 'Request access', h1: 'Private demo library',
      lede: 'Some demos show real customer deployments, so their videos are shared privately. Tell me who you are: I review every request personally and, if approved, send you a personal link that expires on its own.',
      name: 'Name', email: 'Email', company: 'Company (optional)', reason: 'Why would you like access?', submit: 'Request access', back: '← All demos',
      states: {
        enviado: 'Thanks. If your request is approved you will receive a personal link by email.',
        captcha: 'The anti-bot check failed. Please try again.', email: 'Please enter a valid email address.', name: 'Please enter your name.',
        reason: 'Please tell me briefly why you would like access.', send: 'The request could not be delivered right now. Please email info@arpagon.co instead.',
        expirado: 'That access link is no longer valid. You can request access again.', sesion: 'Your session ended or you do not have access yet.',
      },
      sentTitle: 'Request sent', privacy: 'Your details are only used to review this request.',
    },
    library: {
      title: 'Private demos', h1: 'Private demo library', loading: 'Loading…',
      shared: (email, until) => `Shared personally with ${email} until ${until}. Please don't redistribute these videos: they show real customer deployments.`,
      signOut: 'Sign out', note: 'Private', empty: 'No private demos yet.',
    },
  },
  es: {
    title: 'Demos', description: 'Demos de Sebastián Rojo: visión por computador y voz con IA en el punto de venta (Emilia AI), herramientas para agentes de código, IA conversacional de voz e IA generativa.',
    kicker: '❯ demos', h1: 'Lo que he construido,', h1em: 'en video.',
    lede: 'Los demos públicos se ven aquí mismo. Los de productos de Emilia funcionando en clientes reales son privados: su descripción es pública y los videos se comparten de forma personal, a pedido.',
    stats: (all, open, priv) => `${all} demos · ${open} videos públicos · ${priv} privados`,
    groups: {
      emilia: { title: 'Emilia AI · visión y voz en el punto de venta', blurb: 'Productos que diseñé en Emilia AI, de la prueba de concepto a producción. Los videos muestran despliegues reales en clientes, por eso son privados.' },
      open: { title: 'Open source y experimentos', blurb: 'Herramientas para agentes de código, IA conversacional de voz y experimentos de IA generativa, la mayoría compartidos primero en X.' },
    },
    role: 'Rol', watch: 'Ver', watchOn: 'Ver en X ↗', credit: 'Crédito', video: 'video', videos: 'videos',
    privateBadge: 'Video privado', privateBox: 'Despliegue real en un cliente. Se comparte de forma personal, a pedido.',
    request: 'Solicitar acceso →', haveAccess: '¿Ya tienes acceso? Abrir la biblioteca →',
    access: {
      title: 'Solicitar acceso', h1: 'Biblioteca privada de demos',
      lede: 'Algunos demos muestran despliegues reales en clientes, por eso sus videos se comparten en privado. Cuéntame quién eres: reviso cada solicitud personalmente y, si la apruebo, te envío un enlace personal que caduca solo.',
      name: 'Nombre', email: 'Correo', company: 'Empresa (opcional)', reason: '¿Por qué te interesa el acceso?', submit: 'Solicitar acceso', back: '← Todos los demos',
      states: {
        enviado: 'Gracias. Si apruebo tu solicitud, recibirás un enlace personal por correo.',
        captcha: 'La verificación anti-bot falló. Inténtalo de nuevo.', email: 'Escribe un correo válido.', name: 'Escribe tu nombre.',
        reason: 'Cuéntame brevemente por qué te interesa el acceso.', send: 'No se pudo enviar la solicitud en este momento. Escríbeme a info@arpagon.co.',
        expirado: 'Ese enlace de acceso ya no es válido. Puedes solicitar acceso de nuevo.', sesion: 'Tu sesión terminó o todavía no tienes acceso.',
      },
      sentTitle: 'Solicitud enviada', privacy: 'Tus datos solo se usan para revisar esta solicitud.',
    },
    library: {
      title: 'Demos privados', h1: 'Biblioteca privada de demos', loading: 'Cargando…',
      shared: (email, until) => `Compartida personalmente con ${email} hasta el ${until}. Por favor no redistribuyas estos videos: muestran despliegues reales en clientes.`,
      signOut: 'Cerrar sesión', note: 'Privado', empty: 'Todavía no hay demos privados.',
    },
  },
  pt: {
    title: 'Demos', description: 'Demos de Sebastián Rojo: visão computacional e voz com IA no ponto de venda (Emilia AI), ferramentas para agentes de código, IA conversacional de voz e IA generativa.',
    kicker: '❯ demos', h1: 'O que eu construí,', h1em: 'em vídeo.',
    lede: 'As demos públicas tocam aqui mesmo. As de produtos da Emilia rodando em clientes reais são privadas: a descrição é pública e os vídeos são compartilhados de forma pessoal, sob pedido.',
    stats: (all, open, priv) => `${all} demos · ${open} vídeos públicos · ${priv} privados`,
    groups: {
      emilia: { title: 'Emilia AI · visão e voz no ponto de venda', blurb: 'Produtos que projetei na Emilia AI, da prova de conceito à produção. Os vídeos mostram implantações reais em clientes, por isso são privados.' },
      open: { title: 'Open source e experimentos', blurb: 'Ferramentas para agentes de código, IA conversacional de voz e experimentos de IA generativa, a maioria compartilhada primeiro no X.' },
    },
    role: 'Papel', watch: 'Assistir', watchOn: 'Assistir no X ↗', credit: 'Crédito', video: 'vídeo', videos: 'vídeos',
    privateBadge: 'Vídeo privado', privateBox: 'Implantação real em um cliente. Compartilhado de forma pessoal, sob pedido.',
    request: 'Solicitar acesso →', haveAccess: 'Já tem acesso? Abrir a biblioteca →',
    access: {
      title: 'Solicitar acesso', h1: 'Biblioteca privada de demos',
      lede: 'Algumas demos mostram implantações reais em clientes, por isso os vídeos são compartilhados em privado. Conte quem você é: reviso cada pedido pessoalmente e, se aprovado, envio um link pessoal que expira sozinho.',
      name: 'Nome', email: 'E-mail', company: 'Empresa (opcional)', reason: 'Por que você quer acesso?', submit: 'Solicitar acesso', back: '← Todas as demos',
      states: {
        enviado: 'Obrigado. Se o seu pedido for aprovado, você receberá um link pessoal por e-mail.',
        captcha: 'A verificação anti-bot falhou. Tente novamente.', email: 'Digite um e-mail válido.', name: 'Digite seu nome.',
        reason: 'Conte brevemente por que você quer acesso.', send: 'Não foi possível enviar o pedido agora. Escreva para info@arpagon.co.',
        expirado: 'Esse link de acesso não é mais válido. Você pode solicitar acesso novamente.', sesion: 'Sua sessão terminou ou você ainda não tem acesso.',
      },
      sentTitle: 'Pedido enviado', privacy: 'Seus dados só são usados para revisar este pedido.',
    },
    library: {
      title: 'Demos privadas', h1: 'Biblioteca privada de demos', loading: 'Carregando…',
      shared: (email, until) => `Compartilhada pessoalmente com ${email} até ${until}. Por favor, não redistribua estes vídeos: eles mostram implantações reais em clientes.`,
      signOut: 'Sair', note: 'Privado', empty: 'Ainda não há demos privadas.',
    },
  },
};
