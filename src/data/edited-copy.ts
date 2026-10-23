import type { Locale } from './profile';

export const editedCopy: Record<Locale, {
  title: string;
  shared: (email: string, until: string) => string;
  note: string;
  badge: string;
  requestOriginals: string;
  signOut: string;
  expired: string;
  error: string;
}> = {
  en: {
    title: 'Shared personally',
    shared: (email, until) => `Edited editions shared with ${email} until ${until}.`,
    note: 'Restricted edited editions, not guaranteed fully anonymous. Please do not redistribute. Original recordings and customer context require separate approval.',
    badge: 'Edited edition · restricted',
    requestOriginals: 'Request access to originals →',
    signOut: 'Sign out',
    expired: 'This personal viewing link is invalid or has expired. Ask the sender for a new link, or request access to the originals.',
    error: 'The shared editions could not be loaded. Please try again later.',
  },
  es: {
    title: 'Compartidos personalmente',
    shared: (email, until) => `Versiones editadas compartidas con ${email} hasta el ${until}.`,
    note: 'Versiones editadas de acceso restringido, sin garantía de anonimización completa. Por favor, no las redistribuyas. Los originales y el contexto del cliente requieren una aprobación aparte.',
    badge: 'Edición para compartir · restringida',
    requestOriginals: 'Solicitar acceso a los originales →',
    signOut: 'Cerrar sesión',
    expired: 'Este enlace personal no es válido o ha caducado. Pide un enlace nuevo a quien te lo envió, o solicita acceso a los originales.',
    error: 'No se pudieron cargar las versiones compartidas. Inténtalo de nuevo más tarde.',
  },
  pt: {
    title: 'Compartilhados pessoalmente',
    shared: (email, until) => `Versões editadas compartilhadas com ${email} até ${until}.`,
    note: 'Versões editadas de acesso restrito, sem garantia de anonimização completa. Por favor, não redistribua. Os originais e o contexto do cliente exigem uma aprovação separada.',
    badge: 'Edição para compartilhar · restrita',
    requestOriginals: 'Solicitar acesso aos originais →',
    signOut: 'Sair',
    expired: 'Este link pessoal é inválido ou expirou. Peça um novo link a quem o enviou, ou solicite acesso aos originais.',
    error: 'Não foi possível carregar as versões compartilhadas. Tente novamente mais tarde.',
  },
};
