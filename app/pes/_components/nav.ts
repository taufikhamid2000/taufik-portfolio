// Where the user is lives in the URL hash so a refresh or a shared link lands in the same place:
//   ''                     title screen
//   '#menu'                main menu
//   '#<screen>'            a screen, e.g. '#sprints'
//   '#<screen>/<detail>'   deeper state, e.g. '#projects/tongtong' or '#sprints/2026/2-1'
const NAV_EVENT = 'pes-nav';

export function go(hash: string, mode: 'push' | 'replace') {
  const url = window.location.pathname + window.location.search + hash;
  if (window.location.hash === hash) return;
  if (mode === 'push') window.history.pushState({ pes: 1 }, '', url);
  else window.history.replaceState({ pes: 1 }, '', url);
  window.dispatchEvent(new Event(NAV_EVENT));
}

export function subscribeHash(cb: () => void) {
  window.addEventListener('hashchange', cb);
  window.addEventListener('popstate', cb);
  window.addEventListener(NAV_EVENT, cb);
  return () => {
    window.removeEventListener('hashchange', cb);
    window.removeEventListener('popstate', cb);
    window.removeEventListener(NAV_EVENT, cb);
  };
}

/** The part of the hash after '#<screen>/', or '' when there is none. */
export function readSub(screen: string): string {
  const prefix = `#${screen}/`;
  const h = window.location.hash;
  return h.startsWith(prefix) ? decodeURIComponent(h.slice(prefix.length)) : '';
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
