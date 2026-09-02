/**
 * Single source of truth for "who is this person" — name, role, contact
 * links. Rendered by HeroIntro / ContactLinks; edit here, not in markup.
 */
export interface SiteInfo {
  name: string;
  fullName: string;
  role: string;
  location: string;
  email: string;
  github: string;
  /** Public LinkedIn profile URL. `null` hides the link. */
  linkedin: string | null;
  /** Direct link to a PDF résumé. `null` hides the link. */
  resumeUrl: string | null;
  /** One-liner on what kind of work is being sought. */
  availability: string;
}

export const SITE: SiteInfo = {
  name: 'Muhammad Taufik',
  fullName: 'Muhammad Taufik Bin Hamid',
  role: 'Full-stack Developer',
  location: 'Malaysia',
  email: 'taufikhamid2000@gmail.com',
  github: 'https://github.com/taufikhamid2000',
  // TODO(owner): fill in LinkedIn profile URL, e.g. 'https://www.linkedin.com/in/…'
  linkedin: null,
  // TODO(owner): fill in résumé URL (e.g. '/resume.pdf' placed under /public)
  resumeUrl: null,
  availability: 'Open to full-stack / backend roles',
};
