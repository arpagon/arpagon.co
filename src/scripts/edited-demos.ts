// Public HTML contains only locked cards. The server decides whether this session can
// obtain the edited edition; DOM changes never grant access to the originals.
type EditedItem = { id: string; duration: string; width: number; height: number };
type EditedSession = { viewer: string; expires: string; edition: 'edited'; items: EditedItem[] };
type Strings = { shared: string; badge: string; requestOriginals: string; access: string; expired: string; error: string };

const copy = document.getElementById('dm-edited-copy');
if (copy) {
  const strings = JSON.parse(copy.textContent || '{}') as Strings;
  const bar = document.querySelector<HTMLElement>('[data-edited-session]')!;
  const alert = document.querySelector<HTMLElement>('[data-edited-alert]')!;
  const shared = document.querySelector<HTMLElement>('[data-edited-shared]')!;
  let shown = false;

  function message(text: string) {
    alert.textContent = text;
    alert.hidden = false;
  }

  function lock() {
    bar.hidden = true;
    document.querySelectorAll<HTMLVideoElement>('video[data-edited-video]').forEach((video) => {
      video.pause();
      video.removeAttribute('src');
      video.load();
    });
    document.querySelectorAll<HTMLElement>('[data-edited-player]').forEach((element) => element.remove());
    document.querySelectorAll<HTMLElement>('[data-edited-card] .dm-lock').forEach((element) => { element.hidden = false; });
  }

  function unlock(item: EditedItem, viewer: string) {
    if (!/^[a-z0-9][a-z0-9-]{0,63}$/.test(item.id)) return;
    const card = document.getElementById(item.id);
    if (!card?.hasAttribute('data-edited-card')) return;
    const media = card.querySelector<HTMLElement>('.dm-media')!;
    const player = document.createElement('div');
    player.dataset.editedPlayer = '';
    const video = document.createElement('video');
    video.dataset.editedVideo = '';
    video.controls = true;
    video.playsInline = true;
    video.preload = 'none';
    video.width = Number.isFinite(item.width) && item.width > 0 ? item.width : 1920;
    video.height = Number.isFinite(item.height) && item.height > 0 ? item.height : 1080;
    video.src = `/demos/editado/v/${encodeURIComponent(item.id)}.mp4`;
    video.setAttribute('aria-label', `${card.querySelector('h4')?.textContent || item.id} · ${strings.badge}`);
    video.addEventListener('error', () => {
      // Revalidate the session rather than treating a media-decoding failure as a grant.
      fetch('/demos/api/editados', { credentials: 'same-origin', cache: 'no-store' })
        .then((response) => { if (response.status === 401) { lock(); message(strings.expired); } else message(strings.error); })
        .catch(() => message(strings.error));
    });
    const watermark = document.createElement('span');
    watermark.className = 'dm-wm';
    watermark.textContent = viewer;
    watermark.setAttribute('aria-hidden', 'true');
    const details = document.createElement('div');
    details.className = 'dm-edited-caption';
    const badge = document.createElement('span');
    badge.textContent = strings.badge;
    const original = document.createElement('a');
    original.href = strings.access;
    original.textContent = strings.requestOriginals;
    details.append(badge, original);
    player.append(video, watermark, details);
    media.append(player);
    card.querySelector<HTMLElement>('.dm-lock')!.hidden = true;
    const meta = card.querySelector<HTMLElement>('[data-demo-meta]');
    if (meta) meta.textContent = [card.dataset.demoCompany, item.duration].filter(Boolean).join(' · ');
  }

  if (new URL(location.href).searchParams.get('compartido') === 'expirado') message(strings.expired);

  async function refresh() {
    try {
      const response = await fetch('/demos/api/editados', { credentials: 'same-origin', cache: 'no-store', headers: { Accept: 'application/json' } });
      if (response.status === 401) {
        if (shown) { lock(); message(strings.expired); }
        return;
      }
      // A static PR preview does not serve the private API; leave public cards unchanged.
      if (response.status === 404) return;
      if (!response.ok) throw new Error('unavailable');
      const data = await response.json() as EditedSession;
      if (data.edition !== 'edited' || !Array.isArray(data.items) || typeof data.viewer !== 'string' || typeof data.expires !== 'string') throw new Error('invalid edition');
      lock();
      for (const item of data.items) unlock(item, data.viewer);
      shared.textContent = strings.shared.replace('{email}', data.viewer).replace('{until}', data.expires);
      bar.hidden = false;
      shown = true;
      // Session-dependent DOM is not part of the public catalog's indexable content.
      const robots = document.createElement('meta');
      robots.name = 'robots';
      robots.content = 'noindex, nofollow';
      document.head.append(robots);
    } catch {
      // Never unlock on an API/network failure. Without a known session, the public
      // catalog remains useful and does not display an alarming authentication error.
      if (shown) { lock(); message(strings.error); }
    }
  }
  void refresh();
  // Browser back/forward cache may restore an authenticated DOM after sign-out.
  window.addEventListener('pageshow', (event) => { if (event.persisted) { lock(); void refresh(); } });
}
