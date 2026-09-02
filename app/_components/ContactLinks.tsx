import { SITE } from '../../lib/site';

/**
 * Horizontal row of contact link-buttons. Links whose value is `null` in
 * SITE (LinkedIn, résumé) are simply omitted. Icons are inline SVG — no
 * icon-library dependency.
 */

interface ContactLink {
  label: string;
  ariaLabel: string;
  href: string;
  external: boolean;
  icon: React.ReactNode;
}

const ICON_CLASS = 'h-4 w-4 shrink-0';

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      className={ICON_CLASS}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" className={ICON_CLASS} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" className={ICON_CLASS} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      aria-hidden="true"
      className={ICON_CLASS}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  );
}

export default function ContactLinks({ className = '' }: { className?: string }) {
  const links: ContactLink[] = [
    {
      label: 'Email',
      ariaLabel: `Email ${SITE.name} at ${SITE.email}`,
      href: `mailto:${SITE.email}`,
      external: false,
      icon: <MailIcon />,
    },
    {
      label: 'GitHub',
      ariaLabel: `${SITE.name} on GitHub (opens in a new tab)`,
      href: SITE.github,
      external: true,
      icon: <GitHubIcon />,
    },
  ];

  if (SITE.linkedin) {
    links.push({
      label: 'LinkedIn',
      ariaLabel: `${SITE.name} on LinkedIn (opens in a new tab)`,
      href: SITE.linkedin,
      external: true,
      icon: <LinkedInIcon />,
    });
  }

  if (SITE.resumeUrl) {
    links.push({
      label: 'Résumé',
      ariaLabel: `View ${SITE.name}'s résumé (opens in a new tab)`,
      href: SITE.resumeUrl,
      external: true,
      icon: <FileIcon />,
    });
  }

  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`} aria-label="Contact links">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            aria-label={link.ariaLabel}
            {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-foreground/25 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10 dark:bg-white/[0.04] dark:backdrop-blur-xl dark:hover:border-indigo-400/50 dark:hover:bg-white/[0.08]"
          >
            {link.icon}
            <span>{link.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
